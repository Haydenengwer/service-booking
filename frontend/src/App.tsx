import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import Success from './pages/Success';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        <ChatWidget />
      </Router>
    </ThemeProvider>
  );
}

export default App;
