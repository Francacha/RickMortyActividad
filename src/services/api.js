import axios from 'axios';

const api = axios.create({ baseURL: 'https://rickandmortyapi.com/api' });

// Lista paginada con filtros opcionales. axios codifica los params (ej: "rick & morty").
// Devuelve { info: { count, pages }, results }
export const getItems = async ({ nombre = '', estado = '', pagina = 1 } = {}, signal) => {
  const params = { page: pagina };
  if (nombre) params.name = nombre;
  if (estado) params.status = estado;
  const response = await api.get('/character/', { params, signal });
  return response.data;
};

export const getItemById = async (id, signal) => {
  const response = await api.get(`/character/${id}`, { signal });
  return response.data;
};

// Varios personajes en un solo pedido (ej: /character/1,2,3)
export const getItemsByIds = async (ids, signal) => {
  const response = await api.get(`/character/${ids.join(',')}`, { signal });
  return response.data;
};
