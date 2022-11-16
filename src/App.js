import { lazy } from 'react';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Router, Routes } from 'react-router-dom';
import Header from './Header';
import Loadable from "./components/Loadable/Loadable"

const Home = Loadable(lazy(() => import('./components/Home')));
const Contact = Loadable(lazy(() => import('./components/Contact')));
const Error = Loadable(lazy(() => import('./components/Error')));

const theme = createTheme({
  palette: {
    primary: {
      main: `#00008b`,
    },
    secondary: {
      main: '#1e4db7',
      light: '#ddebff',
      dark: '#173f98',
    },
    text: {
      secondary: '#777e89',
      danger: '#fc4b6c',
    },
    grey: {
      A100: '#ecf0f2',
      A200: '#99abb4',
      A400: '#767e89',
      A700: '#e6f4ff',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/add-contact" element={<Contact />} />
        <Route path="/contact/:id/:mode" element={<Contact />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
