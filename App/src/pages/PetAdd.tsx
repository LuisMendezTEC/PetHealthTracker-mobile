import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInput, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import '../../Tailwind.css';
import { addPet } from '../components/api';
import { Mascota } from '../components/models';

const PetsAdd: React.FC = () => {
  const [nombreMascota, setNombreMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const idDueño = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente

  const handleAddPet = async () => {
    if (!nombreMascota || !especie || !raza || !fechaNacimiento) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const nuevaMascota: Mascota = {
      id: Date.now(), // Usa un ID temporal único
      nombre_mascota: nombreMascota,
      especie,
      raza,
      fecha_nacimiento: fechaNacimiento,
      id_dueño: Number(idDueño),
    };

    try {
      setLoading(true);
      await addPet(nuevaMascota);
      alert("Mascota añadida con éxito");
      setNombreMascota('');
      setEspecie('');
      setRaza('');
      setFechaNacimiento('');
      setShowToast(true);
    } catch (error) {
      console.error("Error al añadir la mascota:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Añadir Mascota</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList className="p-6 space-y-6">
            <IonCard className="bg-blue-50"> {/* Fondo celeste para el cuadro */}
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-blue-500">Nombre</IonLabel> {/* Título celeste */}
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  value={nombreMascota}
                  onIonChange={(e) => setNombreMascota(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="bg-blue-50">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-blue-500">Especie</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  value={especie}
                  onIonChange={(e) => setEspecie(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="bg-blue-50">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-blue-500">Raza</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  value={raza}
                  onIonChange={(e) => setRaza(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="bg-blue-50">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-blue-500">Fecha de Nacimiento</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="date"
                  value={fechaNacimiento}
                  onIonChange={(e) => setFechaNacimiento(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonButton expand="full" onClick={handleAddPet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
              Añadir Mascota
            </IonButton>
          </IonList>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Mascota añadida con éxito"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default PetsAdd;
