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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { addCita, getMascotasByUser, getVet } from '../components/api';
import { Mascota, nuevaCita } from '../components/models';
import '../styles/CitasAdd.css';

const CitasAdd: React.FC = () => {
  const { t } = useTranslation();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [selectedMascota, setSelectedMascota] = useState<number | undefined>();
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [idVeterinario, setIdVeterinario] = useState<number | undefined>();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [veterinarios, setVeterinarios] = useState<any[]>([]);
  const client_id = Number(localStorage.getItem('client_id'));
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mascotasData = await getMascotasByUser(client_id);
        setMascotas(mascotasData);
        const veterinariosData = await getVet();
        setVeterinarios(veterinariosData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, [client_id]);

  const handleAddCita = async () => {
    if (!selectedMascota || !fechaCita || !horaCita || !idVeterinario) {
      alert(t('fill_all_fields'));
      return;
    }

    const nuevaCita: nuevaCita = {
      id_mascota: selectedMascota,
      fecha_cita: fechaCita,
      id_veterinario: idVeterinario,
      hora_cita: horaCita,
    };

    try {
      setLoading(true);
      await addCita(nuevaCita);
      setSelectedMascota(undefined);
      setFechaCita('');
      setHoraCita('');
      setIdVeterinario(undefined);
      setShowToast(true);
    } catch (error) {
      console.error("Error al añadir la cita:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-light-blue">
          <IonTitle className="text-white">{t('add_appointment_title')}</IonTitle>
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
                <IonLabel className="text-lg font-bold text-dark-blue">{t('select_pet_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  placeholder={t('select_pet_placeholder')}
                  value={selectedMascota}
                  onIonChange={(e) => setSelectedMascota(e.detail.value)}
                  className="border rounded-lg p-2"
                >
                  {mascotas.map((mascota) => (
                    <IonSelectOption key={mascota.id} value={mascota.id}>
                      {mascota.nombre_mascota}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('appointment_date_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="date"
                  value={fechaCita}
                  onIonChange={(e) => setFechaCita(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('appointment_time_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="time"
                  value={horaCita}
                  onIonChange={(e) => setHoraCita(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-light-blue">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-dark-blue">{t('vet_label')}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  placeholder={t('select_vet_placeholder')}
                  value={idVeterinario}
                  onIonChange={(e) => setIdVeterinario(e.detail.value)}
                  className="border rounded-lg p-2"
                >
                  {veterinarios.map((veterinario) => (
                    <IonSelectOption key={veterinario.id} value={veterinario.id}>
                      {veterinario.nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCardContent>
            </IonCard>

            <IonButton expand="full" onClick={handleAddCita} className="styled-button-full">
              {t('add_appointment_button')}
            </IonButton>

          </IonList>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={t('appointment_added_success')}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default CitasAdd;