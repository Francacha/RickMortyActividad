# Catálogo Interdimensional: personajes de Rick and Morty

Catálogo de personajes hecho con React, React Router y Ant Design, que consume [The Rick and Morty API](https://rickandmortyapi.com).

## Alumno
[Tu Nombre y Apellido]

## Cómo correr el proyecto
1. Clonar el repositorio.
2. Abrir la terminal en la raíz del proyecto.
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en el navegador la URL que muestra la terminal (por defecto `http://localhost:5173`).

## API utilizada
[The Rick and Morty API](https://rickandmortyapi.com): API pública y gratuita, sin autenticación.
Documentación: https://rickandmortyapi.com/documentation

### Endpoints consumidos
Todos los pedidos están en [`src/services/api.js`](src/services/api.js).

| Endpoint | Uso en la app |
|---|---|
| `GET https://rickandmortyapi.com/api/character/?page={n}&name={texto}&status={estado}` | Catálogo: lista paginada (20 por página), con búsqueda por nombre y filtro por estado (`alive`, `dead`, `unknown`). Responde 404 cuando no hay coincidencias. |
| `GET https://rickandmortyapi.com/api/character/{id}` | Detalle de un personaje. |
| `GET https://rickandmortyapi.com/api/character/{id1},{id2},...` | Inicio: varios personajes destacados en un solo pedido. |

## Rutas
| Ruta | Qué muestra |
|---|---|
| `/` | Inicio, con buscador y personajes destacados |
| `/catalogo` | Grilla de personajes con búsqueda por nombre, filtro por estado y paginación |
| `/catalogo/:id` | Ficha del personaje: estado, especie, género, origen, última ubicación y cantidad de episodios |
| `*` | Página 404 |

La búsqueda, el filtro y la página quedan en la URL (`/catalogo?buscar=rick&estado=alive&pagina=2`), así que se pueden recargar o compartir.

## Estados contemplados
- **Cargando:** esqueletos con la forma de las tarjetas mientras llega la respuesta.
- **Error de conexión:** mensaje claro con botón **Reintentar**; el buscador sigue disponible.
- **Sin resultados:** mensaje y botón para limpiar la búsqueda (la API responde 404 cuando no hay coincidencias).
- **Personaje inexistente:** `/catalogo/99999`, `/catalogo/abc` o `/catalogo/1,2` muestran "Personaje no encontrado".
- **Ruta inexistente:** cualquier otra URL muestra la página 404.
- **Error inesperado:** un error boundary evita que la app quede en blanco.

## Estructura
```
src/
├── components/   Navbar, PersonajeCard, EstadoTag, ErrorState, ErrorBoundary, PortalIcon
├── hooks/        useDocumentTitle
├── pages/        Home, Catalogo, Detalle, NotFound
├── services/     api.js (pedidos con axios)
├── utils/        traducciones.js (datos de la API al castellano)
├── theme.js      tema de Ant Design (colores, tipografía)
└── index.css     layout y estilos globales
```

## Tecnologías
React 19, Vite, React Router 7, Ant Design 6, axios. Tipografías Unbounded y Figtree (Fontsource).
