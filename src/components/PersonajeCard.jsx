import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import EstadoTag from './EstadoTag';
import { traducirEspecie } from '../utils/traducciones';

const { Text } = Typography;

// Toda la tarjeta es un link al detalle
const PersonajeCard = ({ personaje, desde }) => (
  <Link to={`/catalogo/${personaje.id}`} state={{ desde }} className="personaje-link">
    <Card
      hoverable
      className="personaje-card"
      cover={
        <div className="personaje-portada">
          <img src={personaje.image} alt="" loading="lazy" width="300" height="300" />
          <EstadoTag estado={personaje.status} variant="outlined" className="personaje-estado" />
        </div>
      }
    >
      <Text strong ellipsis={{ tooltip: personaje.name }} className="personaje-nombre">
        {personaje.name}
      </Text>
      <Text type="secondary" className="personaje-especie">
        {traducirEspecie(personaje.species)}
      </Text>
    </Card>
  </Link>
);

export default PersonajeCard;
