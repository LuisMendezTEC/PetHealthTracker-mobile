import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar hook para traducción
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import logo from '../images/animals-icon-login.png';

const Register: React.FC = () => {
  const { t } = useTranslation(); // Hook para traducción
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && email && password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/clientes/', {
          nombre_usuario: username,
          correo: email,
          contraseña: password,
        });

        if (response.status === 200) {
          setAlertMessage(t('registration_success')); // Traducción
          setShowAlert(true);
          history.push('/Login'); // Redirige a la página de inicio de sesión
        } else {
          setAlertMessage(t('registration_error')); // Traducción
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage(t('connection_error')); // Traducción
        setShowAlert(true);
      }
    } else {
      setAlertMessage(t('fields_empty')); // Traducción
      setShowAlert(true);
    }
  };

  return (
    <IonPage className="h-full w-full flex items-center justify-center bg-cover bg-center">
      <IonHeader>
        <IonToolbar className="bg-wood">
          <IonTitle className="text-white">VetCare</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={goToSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
  
      <IonContent className="ion-padding flex flex-col items-center justify-center w-full h-full">
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg p-8 shadow-2xl space-y-6 flex flex-col items-center">
          <img src={logo} alt="logo" className="w-44 h-44 mb-6 rounded-full" />
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
            {t('register')}
          </h1>
  
          {/* Campo de usuario */}
          <IonItem className="input-item flex flex-col">
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              label={t('username_label')}
              labelPlacement="stacked"
              placeholder={t('username_placeholder')}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </IonItem>
  
          {/* Campo de email */}
          <IonItem className="input-item flex flex-col">
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              label={t('email_label')}
              labelPlacement="stacked"
              placeholder={t('email_placeholder')}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </IonItem>
  
          {/* Campo de contraseña */}
          <IonItem className="input-item flex flex-col">
            <IonInput
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              label={t('password_label')}
              type="password"
              labelPlacement="stacked"
              placeholder={t('password_placeholder')}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </IonItem>
  
          {/* Botón de registro */}
          <IonButton
            expand="block"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
            onClick={handleRegister}
          >
            {t('complete_registration')}
          </IonButton>
  
          {/* Enlace para iniciar sesión */}
          <IonText className="text-center mt-4">
            {t('already_have_account')}{' '}
            <a href="/Login" className="text-blue-500 hover:underline">
              {t('login')}
            </a>
          </IonText>
        </div>
  
        {/* Alerta de registro */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={t('registration_success')}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
}

export default Register;
