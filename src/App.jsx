import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import esES from 'antd/locale/es_ES';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Detalle from './pages/Detalle';
import NotFound from './pages/NotFound';
import { temaApp } from './theme';

const { Content, Footer } = Layout;

const Contenido = () => {
  const location = useLocation();
  const mainRef = useRef(null);
  const primeraCarga = useRef(true);

  // Al cambiar de página, llevamos el foco al contenido (lectores de pantalla y teclado)
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout className="app">
      <a href="#contenido" className="saltar">Saltar al contenido</a>
      <Navbar />
      <Content>
        <main id="contenido" ref={mainRef} tabIndex={-1} className="app-contenido">
          {/* La key reinicia el boundary al navegar a otra página */}
          <ErrorBoundary key={location.pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/catalogo/:id" element={<Detalle />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </Content>
      <Footer className="app-footer">
        Datos de{' '}
        <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">
          The Rick and Morty API
        </a>
        . Proyecto para Programación II.
      </Footer>
    </Layout>
  );
};

function App() {
  return (
    <ConfigProvider theme={temaApp} locale={esES}>
      <BrowserRouter>
        <Contenido />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
