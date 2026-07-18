import "./TablaVideojuegos.css";
import { useNavigate } from "react-router-dom";

function TablaVideojuegos({ videojuegos, onEliminar}) {
    const navigate = useNavigate();

    function manejarEditar(juego) {
        navigate('/editar', { state: { videojuego: juego } });
    }

    return(
        <div className="tabla-container">
            <table className="tabla-videojuegos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Lanzamiento</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Progreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {videojuegos.map((juego)=>(
                        <tr key={juego.id}>
                            <td>{juego.Nombre}</td>
                            <td>{juego.Genero}</td>
                            <td>{juego.Plataforma}</td>
                            <td>{juego.Lanzamiento}</td>
                            <td>{juego.Precio}</td>
                            <td>{juego.Disponible ? "Sí" : "No"}</td>
                            <td><progress value={juego.Progreso}max="1"></progress>
                            </td>
                            <td> 
                                    <button className="btn-editar" onClick={() => manejarEditar(juego)}>  
                                    Editar 
                                    </button> 
                                    <button className="btn-eliminar" onClick={() => onEliminar(juego.id)}> 
                                    Eliminar 
                                    </button> 
                                </td> 

                        </tr>
                    ))}
                </tbody>
                </table>
                </div>
    );
}

export default TablaVideojuegos;