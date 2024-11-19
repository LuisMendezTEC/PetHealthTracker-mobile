import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { settingsOutline } from 'ionicons/icons';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { useAuth } from '../Context/LoginContext';
import AnimationComponent from '../components/AnimationComponent';
import backgroundImage from '../images/10143477.jpg';
import logo from '../images/animals-icon-login.png';
import '../styles/Login.css';

interface CustomJwtPayload {
    nombre: string;
    client_id: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState(localStorage.getItem('temp_email') || ''); // Cargar email guardado temporalmente
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true);
    const history = useHistory();
    const {t} = useTranslation();
    const { login } = useAuth();
    const goToSettings = () => {
        history.push('/settings');
    }
    const apiUrl = import.meta.env.VITE_API_URL;



    useEffect(() => {
        // Guardar el email en localStorage en cada cambio, para mantenerlo entre intentos fallidos
        localStorage.setItem('temp_email', email);
    }, [email]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Limpiar mensaje de alerta antes de cada intento de login
        setAlertMessage('');
        setShowAlert(false);

        if (email && password) {
            try {
                const response = await axios.post(`${apiUrl}auth/login`, {
                    correo: email,
                    contraseña: password,
                    role: 'cliente',
                });

                if (response.data && response.data.access_token) {
                    const decodedToken = jwtDecode<CustomJwtPayload>(response.data.access_token);

                    // Limpiar el email guardado temporalmente después de un inicio de sesión exitoso
                    localStorage.removeItem('temp_email');
                    localStorage.setItem('token', response.data.access_token);
                    login(response.data.access_token, response.data.id);
                    setAlertMessage('Inicio de sesión exitoso.');
                    localStorage.setItem('nombre_usuario', decodedToken.nombre);
                    localStorage.setItem('client_id', decodedToken.client_id);
                    history.push('/Dashboard');
                }
            } catch (error) {
                console.error('Error de inicio de sesión:', error);
                setAlertMessage('Error al iniciar sesión. Verifica tus credenciales.');
                setShowAlert(true);
            }
        } else {
            setAlertMessage('Por favor, ingrese ambos campos.');
            setShowAlert(true);
        }
    };

    return (
      <IonPage
        className="h-full w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <IonHeader>
          <IonToolbar className="bg-wood">
            <IonTitle className="text-white">VetCare</IonTitle>{" "}
            {/* Cambiado a blanco */}
            <IonButtons slot="end">
              <IonButton onClick={goToSettings}>
                <IonIcon icon={settingsOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {showAnimation ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimationComponent
              onAnimationComplete={() => setShowAnimation(false)}
            />
          </div>
        ) : (
          <IonContent className="ion-padding flex flex-col items-center justify-center w-full h-full">
            <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg p-8 shadow-2xl space-y-6 flex flex-col items-center">
              <img
                src={logo}
                alt="logo"
                className="w-44 h-44 mb-6 rounded-full"
              />
              <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
                {t("login_title")}
              </h1>
              <IonItem className="input-item flex flex-col w-full">
                <IonInput
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  label={t("email_label")}
                  labelPlacement="stacked"
                  placeholder={t("email_placeholder")}
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </IonItem>
              <IonItem className="input-item flex flex-col w-full">
                <IonInput
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  label={t("password_label")}
                  type="password"
                  labelPlacement="stacked"
                  placeholder="********"
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </IonItem>
              <IonButton
                expand="block"
                className="login-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-200"
                onClick={handleLogin}
              >
                {t("login_button")}
              </IonButton>
              <IonText className="register-link text-center mt-4 text-gray-600">
                {t("no_account")}{" "}
                <Link to="/Register" className="text-blue-600 hover:underline">
                  {t("register")}
                </Link>
              </IonText>
              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={t("login_error")}
                message={alertMessage}
                buttons={["OK"]}
              />
            </div>
          </IonContent>
        )}
      </IonPage>
    );
};

export default Login;