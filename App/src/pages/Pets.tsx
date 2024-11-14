import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar hook para traducción
import { useHistory } from 'react-router-dom';
import { getMascotasByUser } from '../components/api';
import { Mascota } from '../components/models';
import '../styles/Pets.css';

const Pets: React.FC = () => {
  const { t } = useTranslation(); // Hook para traducción
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id'); 
  const history = useHistory();
  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
    const fetchMascotas = async () => {
      if (userId) {
        try {
          const data = await getMascotasByUser(Number(userId));
          setMascotas(data);
        } catch (error) {
          console.error(t('connection_error')); // Traducción
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No se encontró el ID del usuario en localStorage");
      }
    };
    fetchMascotas();
  }, [userId, t]);

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>, mascotaId: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`http://localhost:8000/upload-mascota-image/${mascotaId}`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          // Actualizar la mascota con la nueva URL de imagen
          setMascotas((prev) =>
            prev.map((mascota) =>
              mascota.id === mascotaId ? { ...mascota, image_url: result.image_url } : mascota
            )
          );
          alert(t('image_upload_success')); // Traducción
        } else {
          console.error(t('upload_error'), result.detail); // Traducción
        }
      } catch (error) {
        console.error(t('upload_error'), error); // Traducción
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('title_pets')}</IonTitle> {/* Traducción */}
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {mascotas.map((mascota) => (
              <IonItem key={mascota.id}>
                <IonLabel>{mascota.nombre_mascota}</IonLabel>
                {mascota.image_url && (
                  <img src={mascota.image_url} alt={`${mascota.nombre_mascota} profile`} className="mascota-img" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadImage(e, mascota.id)}
                  style={{ display: "none" }}
                  id={`file-upload-${mascota.id}`}
                />
                <IonButton onClick={() => document.getElementById(`file-upload-${mascota.id}`)?.click()}>
                  {t('upload_image')} {/* Traducción */}
                </IonButton>
                <IonButton onClick={() => history.push(`/mascotas/${mascota.id_dueño}/editar`)}>{t('view_pet_button')}</IonButton> {/* Traducción */}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Pets;
