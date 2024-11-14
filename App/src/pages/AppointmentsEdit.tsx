import {
    IonAlert,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { cancelarCita, getCitaByFecha } from '../components/api'; // función API para obtener y cancelar la cita
import { Cita } from '../components/models';
 

const AppointmentsEdit: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cita, setCita] = useState<Cita | null>(null);
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
  const id_cita = localStorage.getItem('id_cita');
  const nombre_veterinario = localStorage.getItem('nombre_veterinario');    
    const { t } = useTranslation();
  const history = useHistory();
  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
      const fetchCita = async () => {
          if (id_cita) {
              const cita_id = Number(id_cita);
              try {
                  const citaData = await getCitaByFecha(cita_id);
                  console.log("CitaData");
                  console.log(citaData);
                  setCita(citaData[0]);
              } catch (error) {
                  console.error("Error al obtener la cita:", error);
              } finally {
                  setLoading(false);
              }
          }
      };
      fetchCita();
  }, [id_cita]);

  const handleCancelCita = async () => {
      if (cita && id_cita) {
          const cita_id = Number(id_cita);
          try {
              await cancelarCita(cita_id); // Llama a la API para cancelar la cita
              alert("La cita ha sido cancelada exitosamente.");
              // Aquí puedes redirigir a otra página si es necesario
          } catch (error) {
              console.error("Error al cancelar la cita:", error);
              alert("Hubo un problema al cancelar la cita. Por favor, intenta de nuevo.");
          }
      }
  };

  return (
      <IonPage className="bg-wood">
          <IonHeader>
              <IonToolbar className="bg-wood">
                  <IonTitle className="text-brown">{t("appointment_info_title")}</IonTitle>
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
                  cita && (
                      <IonList className="p-6 space-y-6">
                          <IonCard className="card-bg-wood">
                              <IonCardHeader>
                                  <IonLabel className="text-lg font-bold text-brown">{t("date_label")}</IonLabel>
                              </IonCardHeader>
                              <IonCardContent>{cita.fecha_cita}</IonCardContent>
                          </IonCard>

                          <IonCard className="card-bg-wood">
                              <IonCardHeader>
                                  <IonLabel className="text-lg font-bold text-brown">{t("time_label")}</IonLabel>
                              </IonCardHeader>
                              <IonCardContent>{cita.hora_cita}</IonCardContent>
                          </IonCard>

                          <IonCard className="card-bg-wood">
                              <IonCardHeader>
                                  <IonLabel className="text-lg font-bold text-brown">{t("vet_label")}</IonLabel>
                              </IonCardHeader>
                              <IonCardContent>{nombre_veterinario}</IonCardContent>
                          </IonCard>

                          <IonButton
                              expand="full"
                              color="danger"
                              onClick={() => setShowCancelAlert(true)}
                              className="mt-6"
                          >
                              {t("cancel_appointment_header")}
                          </IonButton>
                          <IonAlert
                              isOpen={showCancelAlert}
                              onDidDismiss={() => setShowCancelAlert(false)}
                              header={t("cancel_appointment_button")}
                              message={t("cancel_appointment_message")}
                              buttons={[
                                  {
                                      text: (t("no")),
                                      role: "cancel",
                                      handler: () => {
                                          setShowCancelAlert(false);
                                      },
                                  },
                                  {
                                      text: (t("yes")),
                                      handler: handleCancelCita,
                                  },
                              ]}
                          />
                      </IonList>
                  )
              )}
          </IonContent>
      </IonPage>
  );
};

export default AppointmentsEdit;
