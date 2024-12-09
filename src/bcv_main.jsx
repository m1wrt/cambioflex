import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './bcv.jsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { dark } from '@mui/material/styles/createPalette.js'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
