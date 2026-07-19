import { useState, useEffect } from 'react';
import './App.css';
import data from './data/videojuegos';
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [videojuegos, setVideojuegos]= useState(() => {
    const datosGuardados = localStorage.getItem('lista_videojuegos');
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });  //constante donde se almacenan los videojuegos
  
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    localStorage.setItem('lista_videojuegos', JSON.stringify(videojuegos));
  }, [videojuegos]);

  function agregarVideojuego(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego]);
    setMensajeExito('¡Videojuego agregado correctamente! ✅');
  }
  
  function eliminarVideojuego(id){ //funcion para eliminar
    const filtrados = videojuegos.filter((juego)=>juego.id !== id); //filter crea un nuevo arreglo sin el id que recibe ya que elimina
    setVideojuegos(filtrados);
    setMensajeExito('Videojuego eliminado con éxito 🗑️');
  }
  
  function editarVideojuego(juegoEditado) {
    const actualizados = videojuegos.map((juego) => {
      if (juego.id === juegoEditado.id) {
        return juegoEditado; // reemplaza con los nuevos datos
      } else {
        return juego; // mantiene el juego sin cambios
      }
    });
    setVideojuegos(actualizados);
    setMensajeExito('¡Videojuego actualizado correctamente! 🔄');
  }

  function manejarGuardar(juego) {
    const existe = videojuegos.find((j) => j.id === juego.id);
    if (existe) {
      editarVideojuego(juego);
    } else {
      agregarVideojuego(juego);
    }
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        {mensajeExito && (
          <AlertaNotificacion mensaje={mensajeExito} onFin={() => setMensajeExito('')} />
        )}
        <Routes>
          <Route 
            path='/' 
            element={
              <TablaVideojuegos 
                videojuegos={videojuegos} 
                onEliminar={eliminarVideojuego} 
              />
            } 
          />
          <Route 
            path="/nuevo" 
            element={<FormularioVideojuego onGuardar={manejarGuardar} />} 
          />
          <Route 
            path="/editar" 
            element={<FormularioVideojuego onGuardar={manejarGuardar} />} 
          />
          <Route 
            path="*" 
            element={<PaginaNoEncontrada />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
