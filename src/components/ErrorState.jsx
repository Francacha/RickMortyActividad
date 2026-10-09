import { Alert, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { mensajeDeError } from '../utils/traducciones';

// Un único estado de error para toda la app: qué pasó + cómo seguir
const ErrorState = ({ error, onRetry }) => {
  const { titulo, detalle } = mensajeDeError(error);

  return (
    <Alert
      type="error"
      showIcon
      title={titulo}
      description={
        <>
          <p className="error-detalle">{detalle}</p>
          <Button danger icon={<ReloadOutlined />} onClick={onRetry}>
            Reintentar
          </Button>
        </>
      }
      className="error-estado"
    />
  );
};

export default ErrorState;
