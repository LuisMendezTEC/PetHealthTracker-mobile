import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React from 'react';
import { useTranslation } from 'react-i18next'; // Importa el hook de traducción
import { useHistory } from 'react-router-dom';
import OptionCard from '../components/OptionCard';


const Dashboard: React.FC = () => {
  const { t } = useTranslation(); // Inicializa el hook de traducción
  const clientName = localStorage.getItem('nombre_usuario'); // Obtiene el nombre del cliente desde el almacenamiento local
  const history = useHistory(); // Hook para manejar la navegación

  const goToSettings = () => {
    history.push('/settings');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('dashboard_title', { clientName })}</IonTitle> {/* Usa el nombre del cliente en la traducción */}
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {/* Card for Pets */}
            <IonCol size="6" size-md="4">
              <OptionCard 
                title={t('pets_title')} 
                description={t('pets_description')} 
                link="/Pets" 
              />
            </IonCol>

            {/* Card for Add New Pet */}
            <IonCol size="6" size-md="4">
              <OptionCard 
                title={t('add_pet_title')} 
                description={t('add_pet_description')} 
                link="/PetAdd" 
              />
            </IonCol>

            {/* Card for Appointments */}
            <IonCol size="6" size-md="4">
              <OptionCard 
                title={t('appointments_title')} 
                description={t('appointments_description')} 
                link="/Appointments" 
              />
            </IonCol>

            {/* Card for Add New Appointment */}
            <IonCol size="6" size-md="4">
              <OptionCard 
                title={t('add_appointment_title')} 
                description={t('add_appointment_description')} 
                link="/AppointmentsAdd" 
              />
            </IonCol>

            {/* Card for Diagnostics */}
            <IonCol size="6" size-md="4">
              <OptionCard 
                title={t('diagnostics_title')} 
                description={t('diagnostics_description')} 
                link="/Diagnostics" 
              />
            </IonCol>

            {/* Card for Vaccines */}
            <IonCol size="6" size-md="4">
              <OptionCard 
                title={t('vaccines_title')} 
                description={t('vaccines_description')} 
                link="/VaccinePets" 
              />
            </IonCol>

            {/* Future cards can be added here */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
