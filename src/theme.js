import { theme } from 'antd';

// Paleta: espacio profundo + verde portal. Todo el estilo pasa por tokens de Ant Design.
export const colores = {
  portal: '#97ce4c',
  portalOscuro: '#0b1a0d',
  fondo: '#0b1114',
  superficie: '#121b20',
  borde: '#22313a',
  texto: '#e6efe4',
  muerto: '#ff7a6b',
};

export const temaApp = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colores.portal,
    colorSuccess: colores.portal,
    colorError: colores.muerto,
    colorInfo: '#5cc8d8',
    colorLink: colores.portal,
    colorWarning: '#f0c24b',
    colorBgBase: colores.fondo,
    colorTextBase: colores.texto,
    colorBorder: colores.borde,
    colorBorderSecondary: '#1a262d',
    colorBgContainer: colores.superficie,
    colorBgElevated: '#17232a',
    borderRadius: 10,
    fontFamily: "'Figtree Variable', system-ui, sans-serif",
    fontSize: 15,
  },
  components: {
    Layout: {
      headerBg: colores.fondo,
      headerHeight: 64,
      headerPadding: '0 24px',
      bodyBg: colores.fondo,
      footerBg: colores.fondo,
    },
    Menu: {
      itemBg: 'transparent',
      horizontalItemSelectedColor: colores.portal,
    },
    Button: {
      primaryColor: colores.portalOscuro,
      fontWeight: 600,
    },
    Card: {
      bodyPadding: 16,
    },
  },
};
