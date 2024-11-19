import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMascotaById, updateMascota } from '../components/api'; // Asegúrate de tener esta función en tu API
import { Mascota } from '../components/models';

const PetsEdit: React.FC = () => {
  const { idMascota } = useParams<{ idMascota: string }>(); // Obtener ID de la mascota desde la URL
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await getMascotaById(Number(idMascota)); // Llamada específica para obtener una mascota
        console.log("DATA PRUEBA");
        console.log(data);
        setMascota(data);
      } catch (error) {
        console.error('Error al obtener la mascota:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [idMascota]);

  const handleUpdate = async () => {
    if (mascota) {
      try {
        await updateMascota(mascota.id, mascota); // Asegúrate de que `id` sea correcto
        alert('Mascota actualizada');
      } catch (error) {
        console.error('Error al actualizar la mascota:', error);
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
              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Nombre</IonLabel>
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