import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar hook para traducción
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getMascotasByUser, updateMascota } from '../components/api';
import { Mascota } from '../components/models';

const PetsEdit: React.FC = () => {
  const { t } = useTranslation(); // Hook para traducción
  const id = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const mascotas = await getMascotasByUser(Number(id));
        console.log("Mascotas");
        setMascota(mascotas[0]);
      } catch (error) {
        console.error(t('connection_error')); // Traducción
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [id, t]);

  const handleUpdate = async () => {
    if (mascota) {
      try {
        await updateMascota(mascota.id, mascota);
        alert(t('update_pet')); // Traducción
      } catch (error) {
        console.error(t('update_error'), error); // Traducción
      }
    }
  };

  return (
    <IonPage className="bg-wood">
      <IonHeader>
        <IonToolbar className="bg-wood">
          <IonTitle className="text-brown">{t('title')}</IonTitle> {/* Traducción */}
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
          mascota && (
            <IonList className="p-6 space-y-6">
              <IonCard className="card-bg-wood"> {/* Fondo madera para el cuadro */}
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-brown">{t('name_label')}</IonLabel> {/* Traducción */}
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.nombre_mascota}
                    onIonChange={(e) => setMascota({ ...mascota, nombre_mascota: e.detail.value! })}
                    className="border rounded-lg p-2"
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="card-bg-wood">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-brown">{t('species_label')}</IonLabel> {/* Traducción */}
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.especie}
                    onIonChange={(e) => setMascota({ ...mascota, especie: e.detail.value! })}
                    className="border rounded-lg p-2"
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="card-bg-wood">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-brown">{t('breed_label')}</IonLabel> {/* Traducción */}
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.raza}
                    onIonChange={(e) => setMascota({ ...mascota, raza: e.detail.value! })}
                    className="border rounded-lg p-2"
                  />
                </IonCardContent>
              </IonCard>

              <IonCard className="card-bg-wood">
                <IonCardHeader>
                  <IonLabel className="text-lg font-bold text-brown">{t('birthdate_label')}</IonLabel> {/* Traducción */}
                </IonCardHeader>
                <IonCardContent>
                  <IonInput
                    value={mascota.fecha_nacimiento}
                    onIonChange={(e) => setMascota({ ...mascota, fecha_nacimiento: e.detail.value! })}
                    className="border rounded-lg p-2"
                  />
                </IonCardContent>
              </IonCard>

              <IonButton expand="full" onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                {t('save')} {/* Traducción */}
              </IonButton>
            </IonList>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default PetsEdit;
