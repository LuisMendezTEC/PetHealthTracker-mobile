// src/pages/EditarMascotaPage.tsx
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInput, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getMascotasByUser, updateMascota } from '../components/api';
import { Mascota } from '../components/models';

const PetsEdit: React.FC = () => {
    const id = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
    
  useEffect(() => {
    const fetchMascota = async () => {
      try {
        console.log(id);
        
        const mascotas = await getMascotasByUser(Number(id));
        setMascota(mascotas.find((m: Mascota) => m.id_dueño === Number(id)) || null);
      } catch (error) {
        console.error("Error al obtener la mascota:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [id]);

  const handleUpdate = async () => {
    if (mascota) {
      try {
        await updateMascota(mascota.id, mascota);
        alert("Mascota actualizada");
      } catch (error) {
        console.error("Error al actualizar la mascota:", error);
      }
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Mascota</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          mascota && (
            <IonList className="p-6 space-y-6">
              <IonCard className="bg-blue-50"> {/* Fondo celeste para el cuadro */}
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Nombre</IonLabel> {/* Título celeste */}
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.nombre_mascota}
                    onIonChange={(e) => setMascota({ ...mascota, nombre_mascota: e.detail.value! })}
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Especie</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.especie}
                    onIonChange={(e) => setMascota({ ...mascota, especie: e.detail.value! })}
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Raza</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.raza}
                    onIonChange={(e) => setMascota({ ...mascota, raza: e.detail.value! })}
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Fecha de Nacimiento</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.fecha_nacimiento}
                    onIonChange={(e) => setMascota({ ...mascota, fecha_nacimiento: e.detail.value! })}
                  />
                </IonCardContent>
              </IonCard>

              <IonButton expand="full" onClick={handleUpdate} className="mt-6">
                Guardar
              </IonButton>
            </IonList>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default PetsEdit;
