import React from "react";

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const time_f_redirect = 200

function support_redirect(){
  setInterval(() => {location.href='support'}, time_f_redirect)
}

function home_redirect(){
  setInterval(() => {location.href='/cambioflex/'}, time_f_redirect)
}
const Upperbar = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> <a style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }} href="/cambioflex/">CambioFlex</a> </Typography>            <Button color="inherit" variant='outlined' href="support" >Support</Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
}
export default Upperbar;