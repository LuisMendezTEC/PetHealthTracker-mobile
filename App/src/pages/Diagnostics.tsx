// src/pages/MascotasPage.tsx
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getDiagnosticsByPet, getMascotasByUser } from '../components/api';
import { Mascota } from '../components/models';
import '../styles/Pets.css';

const Diagnostics: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<{ [key: number]: any[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id');
  const history = useHistory();

  useEffect(() => {
    const fetchMascotas = async () => {
      if (userId) {
        try {
          const data = await getMascotasByUser(Number(userId));
          const diagnosticosPorMascota: { [key: number]: any[] } = {};

          for (const mascota of data) {
            const diagnostics = await getDiagnosticsByPet(mascota.id);
            diagnosticosPorMascota[mascota.id] = diagnostics;
          }

          setMascotas(data);
          setDiagnosticos(diagnosticosPorMascota);
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
                            <p>Veterinario ID: {diagnostico.veterinario_id}</p>
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
