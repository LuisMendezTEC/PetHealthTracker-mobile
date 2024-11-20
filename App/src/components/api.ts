import { Mascota, nuevaCita, nuevaMascota, VacunaRel } from './models';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
  };
};


const URL = import.meta.env.VITE_API_URL;

console.log(URL);

export const getMascotasByUser = async (userId: number) => {
  const response = await fetch(`${URL}mascotas/dueno/${userId}`, {
      headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
      throw new Error("Error al obtener las mascotas del usuario");
  }
  return data.data;
};

export const getMascotaById = async (id: number) => {
  const response = await fetch(`${URL}mascotas/${id}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la mascota por ID");
  }
  return data.data[0];
};

export const updateMascota = async (id: number, mascota: Mascota) => {
  const response = await fetch(`${URL}mascotas/${id}/editar`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(mascota),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al actualizar la mascota");
  }
  return data.data;
};

export const addPet = async (mascota: nuevaMascota) => {
  const response = await fetch(`${URL}mascotas/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(mascota),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al agregar la mascota");
  }
  return data.data;
};

export const getCitasByMascota = async (mascotaId: number) => {
  const response = await fetch(`${URL}citas/${mascotaId}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener las citas de la mascota");
  }
  return data.data;
};

export const getCitaByFecha = async (id_cita: number) => {
  const response = await fetch(`${URL}citas/${id_cita}/fecha`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la cita por fecha");
  }
  return data.data;
};

export const cancelarCita = async (id: number) => {
  const response = await fetch(`${URL}citas/${id}/cancelar`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error("Error al cancelar la cita");
  }
  return response.json();
};

export const addCita = async (cita: nuevaCita) => {
  const response = await fetch(`${URL}citas/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(cita),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al agregar la cita");
  }
  return data.data;
};

export const getDiagnosticsByPet = async (mascotaId: number) => {
  const response = await fetch(`${URL}diagnosticos/historial/${mascotaId}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener los diagnósticos de la mascota");
  }
  return data.data;
};

export const getVaccineByPet = async (mascotaId: number): Promise<VacunaRel> => {
  const response = await fetch(`${URL}vacunas/mascotas/${mascotaId}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener las vacunas de la mascota");
  }
  return data;
};

export const getVaccine = async (id: number) => {
  console.log(id);
  const response = await fetch(`${URL}vacunas/${id}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener la vacuna");
  }
  return data.data;
};

export const getVetByPet = async (veterinario_id: number) => {
  const response = await fetch(`${URL}funcionarios/${veterinario_id}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario de la mascota");
  }
  return data.data[0];
};

export const getVet = async () => {
  const response = await fetch(`${URL}funcionarios`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario");
  }
  return data.data;
};

export const getVetById = async (id: number) => { 
  const response = await fetch(`${URL}funcionarios/${id}`, {
    headers: getHeaders(),
});
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener el veterinario por ID");
  }
  return data.data[0];
}