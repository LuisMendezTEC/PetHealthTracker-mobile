import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar
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
  const [nombreVeterinarios, setNombreVeterinarios] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id');
  const history = useHistory();
  const { t } = useTranslation();

  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
    const fetchCitas = async () => {
      if (!userId) {
        console.error("No se encontró el ID del usuario en localStorage");
        return;
      }

      try {
        setLoading(true);

        // Obtener mascotas del usuario
        const mascotasData = await getMascotasByUser(Number(userId));
        setMascotas(mascotasData);

        // Obtener citas por mascota
        const citasPromises = mascotasData.map((mascota: Mascota) =>
          getCitasByMascota(mascota.id)
        );
        const citasData = await Promise.all(citasPromises);

        // Aplanar las citas en un solo arreglo
        const todasCitas = citasData.flat();
        setCitas(todasCitas);

        // Obtener nombres de veterinarios
        const vetNames: { [key: number]: string } = {};
        for (const cita of todasCitas) {
          if (cita.id_veterinario && !vetNames[cita.id_veterinario]) {
            try {
              const vetData = await getVetByPet(cita.id_veterinario);
              vetNames[cita.id_veterinario] = vetData.nombre; // Suponiendo que el nombre está en vetData.nombre
            } catch (error) {
              console.error(`Error al obtener el veterinario ${cita.id_veterinario}:`, error);
              vetNames[cita.id_veterinario] = t('unknown_vet'); // Fallback en caso de error
            }
          }
        }

        setNombreVeterinarios(vetNames);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [userId, t]);

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
            {citas.map((cita) => {
              // Buscar el nombre de la mascota asociada a esta cita
              const mascota = mascotas.find((m) => m.id === cita.id_mascota); // Asegúrate de que 'id_mascota' sea el nombre correcto

              return (
                <IonCard key={cita.id} className="appointment-card">
                  <IonCardHeader>
                    <h2 className="text-dark-blue font-bold">{t('date_label')}: {cita.fecha_cita}</h2>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="text-dark-blue">{t('time_label')}: {cita.hora_cita}</p>
                    <p className="text-dark-blue">{t('title')}: {mascota?.nombre_mascota || t('unknown_pet')}</p>
                    <p className="text-dark-blue">{t('vet_label')}: {nombreVeterinarios[cita.id_veterinario] || t('unknown_vet')}</p>
                    <IonButton
                      expand="block"
                      color="primary"
                      onClick={() => {
                        localStorage.setItem('id_cita', cita.id.toString());
                        localStorage.setItem('nombre_veterinario', nombreVeterinarios[cita.id_veterinario]);
                        history.push(`/citas/${cita.id}/editar`);
                      }}
                      className="view-appointment-button"
                    >
                      {t('view_appointment_button')}
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Appointments;
