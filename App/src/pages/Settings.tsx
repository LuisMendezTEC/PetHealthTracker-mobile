import {
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

const Settings: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };

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
            <IonLabel>{t('Language')}</IonLabel>
            <IonSelect
              value={i18n.language}
              placeholder={t('select_language')}
              onIonChange={(e) => handleLanguageChange(e.detail.value)}
              interface="popover"
            >
              <IonSelectOption value="en">{t('en')}</IonSelectOption>
              <IonSelectOption value="es">{t('es')}</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem lines="none">
            <IonLabel>{t('dark_mode')}</IonLabel>
            <IonToggle
              checked={isDarkMode}
              onIonChange={toggleDarkMode}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
};

export default Settings;