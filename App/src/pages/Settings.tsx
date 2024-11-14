import { IonContent, IonHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Settings: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng); // Cambia el idioma
    localStorage.setItem('selectedLanguage', lng); // Guarda la preferencia en localStorage
    console.log('Idioma cambiado a:', lng);
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
        <IonSelect
          value={i18n.language}
          placeholder={t('select_language')}
          onIonChange={(e) => handleLanguageChange(e.detail.value)}
        >
          <IonSelectOption value="en">{t("en")}</IonSelectOption>
          <IonSelectOption value="es">{t("es")}</IonSelectOption>
        </IonSelect>
      </IonContent>
    </>
  );
};

export default Settings;
