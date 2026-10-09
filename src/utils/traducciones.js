// La API devuelve los datos en inglés; los traducimos para mostrar todo en castellano.

const ESTADOS = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
};

const GENEROS = {
  Female: 'Femenino',
  Male: 'Masculino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
};

const ESPECIES = {
  Human: 'Humano',
  Alien: 'Alienígena',
  Humanoid: 'Humanoide',
  'Mythological Creature': 'Criatura mitológica',
  Animal: 'Animal',
  Robot: 'Robot',
  Cronenberg: 'Cronenberg',
  Disease: 'Enfermedad',
  Poopybutthole: 'Poopybutthole',
  unknown: 'Desconocida',
};

export const traducirEstado = (estado) => ESTADOS[estado] ?? estado;
export const traducirGenero = (genero) => GENEROS[genero] ?? genero;
export const traducirEspecie = (especie) => ESPECIES[especie] ?? especie;
export const traducirLugar = (lugar) => (lugar === 'unknown' ? 'Desconocido' : lugar);

// Filtros de estado que acepta la API (?status=)
export const FILTROS_ESTADO = [
  { label: 'Todos', value: '' },
  { label: 'Vivos', value: 'alive' },
  { label: 'Muertos', value: 'dead' },
  { label: 'Desconocido', value: 'unknown' },
];

// Convierte un error de axios en un mensaje entendible para el usuario
export const mensajeDeError = (err) => {
  if (!err.response) {
    return {
      titulo: 'No pudimos conectar con la API',
      detalle: 'Revisá tu conexión a internet y probá de nuevo.',
    };
  }
  return {
    titulo: 'La API de Rick and Morty no respondió bien',
    detalle: `Devolvió un error ${err.response.status}. Probá de nuevo en unos segundos.`,
  };
};
