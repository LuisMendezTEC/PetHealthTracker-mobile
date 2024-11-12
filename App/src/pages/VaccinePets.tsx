// src/pages/MascotasPage.tsx
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getMascotasByUser, getVaccine, getVaccineByPet } from '../components/api';
import { Mascota, VacunaRel, Vacunas } from '../components/models';
import '../styles/VaccinePets.css';

const VaccinePets: React.FC = () => {
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [vacunasByMascota, setVacunasByMascota] = useState<{ [key: number]: Vacunas[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const userId = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
    const history = useHistory();

    useEffect(() => {
        const fetchMascotasYVacunas = async () => {
            if (userId) {
                try {
                    const data = await getMascotasByUser(Number(userId));
                    setMascotas(data);

                    // Para cada mascota, obtener sus vacunas
                    console.log("mascotas");
                    console.log(data);
                    const vacunasPorMascota: { [key: number]: Vacunas[] } = {};
                    for (const mascota of data) {
                        const vacunasData = await getVaccineByPet(mascota.id);
                        console.log("vacunasData");
                        console.log(vacunasData);
                        const vacunasDetalles = await Promise.all(
                            vacunasData.map(async (vacunaRel: VacunaRel) => {
                                const vacuna = await getVaccine(vacunaRel.vacuna);
                                console.log("vacuna");
                                console.log(vacuna[0]);
                                return vacuna[0];
                            })
                        );
                        vacunasPorMascota[mascota.id] = vacunasDetalles; // Asociar vacunas a la mascota por su ID
                    }
                    setVacunasByMascota(vacunasPorMascota); // Actualizar el estado con todas las vacunas por mascota
                } catch (error) {
                    console.error("Error al obtener mascotas o vacunas:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("No se encontró el ID del usuario en localStorage");
            }
        };
        fetchMascotasYVacunas();
    }, [userId]);

    return (
        <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonTitle >Mis Mascotas y Vacunas</IonTitle>
        </IonToolbar>
      </IonHeader>
            <IonContent fullscreen>
                {loading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    <IonList>
                        {mascotas.map((mascota) => (
                            <IonItem key={mascota.id}>
                                <IonLabel>
                                    <h2>{mascota.nombre_mascota}</h2>
                                    {vacunasByMascota[mascota.id] && vacunasByMascota[mascota.id].length > 0 ? (
                                        <IonList>
                                            {vacunasByMascota[mascota.id].map((vacuna) => (
                                                <IonItem key={vacuna.id}>
                                                    <IonLabel>
                                                        <h3>Vacuna: {vacuna.tipo_vacuna}</h3>
                                                    </IonLabel>
                                                </IonItem>
                                            ))}
                                        </IonList>
                                    ) : (
                                        <p>No hay vacunas registradas para esta mascota.</p>
                                    )}
                                </IonLabel>
                                <IonButton expand="block" className="mt-2 w-32 h-10" onClick={() => history.push(`/mascotas/${mascota.id_dueño}/editar`)}>
                                    ver mascota
                                </IonButton>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default VaccinePets;
