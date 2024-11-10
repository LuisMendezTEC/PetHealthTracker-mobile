import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import OptionCard from '../components/OptionCard';

const Dashboard: React.FC = () => {
  const clientName = localStorage.getItem('nombre_usuario'); // Obtiene el nombre del cliente desde el almacenamiento local

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{`Bienvenido, ${clientName}`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {/* Card for Pets */}
            <IonCol size="6" size-md="4">
              <OptionCard title="Mascotas" description="Ver y editar tus mascotas" link="/Pets" />
            </IonCol>

            {/* Card for Add New Pet */}
            <IonCol size="6" size-md="4">
              <OptionCard title="Añadir mascota" description="Agrega una nueva mascota a tu lista" link="/PetAdd" />
            </IonCol>

            <IonCol size="6" size-md="4">
              <OptionCard title="Citas" description="Ver tus citas" link="/Appointments" />
            </IonCol>

            <IonCol size="6" size-md="4">
              <OptionCard title="Añadir cita" description="Añade una nueva cita" link="/AppointmentsAdd" />
            </IonCol>
            <IonCol size="6" size-md="4">
              <OptionCard title="Diagósticos" description="Ver diagnósticos" link="/Diagnostics" />
            </IonCol>
            <IonCol size="6" size-md="4">
              <OptionCard title="Vacunas" description="Ver vacunas de mis mascotas" link="/VaccinePets" />
            </IonCol>
            {/* Future cards can be added here */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
