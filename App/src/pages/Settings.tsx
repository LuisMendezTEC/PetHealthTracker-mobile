import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../Context/ThemeContext';
import "../styles/VaccinePets.css";

const Settings: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('client_id');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('id_cita');
    localStorage.removeItem('nombre_veterinario');
    window.location.reload();
  }

  React.useEffect(() => {
    console.log('Idioma actual:', i18n.language);
  }, [i18n.language]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>{t('select_language')}</IonLabel>
            <IonSelect
              value={i18n.language}
              placeholder={t('select_language')}
              onIonChange={(e) => handleLanguageChange(e.detail.value)}
              interface="popover"
            >
              <IonSelectOption value="en">{t('en')}</IonSelectOption>
              <IonSelectOption value="es">{t('es')}</IonSelectOption>
              <IonSelectOption value="it">{t('it')}</IonSelectOption>
              <IonSelectOption value="fr">{t('fr')}</IonSelectOption>
              <IonSelectOption value="po">{t('po')}</IonSelectOption>
              <IonSelectOption value="al">{t('al')}</IonSelectOption>
              <IonSelectOption value="he">{t('he')}</IonSelectOption>
              <IonSelectOption value="uk">{t('uk')}</IonSelectOption>
              <IonSelectOption value="jp">{t('jp')}</IonSelectOption>
              <IonSelectOption value="ch">{t('ch')}</IonSelectOption>
            </IonSelect>
          </IonItem>
  
          <IonItem lines="none">
            <IonLabel>{t('dark_mode')}</IonLabel>
            <IonToggle
              checked={isDarkMode}
              onIonChange={toggleDarkMode}
            />
          </IonItem>
  
          <IonItem lines="none">
          <IonButton style={{ backgroundColor: '#FF7F7F', color: 'white' }} 
            className="styled-button-full:last-child" 
            onClick={handleLogOut} >
            {t('log_out')} 
          </IonButton>
      
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
};
  

export default Settings;