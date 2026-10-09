# Catálogo Interdimensional: personajes de Rick and Morty


## Alumno
[Franco Arce]

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

### Endpoints consumidos
Todos los pedidos están en [`src/services/api.js`](src/services/api.js).

| Endpoint | Uso en la app |
|---|---|
| `GET https://rickandmortyapi.com/api/character/?page={n}&name={texto}&status={estado}` | Catálogo: lista paginada (20 por página), con búsqueda por nombre y filtro por estado (`alive`, `dead`, `unknown`). Responde 404 cuando no hay coincidencias. |
| `GET https://rickandmortyapi.com/api/character/{id}` | Detalle de un personaje. |
| `GET https://rickandmortyapi.com/api/character/{id1},{id2},...` | Inicio: varios personajes destacados en un solo pedido. |
