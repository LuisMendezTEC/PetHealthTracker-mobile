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
              <OptionCard title="Pets" description="View and manage your pets" link="/Pets" />
            </IonCol>

            {/* Card for Add New Pet */}
            <IonCol size="6" size-md="4">
              <OptionCard title="Add Pet" description="Add a new pet to your list" link="/PetAdd" />
            </IonCol>

            <IonCol size="6" size-md="4">
              <OptionCard title="Appointments" description="View and manage your appointments" link="/Appointments" />
            </IonCol>

            {/* Future cards can be added here */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
