import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonPage, IonText } from '@ionic/react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { useAuth } from '../Context/LoginContext';
import AnimationComponent from '../components/AnimationComponent';
import backgroundImage from '../images/10143477.jpg';
import logo from '../images/animals-1295975_1280.png';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true);
    const history = useHistory();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (email && password) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/login/', {
                    correo: email,
                    contraseña: password,
                    role: 'cliente',
                });
    
                if (response.data && response.data.access_token) {
                    // Decodificar el token sin la clave secreta
                    const decodedToken = jwtDecode(response.data.access_token);
                    console.log('Decoded Token:', decodedToken);  // Muestra el payload del token

                    // Ahora puedes usar los datos decodificados del token si los necesitas
                    login(response.data.access_token, response.data.id);
                    setAlertMessage('Inicio de sesión exitoso.');
                    localStorage.setItem('nombre_usuario', decodedToken.nombre); // Use the 'nombre' property 
                    localStorage.setItem('client_id', decodedToken.client_id); // Use the 'id' property                   
                    // Redirigir al usuario al Dashboard
                    history.push('/Dashboard');
                }
            } catch (error) {
                console.error('Error de inicio de sesión:', error);
                setAlertMessage('Error al iniciar sesión. Verifica tus credenciales.');
            }
        }
    };
    return (
        <IonPage
            className="h-full w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {showAnimation ? (
                <div className="flex items-center justify-center flex-col">
                    <AnimationComponent onAnimationComplete={() => setShowAnimation(false)} />
                    <IonText className="text-blue- bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6">
                        Bienvenido
                    </IonText>
                </div>
            ) : (
                <IonContent className="ion-padding flex justify-center items-center w-full h-full">
                    <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg p-6 shadow-lg space-y-6">
                        <img src={logo} alt="logo" className="w-24 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-center text-gray-800">Inicio de sesión</h1>
                        <IonItem className="input-item flex flex-col">
                            <IonInput
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                label="Correo electrónico"
                                labelPlacement="stacked"
                                placeholder="example@example.com"
                                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </IonItem>
                        <IonItem className="input-item flex flex-col">
                            <IonInput
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                label="Contraseña"
                                type="password"
                                labelPlacement="stacked"
                                placeholder="********"
                                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </IonItem>
                        <IonButton
                            expand="block"
                            className="login-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6"
                            onClick={handleLogin}
                        >
                            Iniciar sesión
                        </IonButton>
                        <IonText className="register-link text-center mt-4 text-gray-600">
                            ¿No tienes una cuenta? <Link to="/Register" className="text-blue-600 hover:underline">Registrarse</Link>
                        </IonText>
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={'Login Error'}
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
