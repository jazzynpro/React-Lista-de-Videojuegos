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
                        <th>Sinopsis</th>
                        <th>Calificación</th>
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
                            <td>${Number(juego.Precio).toFixed(2)}</td>
                            <td>
                                <span style={{ 
                                    padding: "2px 8px", 
                                    borderRadius: "4px", 
                                    background: juego.Disponible ? "#22c55e" : "#ef4444", 
                                    color: "white" 
                                }}>
                                    {juego.Disponible ? "Sí" : "No"}
                                </span>
                            </td>
                            <td><progress value={juego.Progreso}max="1"></progress>
                            <span style={{ marginLeft: "5px" }}>{Math.round(juego.Progreso * 100)}%</span>
                            </td>
                            <td>{juego.Sinopsis || "Sin reseña"}</td>
                            <td>{juego.Calificacion ? `⭐ ${juego.Calificacion}` : "N/A"}</td>
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