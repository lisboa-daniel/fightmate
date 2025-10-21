import { createTheme } from "@mui/material";
import { Montserrat } from "next/font/google";


  
export const mainFont = Montserrat({ subsets: ['latin'] })

export const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  
   
    palette: {
      mode: "dark",
      primary: {
        main: '#fd3519',
      },
  
      divider: "#414141",
     
      secondary: {
        main: '#f12e97',
      },
      error: {
        main: '#f10d2b',
      },
      background: {
        default: '#212121',
        paper: '#3d3d3d',
      
      },
  
    },
    typography: {
      fontFamily: 'Montserrat',
      h1: {
        fontSize: '1.5rem',
        lineHeight: '2rem',
        fontWeight: 800,
        color: "#ff5419"
  
      },
      h2: {
        fontSize: '1.25rem',
        lineHeight: '2rem',
        fontWeight: 800,
        color: "#ff5419"
  
      },
      h3: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: 800,
        color: "#ff5419"
  
      }
    },
  
    components: {
      MuiInputBase: {
        defaultProps: {
          disableInjectingGlobalStyles: true,
        },
      },
    },
  });