import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonPage, IonText } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/animals-1295975_1280.png';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();


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
          setAlertMessage('Registro exitoso. Ahora puedes iniciar sesión.');
          setShowAlert(true);
          history.push('/Login'); // Redirige a la página de inicio de sesión
        } else {
          setAlertMessage('Error de registro. Por favor, intenta de nuevo.');
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage('Error de conexión con el servidor. Intenta de nuevo más tarde.');
        setShowAlert(true);
      }
    } else {
      setAlertMessage('Algunos campos están vacíos.');
      setShowAlert(true);
    }
  };


  return (
    <IonPage className="register-page bg-blue-500 h-full flex items-center justify-center">
      <IonContent className="ion-padding register-form flex justify-center">
        <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg space-y-4">

          <img src={logo} alt="logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-center text-gray-800">Registro</h1>

          {/* Campo de Nombre de usuario */}
          <IonItem className="input-item flex flex-col">
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              label="Nombre de usuario"
              labelPlacement="stacked"
              placeholder="Tu nombre de usuario"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </IonItem>

          {/* Campo de correo electrónico */}
          <IonItem className="input-item flex flex-col">
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              label="Correo electrónico"
              labelPlacement="stacked"
              placeholder="example@example.com"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </IonItem>

          {/* Campo de contraseña */}
          <IonItem className="input-item flex flex-col">
            <IonInput
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              label="Contraseña"
              type="password"
              labelPlacement="stacked"
              placeholder="********"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </IonItem>

          {/* Botón de registro */}
          <IonButton expand="block" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4" onClick={handleRegister}>
            Registro
          </IonButton>

          {/* Enlace para iniciar sesión */}
          <IonText className="text-center mt-4">
            ¿Ya tienes una cuenta? <a href="/tab1" className="text-blue-500 hover:underline">Iniciar sesión</a>
          </IonText>

          {/* Alerta de registro */}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Registro'}
            message={alertMessage}
            buttons={['OK']}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Register;
