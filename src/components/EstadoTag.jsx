import { Tag } from 'antd';
import { traducirEstado } from '../utils/traducciones';

const COLORES = {
  Alive: 'success',
  Dead: 'error',
  unknown: 'default',
};

// Estado del personaje: el texto siempre acompaña al color
const EstadoTag = ({ estado, variant = 'filled', className }) => (
  <Tag color={COLORES[estado] ?? 'default'} variant={variant} className={`estado-tag ${className ?? ''}`}>
    <span className="estado-punto" aria-hidden="true" />
    {traducirEstado(estado)}
  </Tag>
);

export default EstadoTag;
