// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#ffffff',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            backgroundColor: 'white',
            color: 'black',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});

export default theme;
