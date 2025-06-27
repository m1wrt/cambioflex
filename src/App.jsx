import { useState, useEffect } from 'react';
import axios from 'axios';
import Upperbar from './assets/upper_bar.jsx'
//? importacion de assets nativos
import { AppBar, Toolbar, Typography, Button, Box, Accordion, CircularProgress, ButtonGroup, CardContent, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Importar ExpandMoreIcon
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Height } from '@mui/icons-material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
const time_f_redirect = 200;

function bcv_redirect(){
  setInterval(() => {location.href='bcv'}, time_f_redirect)
}

function enparalelovzla_redirect(){
  setInterval(() => {location.href='ep'}, time_f_redirect)
}

function compare_redirect(){
  setInterval(() => {location.href='compare'}, time_f_redirect)
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pydolarve.org/api/v1/dollar');
        setData(response.data.monitors);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
}, []);

function bcv_old() {
  alert(data.bcv.price_old)
}

  return (
    <>
    <Upperbar/>
    <script type="text/javascript">
	atOptions = {
		'key' : '49fea53e00649d8fb890a13fc5a6b821',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/49fea53e00649d8fb890a13fc5a6b821/invoke.js"></script>
    <Box sx={{
      marginTop: 8,
      marginX: {
        xs: 0.5,
        sm: 4,
        md: 8,
      }
    }}>
      <upperbar/>

      <Box sx={{ marginTop: 8}}> {/* Aumentar margen superior para despegar el acordeón del menú */}
        <Typography variant='h4' sx={{ marginTop: 0 }}>Tasas de cambio:</Typography>

        {data && (
          <>
            <Box sx={{ marginTop: 2 }}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header">
                  <Typography variant='h6'>Banco Central de Venezuela</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box><Typography variant='h2'>{data.bcv.price} Bs.</Typography></Box> 
                  <Typography>Última actualización: {data.bcv.last_update}</Typography>
                  <Typography>{data.bcv.price_old} Bs. (Anterior)</Typography>
                </AccordionDetails>
                <AccordionActions>
                  <Button disabled variant='outlined'>Compartir</Button>
                  <Button variant='contained' startIcon={<CurrencyExchangeIcon/>} href='bcv'>Detalles</Button>
                </AccordionActions>
              </Accordion>
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header">
                  <Typography variant='h6'>EnParaleloVZLA (Tasa no oficial)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='h2'>{data.enparalelovzla.price} Bs.</Typography>
                  <Typography>Última actualización: {data.enparalelovzla.last_update}</Typography>
                </AccordionDetails>
                <AccordionActions>
                  <Button disabled variant='outlined'>Compartir</Button>
                  <Button variant='contained' startIcon={<CurrencyExchangeIcon/>} href='ep'>Detalles</Button>
                </AccordionActions>
              </Accordion>
              <Card sx={{ marginTop: 2 }}>
                <CardContent>
                  <Typography variant='h4'>Utilidades:</Typography>
                  <center>
                    <ButtonGroup variant='contained' sx={{ marginTop: 2 }}>
                    <Button startIcon={<CompareArrowsIcon/>} href='compare'>Comparar</Button>
                    <Button disabled>Copiar tasas</Button>
                    </ButtonGroup>
                  </center>
                </CardContent>
              </Card>


            </Box>
          </>
        )}

        {!data && (
          <Typography sx={{ marginTop: 2 }}><center><CircularProgress/></center></Typography>
        )}
      </Box>
    </Box>
    </>
  );
}

export default App;
