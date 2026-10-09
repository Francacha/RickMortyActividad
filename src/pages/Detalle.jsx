import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Result, Button, Descriptions, Row, Col, Skeleton, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getItemById } from '../services/api';
import EstadoTag from '../components/EstadoTag';
import ErrorState from '../components/ErrorState';
import PortalIcon from '../components/PortalIcon';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { traducirEspecie, traducirGenero, traducirLugar } from '../utils/traducciones';

const { Title } = Typography;

// Solo IDs numéricos: "abc" o "1,2" no son personajes válidos
const esIdValido = (id) => /^\d+$/.test(id) && Number(id) > 0;

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const idValido = esIdValido(id);
  const [intento, setIntento] = useState(0);
  const clave = `${id}|${intento}`;
  const [resultado, setResultado] = useState({ clave: null, item: null, error: null, noExiste: false });
  const cargando = idValido && resultado.clave !== clave;
  const noExiste = !idValido || (!cargando && resultado.noExiste);
  const { item, error } = cargando ? { item: null, error: null } : resultado;

  useEffect(() => {
    if (!esIdValido(id)) return;
    const controller = new AbortController();

    getItemById(id, controller.signal)
      .then((data) => {
        // Si la API no devuelve un personaje con forma válida, lo tratamos como inexistente
        const valido = data && !Array.isArray(data) && data.name;
        setResultado({ clave, item: valido ? data : null, error: null, noExiste: !valido });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        const status = err.response?.status;
        // 404 = no existe; 400/500 suele ser un ID que la API no entiende
        if (status === 404 || status === 400) {
          setResultado({ clave, item: null, error: null, noExiste: true });
        } else {
          setResultado({ clave, item: null, error: err, noExiste: false });
        }
      });

    return () => controller.abort();
  }, [clave, id]);

  useDocumentTitle(item?.name ?? (noExiste ? 'Personaje no encontrado' : 'Personaje'));

  // Volvemos al catálogo con la misma búsqueda y página desde la que se llegó
  const volver = () => {
    const desde = location.state?.desde;
    navigate(desde ? `/catalogo?${desde}` : '/catalogo');
  };

  const botonVolver = (
    <Button type="text" icon={<ArrowLeftOutlined />} onClick={volver} className="volver">
      Volver al catálogo
    </Button>
  );

  if (cargando) {
    return (
      <div className="detalle" aria-busy="true">
        {botonVolver}
        <Row gutter={[40, 24]} align="top">
          <Col xs={24} md={10}>
            <Skeleton.Node active className="detalle-imagen skeleton-portada" />
          </Col>
          <Col xs={24} md={14}>
            <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 6 }} />
          </Col>
        </Row>
      </div>
    );
  }

  if (noExiste) {
    return (
      <Result
        icon={<PortalIcon size={120} />}
        title="Personaje no encontrado"
        subTitle={`No hay ningún personaje con el ID “${id}” en ninguna dimensión conocida.`}
        extra={
          <Button type="primary" onClick={() => navigate('/catalogo')}>
            Ir al catálogo
          </Button>
        }
      />
    );
  }

  if (error) {
    return (
      <div className="detalle">
        {botonVolver}
        <ErrorState error={error} onRetry={() => setIntento((n) => n + 1)} />
      </div>
    );
  }

  const episodios = item.episode.length;
  const datos = [
    { key: 'especie', label: 'Especie', children: traducirEspecie(item.species) },
    item.type && { key: 'tipo', label: 'Tipo', children: item.type },
    { key: 'genero', label: 'Género', children: traducirGenero(item.gender) },
    { key: 'origen', label: 'Origen', children: traducirLugar(item.origin.name) },
    { key: 'ubicacion', label: 'Última ubicación', children: traducirLugar(item.location.name) },
    {
      key: 'episodios',
      label: 'Aparece en',
      children: episodios === 1 ? '1 episodio' : `${episodios} episodios`,
    },
  ].filter(Boolean);

  return (
    <article className="detalle">
      {botonVolver}
      <Row gutter={[40, 24]} align="top">
        <Col xs={24} md={10}>
          <img src={item.image} alt={`Retrato de ${item.name}`} className="detalle-imagen" width="300" height="300" />
        </Col>
        <Col xs={24} md={14}>
          <EstadoTag estado={item.status} />
          <Title className="detalle-nombre">{item.name}</Title>
          <Descriptions column={1} items={datos} bordered size="middle" className="detalle-datos" />
        </Col>
      </Row>
    </article>
  );
};

export default Detalle;
