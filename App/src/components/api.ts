// src/api.ts
import axios from 'axios';
import { Mascota } from './models';
const userId = localStorage.getItem('client_id'); // Obtiene el ID del usuario logueado correctamente


const api = axios.create({
  baseURL: 'http://localhost:8000', // Cambia esto a tu base URL real
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMascotasByUser = async (userId: number) => {
  const response = await api.get(`/mascotas?id_dueño=${userId}`);
  console.log("Arreglar");
  console.log(response.data);   
  console.log("UserID: "+ userId);
  const mascotas = response.data.data.filter((mascota: Mascota) => mascota.id_dueño === userId);

  return mascotas;
};


export const updateMascota = async (id: number, mascota: Mascota) => {
  const response = await api.put(`/mascotas/${id}/editar`, mascota);
  return response.data.data;
};

export const addPet = async (mascota: Mascota) => {
  const response = await api.post(`/mascotas`, mascota);
  return response.data.data;
}

export const getCitasByMascota = async (mascotaId: number) => {
  const response = await fetch(`http://localhost:8000/citas/${mascotaId}`);
  const data = await response.json();
    if (!response.ok) {
        throw new Error("Error al obtener las citas de la mascota");
    }
    console.log("DATA");
    console.log(data.data);
    return data.data; 
};

  export const getCitaByFecha = async (id_cita: number) => {
    const response = await fetch(`http://localhost:8000/citas/${id_cita}/fecha`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error al obtener la cita por fecha");
    }
    return data.data;
  }

export const cancelarCita = async (id: number) => {
    const response = await fetch(`http://localhost:8000/citas/${id}/cancelar`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Error al cancelar la cita");
    } else {
      return response.json();
    }
  };
  
