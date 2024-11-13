// src/pages/PageWithSettingsButton.tsx
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
    
export const Settings: React.FC = () => {
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuraciones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* Resto del contenido de la página */}
    </>
  );
};

export default Settings;
