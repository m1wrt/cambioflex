import React from "react";

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const time_f_redirect = 200

function support_redirect(){
  setInterval(() => {location.href='support'}, time_f_redirect)
}

function home_redirect(){
  setInterval(() => {location.href='/'}, time_f_redirect)
}
const Upperbar = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={home_redirect}>Cambioflex</Typography>
            <Button color="inherit" variant='outlined' onClick={support_redirect} disabled>Support</Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
}
export default Upperbar;