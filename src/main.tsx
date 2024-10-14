import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaNotas from './pages/ListaNotas';
import NaoEncontrada from './pages/NaoEncontrada';
import BasePage from './pages/BasePage';
import EditarNota from './pages/EditarNota';
import { ListaNotasProvider } from './context/ListaNotasProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<BasePage />}>

              <Route index element={
                 <ListaNotasProvider>
                    <ListaNotas />
                  </ListaNotasProvider>
                }
              ></Route>

              <Route path="/editar-nota/:id/:isnew" element={
                 <ListaNotasProvider>
                    <EditarNota />
                 </ListaNotasProvider>
              }
              ></Route>
              <Route path="*" element={<NaoEncontrada />}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)