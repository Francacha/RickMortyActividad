import { Component } from 'react';
import { Result, Button } from 'antd';

// Si algo falla al renderizar, mostramos un mensaje en vez de dejar la pantalla en blanco
class ErrorBoundary extends Component {
  state = { hayError: false };

  static getDerivedStateFromError() {
    return { hayError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error de renderizado:', error, info);
  }

  render() {
    if (this.state.hayError) {
      return (
        <Result
          status="error"
          title="Algo se rompió en esta dimensión"
          subTitle="Ocurrió un error inesperado al mostrar esta página."
          extra={
            <Button type="primary" onClick={() => window.location.assign('/')}>
              Volver al inicio
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
