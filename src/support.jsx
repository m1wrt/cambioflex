import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Upperbar from './assets/upper_bar.jsx';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <Upperbar/>
      <AppBar position="fixed"  style={{marginTop: 56}}>
        <Tabs value={value} onChange={handleChange} aria-label="Seleccion">
          <Tab label="Terms of use" {...a11yProps(0)} />
          <Tab label="Novedades" {...a11yProps(1)} />
          <Tab label="Apoyar" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{marginTop: 120, marginX:{xs: 0.5, sm: 4, md: 8,},}}>
      <Typography variant='h2' style={{ textAlign: 'center' }}>Cambioflex</Typography>
      <Typography variant='h6' style={{ textAlign: 'justify' }}>Aclaratoria: Esta aplicación no está relacionada ni afiliada a ningún gobierno ni partido político. Es un proyecto independiente de desarrollo que utiliza la API de pydolarvenezuela para proporcionar información sobre las tasas de cambio del dólar en diferentes mesas. Si valoras nuestro trabajo y deseas apoyar el desarrollo continuo de esta aplicación, consideramos cualquier donación como un gesto de gran aprecio. ¡Gracias por tu apoyo!</Typography>

      </TabPanel>
      <TabPanel value={value} index={1} style={{marginTop: 120, marginX:{xs: 0.5, sm: 4, md: 8,},}}>
        <Typography variant='h3'>Creacion del proyecto</Typography>
        <Typography style={{marginTop: 20}}>Añadidas las tasas BCV, EnparaleloVZLA</Typography>
        <Typography style={{marginTop: 20}}>Soporte a la api de pydolarvenezuela</Typography>
        <Typography style={{marginTop: 20}}>Integracion a estadisticas con el uso de X-Charts (Material UI)</Typography>
        <Typography style={{marginTop: 20}}>Creacion de menu basado en Material (Material UI)</Typography>


      </TabPanel>
      <TabPanel value={value} index={2} style={{marginTop: 120, marginX:{xs: 0.5, sm: 4, md: 8,},}}>
        Muy Pronto
      </TabPanel>
    </div>
  );
}
