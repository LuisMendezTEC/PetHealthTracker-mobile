import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { addPet } from '../components/api';
import { Mascota } from '../components/models';
import '../styles/PetsAdd.css';

const PetsAdd: React.FC = () => {
  const { t } = useTranslation();
  const [nombreMascota, setNombreMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const idDueño = localStorage.getItem('client_id');
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  const handleAddPet = async () => {
    if (!nombreMascota || !especie || !raza || !fechaNacimiento) {
      alert(t('fill_all_fields'));
      return;
    }

    const nuevaMascota: Mascota = {
      id: Date.now(),
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
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-light-blue">
        <IonTitle className="text-white">{t('add_pet_title')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-light-blue">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList className="p-6 space-y-6">
            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('name_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  placeholder={t('name_placeholder')}
                  value={nombreMascota}
                  onIonChange={(e) => setNombreMascota(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('species_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
              <IonSelect
      value={especie}
      placeholder={t('species_placeholder')}
      onIonChange={(e) => setEspecie(e.detail.value)}
      className="border rounded-lg p-2"
              >
                <IonSelectOption value="dog">{t('dog')}</IonSelectOption>
                <IonSelectOption value="cat">{t('cat')}</IonSelectOption>
              </IonSelect>
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('breed_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  placeholder={t('breed_placeholder')}
                  value={raza}
                  onIonChange={(e) => setRaza(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('birthdate_label')}</IonLabel>
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
              {t('add_pet_button')}
            </IonButton>
          </IonList>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={t('pet_added_success')}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default PetsAdd;
