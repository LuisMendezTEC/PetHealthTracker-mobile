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
