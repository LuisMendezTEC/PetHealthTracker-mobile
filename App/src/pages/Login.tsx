import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonPage, IonText } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AnimationComponent from '../components/AnimationComponent'; // Import the new animation component
import logo from '../images/animals-1295975_1280.png';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('cliente');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true); // Add state for animation
    const history = useHistory();

    useEffect(() => {
        if (!showAnimation) {
            // Perform actions after animation ends if needed
        }
    }, [showAnimation]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email && password) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/login/', {
                    correo: email,
                    contraseña: password,
                    role: tipoUsuario,
                });

                if (response.data && response.data.access_token) {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('client_id', response.data.id);
                    setAlertMessage('Ingreso exitoso');
                    setShowAlert(true);
                    history.push('/Pets');
                } else {
                    setAlertMessage('Usuario o contraseña incorrectos.');
                    setShowAlert(true);
                }
            } catch (error) {
                setAlertMessage('Error al conectar con el servidor. Intente más tarde.');
                setShowAlert(true);
            }
        } else {
            setAlertMessage('Algunos campos están vacíos.');
            setShowAlert(true);
        }
    };

    return (
        <IonPage className="login-page bg-blue-500 h-full flex items-center justify-center">
            {showAnimation ? (
              <div className="flex items-center justify-center flex-col">  
    <AnimationComponent onAnimationComplete={() => setShowAnimation(false)} />  
      
    <IonText className="text-blue- bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6">            Bienvenido</IonText>
</div>

            ) : (
                <IonContent className="ion-padding login-form flex justify-center">
                    <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg space-y-6">
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
                            header={'Login Failed'}
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
