import { useEffect } from 'react';

const NOMBRE_APP = 'Catálogo Interdimensional';

// Actualiza el título de la pestaña según la página
const useDocumentTitle = (titulo) => {
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${NOMBRE_APP}` : NOMBRE_APP;
  }, [titulo]);
};

export default useDocumentTitle;
