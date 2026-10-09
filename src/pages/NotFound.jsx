import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PortalIcon from '../components/PortalIcon';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('Página no encontrada');
  const navigate = useNavigate();

  return (
    <Result
      icon={<PortalIcon size={120} />}
      title="Página no encontrada"
      subTitle="Esta dirección no existe en esta dimensión. Puede que el portal te haya dejado en el lugar equivocado."
      extra={[
        <Button type="primary" key="inicio" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>,
        <Button key="catalogo" onClick={() => navigate('/catalogo')}>
          Ir al catálogo
        </Button>,
      ]}
    />
  );
};

export default NotFound;
