// src/pages/MascotasPage.tsx
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getCitasByMascota, getMascotasByUser } from '../components/api';
import { Cita, Mascota } from '../components/models';

const Appointments: React.FC = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userId = localStorage.getItem('client_id');
    const history = useHistory();
    const id_cita = localStorage.getItem('id_cita');

    useEffect(() => {
        const fetchCitas = async () => {
            if (userId) {
                try {
                    const mascotasData = await getMascotasByUser(Number(userId));
                    setMascotas(mascotasData);

                    const citasPromises = mascotasData.map((mascota: Mascota) =>
                        getCitasByMascota(mascota.id)
                    );
                    const citasData = await Promise.all(citasPromises);
                // Verifica si citasData[0] tiene elementos antes de acceder
                if (citasData.length > 0 && citasData[0].length > 0) {
                    localStorage.setItem('id_cita', citasData[0][0].id);
                    setCitas(citasData.flat());
                } else {
                    console.warn("No se encontraron citas.");
                }
                } catch (error) {
                    console.error("Error al obtener las citas:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("No se encontró el ID del usuario en localStorage");
            }
        };
        fetchCitas();
    }, [userId]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mis Citas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {loading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    <IonList>
                        {citas.map((cita) => (
                            <IonItem key={`${cita.id_mascota}-${cita.fecha_cita}`}>
                                <IonLabel>
                                    <h2>Fecha: {cita.fecha_cita}</h2>
                                    <p>Hora: {cita.hora_cita}</p>
                                    <p>Veterinario ID: {cita.id_veterinario}</p>
                                </IonLabel>
                                <IonButton onClick={() => history.push(`/citas/${id_cita}/editar`)}>Ver más</IonButton>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Appointments;
