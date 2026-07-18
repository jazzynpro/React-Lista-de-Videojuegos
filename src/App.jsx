import { useState } from 'react';
import './App.css';
import data from './data/videojuegos';
import TablaVideojuegos from "./components/TablaVideojuegos";




function App() {
  const [videojuegos, setVideojuegos]= useState(data);  //constante donde se almacenan los videojuegos
  
  function eliminarVideojuego(id){ //funcion para eliminar
    const filtrados = videojuegos.filter((juego)=>juego.id !== id); //filter crea un nuevo arreglo sin el id que recibe ya que elimina
    setVideojuegos(filtrados); //Actualiza el estado
  }
  
  function editarVideojuego(videojuego){ //funcion para editar
    console.log(videojuego);
    alert("Editar videojuego: " + videojuego.Nombre);
  }

  return (
    <div className='App'>
      <TablaVideojuegos 
      videojuegos={videojuegos}
      onEliminar={eliminarVideojuego}
      onEditar={editarVideojuego}
      />
    </div>
  )
}

export default App;
