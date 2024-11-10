export interface Mascota {
    id: number;
    nombre_mascota: string;
    especie: string;
    raza: string;
    fecha_nacimiento: string;
    id_dueño: number;
  }

  export interface Cita {
    id_mascota: number;
    fecha_cita: string;
    id_veterinario: number; 
    hora_cita: string;
  }