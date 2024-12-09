import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import Upperbar from './assets/upper_bar.jsx';
import { Box, Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';

function App() {
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

  return (
    <>
      <Upperbar />
      {data ? (
        <Box
          sx={{
            marginTop: 8,
            marginX: {
              xs: 0.5,
              sm: 4,
              md: 8,
            },
          }}
        >
          <Typography variant="h4">Banco Central de Venezuela</Typography>
          
          <Card>
            <CardContent>
              <Typography variant='h2'>{data.bcv.price} Bs.</Typography>
              <Typography>{data.bcv.symbol} {data.bcv.percent}%  - {data.bcv.last_update}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '360px', marginTop: 2 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h4" textAlign={'center'}>Diferencia Pasada:</Typography>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <LineChart
                  xAxis={[{ data: [1, 2] }]}
                  series={[
                    {
                      data: [data.bcv.price_old, data.bcv.price],
                    },
                  ]}
                  
                  width={300}
                  height={200}
                />
              </Box>
              <Grid>
                <Box>
                  <Typography>Precio: {data.bcv.price} ({data.bcv.last_update})</Typography>
                  <Typography>Precio Anterior: {data.bcv.price_old}</Typography>
                  <Typography>Inflacion: {data.bcv.symbol} {data.bcv.percent}%</Typography>
                  <Typography>Cambio: {data.bcv.symbol} {data.bcv.change} Bs.</Typography>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
