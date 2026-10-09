import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Input, Row, Col, Card, Skeleton, Empty, Button, Segmented, Pagination, Typography } from 'antd';
import { getItems } from '../services/api';
import PersonajeCard from '../components/PersonajeCard';
import ErrorState from '../components/ErrorState';
import PortalIcon from '../components/PortalIcon';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FILTROS_ESTADO } from '../utils/traducciones';

const { Title, Text } = Typography;
const POR_PAGINA = 20; // la API siempre devuelve 20 por página
const COLUMNAS = { xs: 12, md: 8, lg: 6 };

const Catalogo = () => {
  useDocumentTitle('Catálogo');
  const [searchParams, setSearchParams] = useSearchParams();

  // La URL es la fuente de verdad: ?buscar=rick&estado=dead&pagina=2
  const query = searchParams.get('buscar') || '';
  const estado = searchParams.get('estado') || '';
  const pagina = Math.max(1, Number.parseInt(searchParams.get('pagina'), 10) || 1);

  // Input controlado: si la URL cambia (atrás/adelante), el texto se sincroniza
  const [texto, setTexto] = useState(query);
  const [queryPrevia, setQueryPrevia] = useState(query);
  if (query !== queryPrevia) {
    setQueryPrevia(query);
    setTexto(query);
  }

  // `intento` permite reintentar el mismo pedido después de un error
  const [intento, setIntento] = useState(0);
  const clave = `${query}|${estado}|${pagina}|${intento}`;
  const [resultado, setResultado] = useState({ clave: null, datos: null, error: null });
  const cargando = resultado.clave !== clave;

  useEffect(() => {
    // Cancelamos el pedido anterior si el usuario busca otra cosa antes de que termine
    const controller = new AbortController();

    getItems({ nombre: query, estado, pagina }, controller.signal)
      .then((datos) => setResultado({ clave, datos, error: null }))
      .catch((err) => {
        if (axios.isCancel(err)) return;
        // La API devuelve 404 cuando la búsqueda no tiene coincidencias
        if (err.response?.status === 404) {
          setResultado({ clave, datos: { info: { count: 0 }, results: [] }, error: null });
        } else {
          setResultado({ clave, datos: null, error: err });
        }
      });

    return () => controller.abort();
  }, [clave, query, estado, pagina]);

  const actualizarUrl = ({ buscar = query, filtro = estado, nuevaPagina = 1 }) => {
    const params = {};
    if (buscar) params.buscar = buscar;
    if (filtro) params.estado = filtro;
    if (nuevaPagina > 1) params.pagina = String(nuevaPagina);
    setSearchParams(params);
  };

  const handleSearch = (valor) => actualizarUrl({ buscar: valor.trim() });

  const cambiarPagina = (nuevaPagina) => {
    actualizarUrl({ nuevaPagina });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hayFiltros = Boolean(query || estado);
  const personajes = resultado.datos?.results ?? [];
  const total = resultado.datos?.info?.count ?? 0;

  let estadoTexto = '';
  if (cargando) estadoTexto = 'Buscando personajes…';
  else if (!resultado.error) {
    if (total === 0) estadoTexto = 'Sin resultados';
    else estadoTexto = total === 1 ? '1 personaje encontrado' : `${total} personajes encontrados`;
  }

  const renderContenido = () => {
    if (cargando) {
      return (
        <Row gutter={[16, 16]} aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <Col {...COLUMNAS} key={i}>
              <Card cover={<Skeleton.Node active className="skeleton-portada" />}>
                <Skeleton active title={{ width: '70%' }} paragraph={{ rows: 1, width: '40%' }} />
              </Card>
            </Col>
          ))}
        </Row>
      );
    }

    if (resultado.error) {
      return <ErrorState error={resultado.error} onRetry={() => setIntento((n) => n + 1)} />;
    }

    if (personajes.length === 0) {
      return (
        <Empty
          className="vacio"
          image={<PortalIcon size={96} />}
          description={
            hayFiltros
              ? query
                ? `Ningún personaje se llama “${query}” en esta dimensión.`
                : 'Ningún personaje coincide con ese filtro.'
              : 'No hay personajes en esta página.'
          }
        >
          <Button type="primary" onClick={() => setSearchParams({})}>
            {hayFiltros ? 'Limpiar búsqueda y filtros' : 'Ir a la primera página'}
          </Button>
        </Empty>
      );
    }

    return (
      <>
        <Row gutter={[16, 16]}>
          {personajes.map((personaje) => (
            <Col {...COLUMNAS} key={personaje.id}>
              <PersonajeCard personaje={personaje} desde={searchParams.toString()} />
            </Col>
          ))}
        </Row>
        {total > POR_PAGINA && (
          <Pagination
            className="paginacion"
            current={pagina}
            pageSize={POR_PAGINA}
            total={total}
            showSizeChanger={false}
            onChange={cambiarPagina}
          />
        )}
      </>
    );
  };

  return (
    <div className="catalogo">
      <Title className="pagina-titulo">Catálogo</Title>

      <div className="catalogo-controles">
        <Input.Search
          placeholder="Buscar por nombre, ej: Rick"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onSearch={handleSearch}
          enterButton="Buscar"
          allowClear
          size="large"
          aria-label="Buscar personaje por nombre"
          className="catalogo-busqueda"
        />
        <Segmented
          options={FILTROS_ESTADO}
          value={estado}
          onChange={(valor) => actualizarUrl({ filtro: valor })}
          size="large"
          aria-label="Filtrar por estado"
        />
      </div>

      <Text type="secondary" role="status" aria-live="polite" className="catalogo-estado">
        {estadoTexto}
      </Text>

      {renderContenido()}
    </div>
  );
};

export default Catalogo;
