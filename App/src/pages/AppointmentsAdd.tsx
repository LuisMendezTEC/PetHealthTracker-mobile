import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonInput, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../Tailwind.css';
import { addCita, getMascotasByUser, getVet } from '../components/api';
import { Cita, Mascota } from '../components/models';

const CitasAdd: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [selectedMascota, setSelectedMascota] = useState<number | undefined>();
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [idVeterinario, setIdVeterinario] = useState<number | undefined>();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [veterinarios, setVeterinarios] = useState<any[]>([]);
  const client_id = Number(localStorage.getItem('client_id'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mascotasData = await getMascotasByUser(client_id);
        setMascotas(mascotasData);

        const veterinariosData = await getVet();
        setVeterinarios(veterinariosData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, [client_id]);

  const handleAddCita = async () => {
    if (!selectedMascota || !fechaCita || !horaCita || !idVeterinario) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const nuevaCita: Cita = {
      id_mascota: selectedMascota,
      fecha_cita: fechaCita,
      id_veterinario: idVeterinario,
      hora_cita: horaCita,
    };

    try {
      setLoading(true);
      await addCita(nuevaCita);
      alert("Cita añadida con éxito");
      setSelectedMascota(undefined);
      setFechaCita('');
      setHoraCita('');
      setIdVeterinario(undefined);
      setShowToast(true);
    } catch (error) {
      console.error("Error al añadir la cita:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="bg-wood">
      <IonHeader>
        <IonToolbar className="bg-wood">
          <IonTitle className="text-brown">Añadir Cita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-wood">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList className="p-6 space-y-6">
            <IonCard className="card-bg-wood">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-brown">Selecciona Mascota</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  placeholder="Selecciona una mascota"
                  value={selectedMascota}
                  onIonChange={(e) => setSelectedMascota(e.detail.value)}
                  className="border rounded-lg p-2"
                >
                  {mascotas.map((mascota) => (
                    <IonSelectOption key={mascota.id} value={mascota.id}>
                      {mascota.nombre_mascota} (ID: {mascota.id})
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-wood">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-brown">Fecha de Cita</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="date"
                  value={fechaCita}
                  onIonChange={(e) => setFechaCita(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-wood">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-brown">Hora de Cita</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonInput
                  type="time"
                  value={horaCita}
                  onIonChange={(e) => setHoraCita(e.detail.value!)}
                  className="border rounded-lg p-2"
                />
              </IonCardContent>
            </IonCard>

            <IonCard className="card-bg-wood">
              <IonCardHeader>
                <IonLabel className="text-lg font-bold text-brown">Veterinario</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <IonSelect
                  placeholder="Selecciona un veterinario"
                  value={idVeterinario}
                  onIonChange={(e) => setIdVeterinario(e.detail.value)}
                  className="border rounded-lg p-2"
                >
                  {veterinarios.map((veterinario) => (
                    <IonSelectOption key={veterinario.id} value={veterinario.id}>
                      {veterinario.nombre}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCardContent>
            </IonCard>

            <IonButton expand="full" onClick={handleAddCita} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
              Añadir Cita
            </IonButton>
          </IonList>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Cita añadida con éxito"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default CitasAdd;
