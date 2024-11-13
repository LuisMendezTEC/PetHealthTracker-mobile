// src/pages/MascotasPage.tsx
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getCitasByMascota, getDiagnosticsByPet, getMascotasByUser, getVetByPet } from '../components/api';
import { Mascota } from '../components/models';
import '../styles/Pets.css';

const Diagnostics: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<{ [key: number]: any[] }>({});
  const [nombreVeterinarios, setNombreVeterinarios] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id');
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  }

  useEffect(() => {
    const fetchMascotas = async () => {
      if (userId) {
        try {
          const data = await getMascotasByUser(Number(userId));
          const diagnosticosPorMascota: { [key: number]: any[] } = {};
          const citasPorMascota: { [key: number]: any[] } = {};
          const nombreVeterinariosTemp: { [key: string]: string } = {};

          for (const mascota of data) {
            const diagnostics = await getDiagnosticsByPet(mascota.id);
            const citasData = await getCitasByMascota(mascota.id);
            diagnosticosPorMascota[mascota.id] = diagnostics;
            citasPorMascota[mascota.id] = citasData;
          }

          for (const mascota of data) {
            for (const cita of citasPorMascota[mascota.id]) {
              const vetData = await getVetByPet(cita.id_veterinario);
              nombreVeterinariosTemp[cita.id_veterinario] = vetData[0].nombre; // Obtiene el nombre del veterinario
            }
          }

          setMascotas(data);
          setDiagnosticos(diagnosticosPorMascota);
          setNombreVeterinarios(nombreVeterinariosTemp); // Guarda los nombres en el estado
        } catch (error) {
          console.error("Error al obtener mascotas:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No se encontró el ID del usuario en localStorage");
      }
    };
    fetchMascotas();
  }, [userId]);

  return (
    <IonPage className="bg-wood">
      <IonHeader>
        <IonToolbar className="bg-wood">
          <IonTitle className="text-brown">Diagnósticos</IonTitle>
          <IonButtons slot="end">
                    <IonButton onClick={goToSettings}>
                    <IonIcon icon={settingsOutline} />
                    </IonButton>
                </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-wood">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList className="p-6 space-y-6">
            {mascotas.map((mascota) => (
              <IonItem key={mascota.id} className="card-bg-wood rounded-lg shadow-md p-4">
                <IonLabel className="h-64 overflow-auto">
                  <h2 className="font-bold text-lg text-brown">{mascota.nombre_mascota}</h2>
                  {diagnosticos[mascota.id] && diagnosticos[mascota.id].length > 0 ? (
                    <IonList className="space-y-2 mt-2">
                      {diagnosticos[mascota.id].map((diagnostico) => (
                        <IonItem key={diagnostico.id} className="border-b border-gray-300">
                          <IonLabel>
                            <h3 className="font-semibold">Fecha: {diagnostico.fecha}</h3>
                            <p>Tipo: {diagnostico.tipo}</p>
                            <p>Descripción: {diagnostico.descripcion}</p>
                            <p>Veterinario: {nombreVeterinarios[diagnostico.veterinario_id] || "No disponible"}</p>
                            <p>Resultado: {diagnostico.resultado}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p className="text-gray-500">No hay diagnósticos asociados a esta mascota.</p>
                  )}
                </IonLabel>
                <IonButton className="wide-button" onClick={() => history.push(`/mascotas/${mascota.id_dueño}/editar`)}>Ver mascota</IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Diagnostics;
