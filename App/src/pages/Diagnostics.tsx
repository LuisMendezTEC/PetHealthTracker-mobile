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
import { getCitasByMascota, getDiagnosticsByPet, getMascotasByUser, getVetByPet } from '../components/api';
import { Mascota } from '../components/models';
import '../styles/Diagnostics.css';

const Diagnostics: React.FC = () => {
  const { t } = useTranslation();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<{ [key: number]: any[] }>({});
  const [nombreVeterinarios, setNombreVeterinarios] = useState<{ [key: string]: string }>({});
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
          const diagnosticosPorMascota: { [key: number]: any[] } = {};
          const citasPorMascota: { [key: number]: any[] } = {};
          const nombreVeterinariosTemp: { [key: string]: string } = {};

          for (const mascota of data) {
            const diagnostics = await getDiagnosticsByPet(mascota.id);
            const citasData = await getCitasByMascota(mascota.id);
            diagnosticosPorMascota[mascota.id] = diagnostics;
            citasPorMascota[mascota.id] = citasData;
          }

          for (const mascota of data) {
            for (const cita of citasPorMascota[mascota.id]) {
              const vetData = await getVetByPet(cita.id_veterinario);
              nombreVeterinariosTemp[cita.id_veterinario] = vetData[0].nombre;
            }
          }

          setMascotas(data);
          setDiagnosticos(diagnosticosPorMascota);
          setNombreVeterinarios(nombreVeterinariosTemp);
        } catch (error) {
          console.error(t("connection_error"), error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("User ID not found in localStorage");
      }
    };
    fetchMascotas();
  }, [userId, t]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-light-blue">
          <IonTitle className="text-white">{t("diagnostics_title")}</IonTitle>
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
            {mascotas.map((mascota) => (
              <IonCard key={mascota.id} className="card-bg-light-blue">
                <IonCardHeader>
                  <h2 className="font-bold text-dark-blue">{mascota.nombre_mascota}</h2>
                </IonCardHeader>
                <IonCardContent>
                  {diagnosticos[mascota.id] && diagnosticos[mascota.id].length > 0 ? (
                    <IonList className="space-y-2 mt-2">
                      {diagnosticos[mascota.id].map((diagnostico) => (
                        <IonItem key={diagnostico.id} className="border-b border-gray-300">
                          <IonLabel>
                            <h3 className="font-semibold text-dark-blue">{t("date_label")}: {diagnostico.fecha}</h3>
                            <p className="text-dark-blue">{t("type_label")}: {diagnostico.tipo}</p>
                            <p className="text-dark-blue">{t("description_label")}: {diagnostico.descripcion}</p>
                            <p className="text-dark-blue">{t("vet_label")}: {nombreVeterinarios[diagnostico.veterinario_id] || t("no_veterinarian")}</p>
                            <p className="text-dark-blue">{t("result_label")}: {diagnostico.resultado}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p className="text-gray-500">{t("no_diagnostics")}</p>
                  )}
                  <IonButton
                    expand="full"
                    color="primary"
                    onClick={() => history.push(`/pets/${mascota.id_dueño}/edit`)}
                    className="styled-button-full"
                  >
                    {t("view_pet_button")}
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

export default Diagnostics;
