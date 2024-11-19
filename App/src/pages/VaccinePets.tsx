import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getMascotasByUser, getVaccine, getVaccineByPet } from '../components/api';
import { Mascota, Vacunas } from '../components/models';
import '../styles/VaccinePets.css';

const VaccinePets: React.FC = () => {
  const { t } = useTranslation();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [vacunasByMascota, setVacunasByMascota] = useState<{ [key: number]: Vacunas[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('client_id');
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  useEffect(() => {
    const fetchMascotasYVacunas = async () => {
      if (!userId) {
        console.error(t('fields_empty'));
        return;
      }
  
      try {
        setLoading(true);
  
        // Obtener las mascotas del usuario
        const mascotasData = await getMascotasByUser(Number(userId));
        setMascotas(mascotasData);
  
        const vacunasPorMascota: { [key: number]: Vacunas[] } = {};
  
        for (const mascota of mascotasData) {
          try {
            console.log("ID DE LA MASCOTA: ", mascota.id);
            const vacunasData = await getVaccineByPet(mascota.id);
  
            // Asegurar que vacunasData es un array
            const vacunaRelArray = Array.isArray(vacunasData)
              ? vacunasData
              : [vacunasData]; // Convertir a array si no lo es
  
  
            // Obtener detalles de cada vacuna relacionada
            const vacunasDetalles = await Promise.all(
              vacunaRelArray.map(async (vacunaRel) => {
                try {
                  // Procesar cada ID de vacuna en `vacunaRel.data`
                  if (vacunaRel.data && Array.isArray(vacunaRel.data)) {
                    const detallesVacunas = await Promise.all(
                      vacunaRel.data.map(async (vacunaItem: { id: number }) => {
                        const vacuna = await getVaccine(vacunaItem.id);
                        return vacuna || null; // Devuelve vacuna o null si no es válida
                      })
                    );
  
                    // Filtrar resultados nulos
                    return detallesVacunas.filter((v) => v !== null);
                  }
  
                  console.error("Formato inesperado en vacunaRel.data: ", vacunaRel.data);
                  return [];
                } catch (error) {
                  console.error(`Error al obtener detalles de vacuna:`, error);
                  return [];
                }
              })
            );
  
            // Aplanar el array de arrays (en caso de que existan múltiples arrays internos)
            const vacunasFlat = vacunasDetalles.flat();
            vacunasByMascota[mascota.id] = vacunasFlat;
          } catch (error) {
            console.error(`Error al obtener vacunas para la mascota ${mascota.id}:`, error);
          }
        }
  
        setVacunasByMascota(vacunasByMascota);
        console.log("VACUNAS POR MASCOTA: ", vacunasByMascota);
      } catch (error) {
        console.error(t('connection_error'), error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMascotasYVacunas();
  }, [userId, t]);
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-light-blue">
          <IonTitle className="text-white">{t('title_vaccine_pets')}</IonTitle>
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
    {vacunasByMascota[mascota.id] && vacunasByMascota[mascota.id].length > 0 ? (
      <IonList className="space-y-2 mt-2">
        {vacunasByMascota[mascota.id].map((vacuna) => (
          <IonItem key={vacuna.id} className="border-b border-gray-300">
            <IonLabel>
              <h3 className="font-semibold text-dark-blue">
                {t('vaccine_label')}: {vacuna[0].tipo_vacuna || t('unknown_vaccine')}
              </h3>
              <p className="text-dark-blue">
                {t('date_label')}: {vacuna[0].created_at?.slice(0, 10) || t('no_date')}
              </p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    ) : (
      <p className="text-gray-500">{t('no_vaccines')}</p>
    )}
  </IonCardContent>
</IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default VaccinePets;
