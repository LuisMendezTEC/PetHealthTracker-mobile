import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonPage, IonText } from '@ionic/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
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
    const { login } = useAuth();

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
                const response = await axios.post('http://127.0.0.1:8000/login/', {
                    correo: email,
                    contraseña: password,
                    role: 'cliente',
                });

                if (response.data && response.data.access_token) {
                    const decodedToken = jwtDecode<CustomJwtPayload>(response.data.access_token);

                    // Limpiar el email guardado temporalmente después de un inicio de sesión exitoso
                    localStorage.removeItem('temp_email');

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
            {showAnimation ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <AnimationComponent onAnimationComplete={() => setShowAnimation(false)} />
                </div>
            ) : (
                <IonContent className="ion-padding flex flex-col items-center justify-center w-full h-full">
                    <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg p-8 shadow-2xl space-y-6 flex flex-col items-center">
                        <img src={logo} alt="logo" className="w-44 h-44 mb-6 rounded-full" />
                        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Inicio de sesión</h1>
                        <IonItem className="input-item flex flex-col w-full">
                            <IonInput
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                label="Correo electrónico"
                                labelPlacement="stacked"
                                placeholder="example@example.com"
                                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </IonItem>
                        <IonItem className="input-item flex flex-col w-full">
                            <IonInput
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                label="Contraseña"
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
                            Iniciar sesión
                        </IonButton>
                        <IonText className="register-link text-center mt-4 text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link to="/Register" className="text-blue-600 hover:underline">
                                Registrarse
                            </Link>
                        </IonText>
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={'Error de inicio de sesión'}
                            message={alertMessage}
                            buttons={['OK']}
                        />
                    </div>
                </IonContent>
            )}
        </IonPage>
    );
};

export default Login;