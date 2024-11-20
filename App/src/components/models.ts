export interface Mascota {
    id: number;
    nombre_mascota: string;
    especie: string;
    raza: string;
    fecha_nacimiento: string;
    id_dueño: number;
    image_url: string;
  }

  export interface Cita {
    id: number,
    id_mascota: number;
    fecha_cita: string;
    id_veterinario: number; 
    hora_cita: string;
  }

  export interface Vacunas {
    id: number;
    fecha_vacuna: string;
    tipo_vacuna: string;
    created_at: string; 
  }

export interface VacunaRel {
  id: number;
  create_at: string;
  vacuna: number;
  mascota: number;
  data: any;
}
