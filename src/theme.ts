import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD600', // yellow
      contrastText: '#4E342E', // dark brown text
    },
    secondary: {
      main: '#795548', // brown
      contrastText: '#FFFDE7', // light yellow text
    },
    background: {
      default: '#FFFDE7', // very light yellow
      paper: '#FFF8E1',
    },
    text: {
      primary: '#4E342E', // dark brown
      secondary: '#795548',
    },
  },
  typography: {
    fontFamily: 'Pretendard, Noto Sans KR, Arial, sans-serif',
  },
});

export default theme; 