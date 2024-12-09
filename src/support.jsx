import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box, ButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent } from '@mui/material';
import Upperbar from './assets/upper_bar.jsx'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);
  const [changelog, setChangelog] = useState('');
  const [openUSDT, setOpenUSDT] = useState(false);
  const [openBitcoin, setOpenBitcoin] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//! Arreglar esto
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/m1wrt/cambioflex/refs/heads/main/internal_changelog.md')
      .then(response => response.text())
      .then(text => setChangelog(text));
  }, []);

  const handleOpenUSDT = () => {
    setOpenUSDT(true);
  };

  const handleCloseUSDT = () => {
    setOpenUSDT(false);
  };

  const handleOpenBitcoin = () => {
    setOpenBitcoin(true);
  };

  const handleCloseBitcoin = () => {
    setOpenBitcoin(false);
  };

  return (
    <div style={{ flexGrow: 1, backgroundColor: '#fff' }}>
      <Upperbar />
      <AppBar position="fixed" style={{ marginTop: 56 }}>
        <Tabs value={value} onChange={handleChange} aria-label="Seleccion">
          <Tab label="Terms of use" {...a11yProps(0)} />
          <Tab label="Novedades" {...a11yProps(1)} />
          <Tab label="Apoyar" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{ marginTop: 120 }}>
        <Typography variant="h2" align="center">Cambioflex</Typography>
        <Typography variant="h6" align="justify">
          Aclaratoria: Esta aplicación no está relacionada ni afiliada a ningún gobierno ni partido político. Es un proyecto independiente de desarrollo que utiliza la API de pydolarvenezuela para proporcionar información sobre las tasas de cambio del dólar en diferentes mesas. Si valoras nuestro trabajo y deseas apoyar el desarrollo continuo de esta aplicación, consideramos cualquier donación como un gesto de gran aprecio. ¡Gracias por tu apoyo!
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1} style={{ marginTop: 70 }}>
        <ReactMarkdown>{changelog}</ReactMarkdown>
      </TabPanel>
      <TabPanel value={value} index={2} style={{ marginTop: 100 }}>
        <Typography variant="h4">¿Quieres Apoyar al proyecto?</Typography>
        <center>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
            <Typography textAlign={'justify'}>Estamos trabajando para tener diversos métodos de pago a la hora de realizar las donaciones</Typography>
            </CardContent>
          </Card>
          <Card style={{marginTop: 10}}>
            <CardContent>
            <Typography variant='h4'>Criptomonedas</Typography>
              <ButtonGroup variant="contained" style={{marginTop: 10}}>
                <Button onClick={handleOpenUSDT}>USDT</Button>
                <Button onClick={handleOpenBitcoin}>Bitcoin</Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card style={{marginTop: 10}}>
            <CardContent>
            <Typography variant='h4'>¡Gracias totales!</Typography>
            <Typography textAlign={'justify'}>Cambioflex se financia bajo donaciones, es decir, no generamos ingresos a partir de anuncios invasivos.</Typography>
            <Typography>Cada pequeño aporte nos ayuda a seguir desarrollando</Typography>
            </CardContent>
          </Card>

        </center>
      </TabPanel>

      {/* Diálogo USDT */}
      <Dialog open={openUSDT} onClose={handleCloseUSDT}>
        <DialogTitle>Donar con USDT</DialogTitle>
        <DialogContent>
          <Typography>Cartera USDT: TT1jeK7B4obaB9Yf2EqyLFPbKTHVVTyw9D</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUSDT} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo Bitcoin */}
      <Dialog open={openBitcoin} onClose={handleCloseBitcoin}>
        <DialogTitle>Donar con Bitcoin</DialogTitle>
        <DialogContent>
          <Typography>La Billetera Bitcoin no esta disponible en este momento.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBitcoin} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
