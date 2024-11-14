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
  IonCard,
  IonCardContent,
  IonCardHeader,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getCitasByMascota, getMascotasByUser, getVetByPet } from '../components/api';
import { Cita, Mascota } from '../components/models';
import '../styles/Appointments.css';

const Appointments: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id');
  const history = useHistory();
  const id_cita = localStorage.getItem('id_cita');
  const nombre_veterinario = localStorage.getItem('nombre_veterinario');
  const { t } = useTranslation();

  const goToSettings = () => {
    history.push('/settings');
  };

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
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-light-blue">
          <IonTitle className="text-white">{t('appointments_title')}</IonTitle>
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
            {citas.map((cita) => (
              <IonCard key={`${cita.id_mascota}-${cita.fecha_cita}`} className="appointment-card">
                <IonCardHeader>
                  <h2 className="text-dark-blue font-bold">{t('date_label')}: {cita.fecha_cita}</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p className="text-dark-blue">{t('time_label')}: {cita.hora_cita}</p>
                  <p className="text-dark-blue">{t('vet_label')}: {nombre_veterinario}</p>
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={() => history.push(`/citas/${cita.id_mascota}/detalles`)}
                    className="view-appointment-button"
                  >
                    {t('view_appointment_button')}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Appointments;
