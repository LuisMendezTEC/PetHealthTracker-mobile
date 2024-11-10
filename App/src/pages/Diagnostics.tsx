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
  const userId = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
  const history = useHistory();

  useEffect(() => {
    const fetchMascotas = async () => {
      console.log(userId);
      if (userId) { // Verifica que userId exista antes de usarlo
        try {
          const data = await getMascotasByUser(Number(userId)); // Asegúrate de convertirlo a número si es necesario
          const diagnosticosPorMascota: { [key: number]: any[] } = {};

          for (const mascota of data) {
            console.log(mascota);
            const diagnostics = await getDiagnosticsByPet(mascota.id);
            diagnosticosPorMascota[mascota.id] = diagnostics;
          }

          setMascotas(data);
          setDiagnosticos(diagnosticosPorMascota);
          console.log("Data");  
          console.log(data);
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Diagnósticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {mascotas.map((mascota) => (
              <IonItem key={mascota.id}>
                <IonLabel className="h-64 overflow-auto"> {/* Clase para altura fija */}
                  <h2 className="font-bold text-lg">{mascota.nombre_mascota}</h2>
                  {diagnosticos[mascota.id] && diagnosticos[mascota.id].length > 0 ? (
                    <IonList>
                      {diagnosticos[mascota.id].map((diagnostico) => (
                        <IonItem key={diagnostico.id}>
                          <IonLabel>
                            <h3>Fecha: {diagnostico.fecha}</h3>
                            <p>Tipo: {diagnostico.tipo}</p>
                            <p>Descripción: {diagnostico.descripcion}</p>
                            <p>Veterinario ID: {diagnostico.veterinario_id}</p>
                            <p>Resultado: {diagnostico.resultado}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p>No hay diagnósticos asociados a esta mascota.</p>
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
