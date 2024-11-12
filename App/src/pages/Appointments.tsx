import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getCitasByMascota, getMascotasByUser, getVetByPet } from '../components/api';
import { Cita, Mascota } from '../components/models';
  
  const Appointments: React.FC = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userId = localStorage.getItem('client_id');
    const history = useHistory();
    const id_cita = localStorage.getItem('id_cita');
    const nombre_veterinario = localStorage.getItem('nombre_veterinario');
  
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
            
            if (citasData.length > 0 && citasData[0].length > 0) {
              localStorage.setItem('id_cita', citasData[0][0].id);
              localStorage.setItem('id_veterinario', citasData[0][0].id_veterinario);
              const id_veterinario = citasData[0][0].id_veterinario;
              const vetData = await getVetByPet(id_veterinario);
              console.log("Vet Data");
              console.log(vetData);
              localStorage.setItem('nombre_veterinario', vetData[0].nombre);
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
      <IonPage className="bg-wood">
        <IonHeader>
          <IonToolbar className="bg-wood">
            <IonTitle className="text-brown">Mis Citas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="bg-wood">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <IonSpinner name="crescent" />
            </div>
          ) : (
            <IonList className="p-6 space-y-6">
              {citas.map((cita) => (
                <IonItem
                  key={`${cita.id_mascota}-${cita.fecha_cita}`}
                  className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <IonLabel>
                    <h2 className="text-lg font-semibold text-brown">Fecha: {cita.fecha_cita}</h2>
                    <p className="text-gray-600">Hora: {cita.hora_cita}</p>
                    <p className="text-gray-600">Veterinario: {nombre_veterinario}</p>
                  </IonLabel>
                  <IonButton
                    onClick={() => history.push(`/citas/${id_cita}/editar`)}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Ver cita
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Appointments;
  