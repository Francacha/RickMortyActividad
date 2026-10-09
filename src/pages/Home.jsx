import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Avatar, Skeleton, Tooltip } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import PortalIcon from '../components/PortalIcon';
import { getItemsByIds } from '../services/api';
import useDocumentTitle from '../hooks/useDocumentTitle';

const { Title, Paragraph } = Typography;

// Personajes conocidos para mostrar en la portada
const DESTACADOS = [1, 2, 3, 4, 5, 242, 244, 265];

const Home = () => {
  useDocumentTitle('');
  const navigate = useNavigate();
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    getItemsByIds(DESTACADOS, controller.signal)
      .then(setDestacados)
      // La franja es decorativa: si falla, simplemente no se muestra
      .catch(() => setDestacados([]))
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
      });
    return () => controller.abort();
  }, []);

  const buscar = (valor) => {
    const texto = valor.trim();
    navigate(texto ? `/catalogo?buscar=${encodeURIComponent(texto)}` : '/catalogo');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-texto">
          <Title className="hero-titulo">
            Todos los personajes del multiverso, en un solo lugar
          </Title>
          <Paragraph className="hero-bajada">
            Explorá los más de 800 personajes de Rick and Morty. Buscalos por nombre, filtralos por
            estado y abrí su ficha para ver especie, origen y en cuántos episodios aparecen.
          </Paragraph>
          <Input.Search
            placeholder="Buscar un personaje, ej: Morty"
            enterButton="Buscar"
            size="large"
            allowClear
            onSearch={buscar}
            aria-label="Buscar personaje por nombre"
            className="hero-busqueda"
          />
          <Link to="/catalogo" className="hero-explorar">
            Ver el catálogo completo <ArrowRightOutlined />
          </Link>
        </div>
        <div className="hero-portal">
          <PortalIcon size={360} animado className="hero-portal-svg" />
        </div>
      </section>

      {(cargando || destacados.length > 0) && (
        <section className="destacados" aria-label="Personajes destacados">
          <Title level={2} className="destacados-titulo">Caras conocidas</Title>
          <ul className="destacados-lista">
            {cargando
              ? DESTACADOS.map((id) => (
                  <li key={id}>
                    <Skeleton.Avatar active size={72} />
                  </li>
                ))
              : destacados.map((p) => (
                  <li key={p.id}>
                    <Tooltip title={p.name}>
                      <Link to={`/catalogo/${p.id}`} className="destacado-link" aria-label={p.name}>
                        <Avatar src={p.image} alt="" size={72} />
                      </Link>
                    </Tooltip>
                  </li>
                ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Home;
