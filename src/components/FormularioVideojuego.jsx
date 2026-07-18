import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Intentamos recuperar el videojuego si venimos desde el botón "Editar"
    const videojuegoRecuperado = location.state?.videojuego || null;

    // Inicialización de estados correspondientes a los atributos de un Videojuego
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState("0");

    // useEffect idéntico al de clase: si hay juego recuperado llena los campos, si no los limpia
    useEffect(() => {
        if (videojuegoRecuperado) {
            setNombre(videojuegoRecuperado.Nombre);
            setGenero(videojuegoRecuperado.Genero);
            setPlataforma(videojuegoRecuperado.Plataforma);
            setLanzamiento(videojuegoRecuperado.Lanzamiento);
            setPrecio(videojuegoRecuperado.Precio);
            setDisponible(videojuegoRecuperado.Disponible);
            setProgreso(videojuegoRecuperado.Progreso.toString());
        } else {
            setNombre("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(true);
            setProgreso("0");
        }
    }, [videojuegoRecuperado]);

    function manejarGuardar(e) {
        e.preventDefault(); // Previene que la página se recargue al enviar el formulario

        const juego = {
            // Si es edición conserva el id, si es nuevo genera uno único con Date.now()
            id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
            Nombre: nombre,
            Genero: genero,
            Plataforma: plataforma,
            Lanzamiento: Number(lanzamiento),
            Precio: Number(precio),
            Disponible: disponible,
            Progreso: Number(progreso)
        };

        onGuardar(juego);
        navigate("/"); // Redirige de vuelta a la tabla principal
    }

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "left" }}>
            <h2>{videojuegoRecuperado ? "Editar Videojuego" : "Registrar Videojuego"}</h2>
            <form onSubmit={manejarGuardar}>
                
                <label style={{ display: "block", marginTop: "10px" }}>Nombre del Videojuego</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />

                {/* Componente SELECT y OPTION solicitado en los requerimientos */}
                <label style={{ display: "block", marginTop: "10px" }}>Género</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                    <option value="">-- Selecciona un género --</option>
                    <option value="Acción">Acción</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Disparos">Disparos</option>
                    <option value="Plataformas">Plataformas</option>
                    <option value="Rol">Rol</option>
                    <option value="Simulación / Rol">Simulación / Rol</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Multijugador">Multijugador</option>
                </select>

                <label style={{ display: "block", marginTop: "10px" }}>Plataforma principal</label>
                <input 
                    type="text" 
                    value={plataforma} 
                    onChange={(e) => setPlataforma(e.target.value)} 
                    placeholder="Ej: Nintendo Switch, PC"
                    required 
                />

                <label style={{ display: "block", marginTop: "10px" }}>Año de Lanzamiento</label>
                <input 
                    type="number" 
                    value={lanzamiento} 
                    onChange={(e) => setLanzamiento(e.target.value)} 
                    required 
                />

                <label style={{ display: "block", marginTop: "10px" }}>Precio ($)</label>
                <input 
                    type="number" 
                    step="0.01" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                    required 
                />

                <label style={{ display: "block", marginTop: "10px" }}>Progreso de Completado (0.0 a 1.0)</label>
                <input 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="1" 
                    value={progreso} 
                    onChange={(e) => setProgreso(e.target.value)} 
                    required 
                />

                {/* Componente CHECKBOX solicitado en los requerimientos */}
                <label style={{ display: "block", marginTop: "15px" }}>
                    <input 
                        type="checkbox" 
                        checked={disponible} 
                        onChange={(e) => setDisponible(e.target.checked)} 
                    />
                    ¿Está Disponible en Tienda?
                </label>

                <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={{ marginRight: "10px" }}>Guardar</button>
                    <button type="button" onClick={() => navigate("/")}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default FormularioVideojuego;