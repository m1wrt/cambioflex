import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import Upperbar from './assets/upper_bar.jsx';
import { Box, Card, CardContent, Typography, CircularProgress, Grid, Paper } from '@mui/material';

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
          <Typography variant="h4">Comparar Tasas:</Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}> 
            <Paper style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6" textAlign={'center'}> B.C.V </Typography>
                <Typography variant='h3' textAlign={'center'}>{data.bcv.price} </Typography>
                <Typography textAlign={'center'} >{data.bcv.last_update}</Typography>
              </CardContent>
            </Paper> 
          </Grid> 
        <Grid item xs={6}>
              <Paper style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6" textAlign={'center'}>EnParaleloVZLA</Typography>
                <Typography variant='h3' textAlign={'center'}>{data.enparalelovzla.price} </Typography>
                <Typography textAlign={'center'}>{data.enparalelovzla.last_update}</Typography>
                <Typography></Typography>

              </CardContent>              
              </Paper>
            </Grid>
          </Grid>

          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '770px', marginTop: 2 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h4" textAlign={'center'}>Diferencia entre BCV y Paralelo</Typography>
              <Box sx={{ flex: 1, display: 'flex', marginBottom: 1}}>
                <LineChart
                  xAxis={[{ scaleType: 'point', data: ['Anterior', 'Nueva'] }]}
                  series={[
                    {
                      data: [data.bcv.price_old, data.bcv.price],
                      label: 'Banco Central de Venezuela',
                      color: 'pink'
                    },
                    {
                      data: [data.enparalelovzla.price_old, data.enparalelovzla.price],
                      label: 'EnParaleloVZLA',
                      color: 'red'
                    }
                  ]}
                  width={360}
                  height={250}

                />
                
              </Box>
              <Grid container spacing={2}> 
                <Grid item xs={6}> 
                  <Card style={{backgroundColor: '#292929', height: '100px'}}>
                    <CardContent>
                    <Typography variant='h6' textAlign={'center'}>Anterior</Typography>
                    <Typography>BCV: {data.bcv.price_old}</Typography>
                    <Typography>Paralelo: {data.enparalelovzla.price_old}</Typography>
                    </CardContent> 
                  </Card> 
                </Grid> 
                  
                <Grid item xs={6}> 
                  <Card style={{backgroundColor: '#292929', height: '100px'}}>
                    <CardContent>
                      <Typography variant='h6' textAlign={'center'}>Reciente</Typography>
                      <Typography>BCV: {data.bcv.price} Bs</Typography>
                      <Typography>Paralelo: {data.enparalelovzla.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
                <Card>
                  <CardContent style={{backgroundColor: '#292929', height: '100px', marginTop: 10}}>
                    <Typography variant='h6' textAlign={'center'}>Diferencia (Reciente):</Typography>
                    <Typography variant='h2' textAlign={'center'}>{Math.round((data.enparalelovzla.price - data.bcv.price)* 100) / 100} Bs.</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent style={{backgroundColor: '#292929', height: '100px', marginTop: 10}}>
                    <Typography variant='h6' textAlign={'center'}>Diferencia (Anterior):</Typography>
                    <Typography variant='h2' textAlign={'center'}>{Math.round((data.enparalelovzla.price_old - data.bcv.price_old)* 100) / 100} Bs.</Typography>
                  </CardContent>
                </Card>
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
