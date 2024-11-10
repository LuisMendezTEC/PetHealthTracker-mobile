import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../Tailwind.css';
import { cancelarCita, getCitaByFecha } from '../components/api'; // función API para obtener y cancelar la cita
import { Cita } from '../components/models';

const AppointmentsEdit: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cita, setCita] = useState<Cita | null>(null);
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
  const id_cita = localStorage.getItem('id_cita');

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
                  <IonTitle className="text-brown">Información de cita</IonTitle>
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
                                  <IonLabel className="text-lg font-bold text-brown">Fecha</IonLabel>
                              </IonCardHeader>
                              <IonCardContent>{cita.fecha_cita}</IonCardContent>
                          </IonCard>

                          <IonCard className="card-bg-wood">
                              <IonCardHeader>
                                  <IonLabel className="text-lg font-bold text-brown">Hora</IonLabel>
                              </IonCardHeader>
                              <IonCardContent>{cita.hora_cita}</IonCardContent>
                          </IonCard>

                          <IonCard className="card-bg-wood">
                              <IonCardHeader>
                                  <IonLabel className="text-lg font-bold text-brown">Veterinario ID</IonLabel>
                              </IonCardHeader>
                              <IonCardContent>{cita.id_veterinario}</IonCardContent>
                          </IonCard>

                          <IonButton
                              expand="full"
                              color="danger"
                              onClick={() => setShowCancelAlert(true)}
                              className="mt-6"
                          >
                              Cancelar cita
                          </IonButton>
                          <IonAlert
                              isOpen={showCancelAlert}
                              onDidDismiss={() => setShowCancelAlert(false)}
                              header="Cancelar cita"
                              message="¿Seguro que quieres cancelar esta cita?"
                              buttons={[
                                  {
                                      text: "No",
                                      role: "cancel",
                                      handler: () => {
                                          setShowCancelAlert(false);
                                      },
                                  },
                                  {
                                      text: "Sí",
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
