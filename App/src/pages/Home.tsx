import { IonAlert, IonButton, IonContent, IonItem, IonPage, IonText } from '@ionic/react';
import React, { useState } from 'react';


const Home: React.FC = () => {
    const [showAlert, setShowAlert] = useState(false);





    return (
        <IonPage>
            <IonContent>
                <IonItem>
                    <IonText>
                        <h1>Home</h1>
                    </IonText>
                </IonItem>
                <IonItem>
                    <IonButton onClick={() => setShowAlert(true)}>Show Alert</IonButton>
                </IonItem>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alert'}
                    message={'This is an alert message.'}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
}

export default Home;