import { Cita, Mascota, VacunaRel } from './models';

const userId = localStorage.getItem('client_id'); 
const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
};

const URL = import.meta.env.VITE_API_URL;

console.log(URL);

export const getMascotasByUser = async (userId: number) => {
  const response = await fetch(`${URL}mascotas/dueno/${userId}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener las mascotas del usuario");
  }
  return data.data;
};

export const getMascotaById = async (id: number) => {
  const response = await fetch(`${URL}mascotas/${id}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la mascota por ID");
  }
  return data.data[0];
};

export const updateMascota = async (id: number, mascota: Mascota) => {
  const response = await fetch(`${URL}mascotas/${id}/editar`, {
    method: "PUT",
    headers,
    body: JSON.stringify(mascota),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al actualizar la mascota");
  }
  return data.data;
};

export const addPet = async (mascota: Mascota) => {
  console.log(token);
  const response = await fetch(`${URL}mascotas/`, {
    method: "POST",
    headers,
    body: JSON.stringify(mascota),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al agregar la mascota");
  }
  return data.data;
};

export const getCitasByMascota = async (mascotaId: number) => {
  const response = await fetch(`${URL}citas/${mascotaId}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener las citas de la mascota");
  }
  return data.data;
};

export const getCitaByFecha = async (id_cita: number) => {
  const response = await fetch(`${URL}citas/${id_cita}/fecha`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la cita por fecha");
  }
  return data.data;
};

export const cancelarCita = async (id: number) => {
  const response = await fetch(`${URL}citas/${id}/cancelar`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error("Error al cancelar la cita");
  }
  return response.json();
};

export const addCita = async (cita: Cita) => {
  const response = await fetch(`${URL}citas/`, {
    method: "POST",
    headers,
    body: JSON.stringify(cita),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al agregar la cita");
  }
  return data.data;
};

export const getDiagnosticsByPet = async (mascotaId: number) => {
  const response = await fetch(`${URL}diagnosticos/historial/${mascotaId}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener los diagnósticos de la mascota");
  }
  return data.data;
};

export const getVaccineByPet = async (mascotaId: number): Promise<VacunaRel[]> => {
  const response = await fetch(`${URL}vacunas/mascotas/${mascotaId}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener las vacunas de la mascota");
  }
  return data;
};

export const getVaccine = async (id: number) => {
  console.log(id);
  const response = await fetch(`${URL}vacunas/${id}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la vacuna");
  }
  return data.data;
};

export const getVetByPet = async (veterinario_id: number) => {
  const response = await fetch(`${URL}funcionarios/${veterinario_id}`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario de la mascota");
  }
  return data.data[0];
};

export const getVet = async () => {
  const response = await fetch(`${URL}funcionarios`, { headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario");
  }
  return data.data;
};