import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { FiltersProvider } from './context/FiltersContext';
import { CountriesProvider } from './context/CountriesContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FiltersProvider>
          <CountriesProvider>
            <App />
          </CountriesProvider>
        </FiltersProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
