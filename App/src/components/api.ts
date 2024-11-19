// src/api.ts
import axios from 'axios';
import { Cita, Mascota, VacunaRel } from './models';
const userId = localStorage.getItem('client_id'); 
const token = localStorage.getItem('token')



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:  {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const getMascotasByUser = async (userId: number) => {
  const response =  await api.get(`mascotas?id_dueño=${userId}`);
  console.log("Arreglar");
  console.log(response.data);   
  console.log("UserID: "+ userId);
  const mascotas = response.data.data.filter((mascota: Mascota) => mascota.id_dueño === userId);

  return mascotas;
};

export const getMascotaById = async (id: number) => {
  const response = await api.get(`mascotas/${id}`);
  return response.data.data;
}


export const updateMascota = async (id: number, mascota: Mascota) => {
  const response = await api.put(`mascotas/${id}/editar`, mascota);
  console.log("EDITAR MASCOTA");  
  console.log(response.data);
  return response.data.data;
};

export const addPet = async (mascota: Mascota) => {
  console.log(mascota);
  const response = await api.post(`mascotas/`, mascota);
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
  
export const addCita = async (cita: Cita) => {
    const response = await api.post('/citas', cita);
    return response.data.data;
}

export const getDiagnosticsByPet = async (mascotaId: number) => {
  const response = await fetch(`http://localhost:8000/historial/cliente/${mascotaId}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener los diagnósticos de la mascota");
  }
  return data.data;
}

export const getVaccineByPet = async (mascotaId: number): Promise<VacunaRel[]> => {
  const response = await api.get(`/vacunas_mascotas/${mascotaId}`);
  return response.data;
};  

export const getVaccine = async (id: number) => {
  const response = await fetch(`http://localhost:8000/vacunas/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la vacuna");
  }
  return data.data;
}

export const getVetByPet = async (veterinario_id: number) => {
  const response = await fetch(`http://localhost:8000/veterinarios/${veterinario_id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario de la mascota");
  }
  return data.data;
}

export const getVet = async () => {
  const response = await fetch(`http://localhost:8000/veterinarios`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario");
  }
  return data.data;
}