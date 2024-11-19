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
  useIonToast,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMascotaById, updateMascota } from '../components/api';
import { Mascota } from '../components/models';

const PetsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [presentToast] = useIonToast();
  const history = useHistory();

  // Carga inicial de datos de la mascota
  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await getMascotaById(Number(id));
        setMascota(data);
        console.log(data);
      } catch (error) {
        presentToast({
          message: 'Error al obtener los datos de la mascota.',
          duration: 3000,
          color: 'danger',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [id, presentToast]);

  // Función para manejar la actualización
  const handleUpdate = async () => {
    if (mascota) {
      try {
        await updateMascota(mascota.id, mascota);
        presentToast({
          message: 'Mascota actualizada correctamente.',
          duration: 3000,
          color: 'success',
        });
        history.push('/Pets'); // Redirige a la lista de mascotas
      } catch (error) {
        presentToast({
          message: 'Error al actualizar la mascota.',
          duration: 3000,
          color: 'danger',
        });
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
              {/* Campo: Nombre de la mascota */}
              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Nombre</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.nombre_mascota}
                    onIonChange={(e) =>
                      setMascota({ ...mascota, nombre_mascota: e.detail.value || mascota.nombre_mascota })
                    }
                  />
                </IonCardContent>
              </IonCard>

              {/* Campo: Especie */}
              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Especie</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.especie}
                    onIonChange={(e) =>
                      setMascota({ ...mascota, especie: e.detail.value || mascota.especie })
                    }
                  />
                </IonCardContent>
              </IonCard>

              {/* Campo: Raza */}
              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Raza</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.raza}
                    onIonChange={(e) =>
                      setMascota({ ...mascota, raza: e.detail.value || mascota.raza })
                    }
                  />
                </IonCardContent>
              </IonCard>

              {/* Campo: Fecha de nacimiento */}
              <IonCard className="bg-blue-50">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-blue-500">Fecha de Nacimiento</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    type="date"
                    value={mascota.fecha_nacimiento}
                    onIonChange={(e) =>
                      setMascota({
                        ...mascota,
                        fecha_nacimiento: e.detail.value || mascota.fecha_nacimiento,
                      })
                    }
                  />
                </IonCardContent>
              </IonCard>

              {/* Botón para guardar */}
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
