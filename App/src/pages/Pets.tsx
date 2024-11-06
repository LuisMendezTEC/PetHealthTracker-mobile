// src/pages/MascotasPage.tsx
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../Tailwind.css';
import { getMascotasByUser, updateMascota } from '../components/api';
import { Mascota } from '../components/models';
import '../styles/Pets.css';

const Pets: React.FC = () => {
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userId = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente
    const history = useHistory();

    
  
    useEffect(() => {
      const fetchMascotas = async () => {
        console.log(userId);
        if (userId) { // Verifica que userId exista antes de usarlo
          try {
            const data = await getMascotasByUser(Number(userId)); // Asegúrate de convertirlo a número si es necesario
            setMascotas(data);
            console.log("Data");  
            console.log(data);
          } catch (error) {
            console.error("Error al obtener mascotas:", error);
          } finally {
            setLoading(false);
          }
        } else {
          console.error("No se encontró el ID del usuario en localStorage");
        }
      };
      fetchMascotas();
    }, [userId]);

  const handleUpdateMascota = async (mascota: Mascota) => {
    try {
      await updateMascota(mascota.id, mascota);
      alert("Mascota actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Mascotas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {mascotas.map((mascota) => (
              <IonItem key={mascota.id}>
                <IonLabel>{mascota.nombre_mascota}</IonLabel>
                <IonButton onClick={() => history.push(`/mascotas/${mascota.id_dueño}/editar`)}>Editar</IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Pets;
