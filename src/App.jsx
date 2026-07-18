import { useState } from 'react';
import './App.css';
import data from './data/videojuegos';
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [videojuegos, setVideojuegos]= useState(data);  //constante donde se almacenan los videojuegos
  
  function agregarVideojuego(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego]);
  }
  
  function eliminarVideojuego(id){ //funcion para eliminar
    const filtrados = videojuegos.filter((juego)=>juego.id !== id); //filter crea un nuevo arreglo sin el id que recibe ya que elimina
    setVideojuegos(filtrados); //Actualiza el estado
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
        <Routes>
          {/* Ruta Principal: Muestra la tabla */}
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
