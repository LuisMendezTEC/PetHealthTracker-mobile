import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { addPet } from '../components/api';
import { Mascota } from '../components/models';

const PetsAdd: React.FC = () => {
  const { t } = useTranslation(); // Hook para traducción
  const [nombreMascota, setNombreMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const idDueño = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
  const history = useHistory();
  const goToSettings = () => {
    history.push('/settings');
  };

  const handleAddPet = async () => {
    if (!nombreMascota || !especie || !raza || !fechaNacimiento) {
      alert(t('fill_all_fields')); // Traducción
      return;
    }

    const nuevaMascota: Mascota = {
      id: Date.now(), // Usa un ID temporal único
      nombre_mascota: nombreMascota,
      especie,
      raza,
      fecha_nacimiento: fechaNacimiento,
      id_dueño: Number(idDueño),
      image_url: ""
    };

    try {
      setLoading(true);
      await addPet(nuevaMascota);
      alert(t('pet_added_success')); // Traducción
      setNombreMascota('');
      setEspecie('');
      setRaza('');
      setFechaNacimiento('');
      setShowToast(true);
    } catch (error) {
      console.error("Error al añadir la mascota:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="bg-wood">
      <IonHeader>
        <IonToolbar className="bg-wood">
          <IonTitle className="text-brown">{t('add_pet_title')}</IonTitle> {/* Traducción */}
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
            <IonCard className="card-bg-wood"> {/* Fondo madera para el cuadro */}
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-brown">{t('name_label')}</IonLabel> {/* Traducción */}
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  placeholder={t('name_placeholder')} // Traducción
                  value={nombreMascota}
                  onIonChange={(e) => setNombreMascota(e.detail.value!)}
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
                  placeholder={t('species_placeholder')} // Traducción
                  value={especie}
                  onIonChange={(e) => setEspecie(e.detail.value!)}
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
                  placeholder={t('breed_placeholder')} // Traducción
                  value={raza}
                  onIonChange={(e) => setRaza(e.detail.value!)}
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
                  type="date"
                  value={fechaNacimiento}
                  onIonChange={(e) => setFechaNacimiento(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonButton expand="full" onClick={handleAddPet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
              {t('add_pet_button')} {/* Traducción */}
            </IonButton>
          </IonList>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={t('pet_added_success')} // Traducción
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default PetsAdd;
