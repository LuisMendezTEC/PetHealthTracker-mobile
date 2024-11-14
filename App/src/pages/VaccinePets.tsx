import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar hook para traducción
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getMascotasByUser, getVaccine, getVaccineByPet } from '../components/api';
import { Mascota, VacunaRel, Vacunas } from '../components/models';
import '../styles/VaccinePets.css';

const VaccinePets: React.FC = () => {
  const { t } = useTranslation(); // Hook para traducción
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [vacunasByMascota, setVacunasByMascota] = useState<{ [key: number]: Vacunas[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
  const history = useHistory();
  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
    const fetchMascotasYVacunas = async () => {
      if (userId) {
        try {
          const data = await getMascotasByUser(Number(userId));
          setMascotas(data);

          // Para cada mascota, obtener sus vacunas
          console.log("mascotas");
          console.log(data);
          const vacunasPorMascota: { [key: number]: Vacunas[] } = {};
          for (const mascota of data) {
            const vacunasData = await getVaccineByPet(mascota.id);
            console.log("vacunasData");
            console.log(vacunasData);
            const vacunasDetalles = await Promise.all(
              vacunasData.map(async (vacunaRel: VacunaRel) => {
                const vacuna = await getVaccine(vacunaRel.vacuna);
                console.log("vacuna");
                console.log(vacuna[0]);
                return vacuna[0];
              })
            );
            vacunasPorMascota[mascota.id] = vacunasDetalles; // Asociar vacunas a la mascota por su ID
          }
          setVacunasByMascota(vacunasPorMascota); // Actualizar el estado con todas las vacunas por mascota
        } catch (error) {
          console.error(t('connection_error'), error); // Traducción
        } finally {
          setLoading(false);
        }
      } else {
        console.error(t('fields_empty')); // Traducción
      }
    };
    fetchMascotasYVacunas();
  }, [userId, t]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('title_vaccine_pets')}</IonTitle> {/* Traducción */}
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
                <IonLabel>
                  <h2>{mascota.nombre_mascota}</h2>
                  {vacunasByMascota[mascota.id] && vacunasByMascota[mascota.id].length > 0 ? (
                    <IonList>
                      {vacunasByMascota[mascota.id].map((vacuna) => (
                        <IonItem key={vacuna.id}>
                          <IonLabel>
                            <h3>{t('vaccine_label')}: {vacuna.tipo_vacuna}</h3> {/* Traducción */}
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p>{t('no_vaccines')}</p> 
                  )}
                </IonLabel>
                <IonButton expand="block" className="mt-2 w-32 h-10" onClick={() => history.push(`/mascotas/${mascota.id_dueño}/editar`)}>
                  {t('view_pet_button')} {/* Traducción */}
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default VaccinePets;
