import { Layout, Menu } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PortalIcon from './PortalIcon';

const Navbar = () => {
  const location = useLocation();
  // Resalta "Catálogo" incluso si estás viendo el detalle de un personaje
  const selectedKey = location.pathname.startsWith('/catalogo') ? '/catalogo' : '/';

  const items = [
    { key: '/', label: <NavLink to="/">Inicio</NavLink> },
    { key: '/catalogo', label: <NavLink to="/catalogo">Catálogo</NavLink> },
  ];

  return (
    <Layout.Header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="marca" aria-label="Catálogo Interdimensional, ir al inicio">
          <PortalIcon size={30} />
          <span className="marca-texto">
            Catálogo <span className="marca-acento">Interdimensional</span>
          </span>
        </Link>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          className="app-menu"
          disabledOverflow
        />
      </div>
    </Layout.Header>
  );
};

export default Navbar;
