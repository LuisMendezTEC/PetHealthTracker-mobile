import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FaDog, FaPlus, FaCalendarAlt, FaNotesMedical, FaSyringe } from 'react-icons/fa';
import OptionCard from '../components/OptionCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const clientName = localStorage.getItem('nombre_usuario');
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-light-blue shadow-md">
          <IonTitle className="dashboard-title">
            {t('dashboard_title', { clientName })}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="dashboard-container">
        <IonGrid className="dashboard-grid">
          <IonRow>
            {/* Tarjeta de Mascotas */}
            <IonCol size="6" size-md="4" className="dashboard-col">
              <OptionCard 
                title={t('pets_title')} 
                description={t('pets_description')} 
                link="/Pets" 
                Icon={FaDog} 
              />
            </IonCol>

            {/* Tarjeta para Añadir Nueva Mascota */}
            <IonCol size="6" size-md="4" className="dashboard-col">
              <OptionCard 
                title={t('add_pet_title')} 
                description={t('add_pet_description')} 
                link="/PetAdd" 
                Icon={FaPlus} 
              />
            </IonCol>

            {/* Tarjeta de Citas */}
            <IonCol size="6" size-md="4" className="dashboard-col">
              <OptionCard 
                title={t('appointments_title')} 
                description={t('appointments_description')} 
                link="/Appointments" 
                Icon={FaCalendarAlt} 
              />
            </IonCol>

            {/* Tarjeta para Añadir Nueva Cita */}
            <IonCol size="6" size-md="4" className="dashboard-col">
              <OptionCard 
                title={t('add_appointment_title')} 
                description={t('add_appointment_description')} 
                link="/AppointmentsAdd" 
                Icon={FaPlus} 
              />
            </IonCol>

            {/* Tarjeta de Diagnósticos */}
            <IonCol size="6" size-md="4" className="dashboard-col">
              <OptionCard 
                title={t('diagnostics_title')} 
                description={t('diagnostics_description')} 
                link="/Diagnostics" 
                Icon={FaNotesMedical} 
              />
            </IonCol>

            {/* Tarjeta de Vacunas */}
            <IonCol size="6" size-md="4" className="dashboard-col">
              <OptionCard 
                title={t('vaccines_title')} 
                description={t('vaccines_description')} 
                link="/VaccinePets" 
                Icon={FaSyringe} 
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;