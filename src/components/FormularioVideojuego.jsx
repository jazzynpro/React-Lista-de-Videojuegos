import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoRecuperado = location.state?.videojuego || null;

    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState("0");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (videojuegoRecuperado) {
            setNombre(videojuegoRecuperado.Nombre);
            setGenero(videojuegoRecuperado.Genero);
            setPlataforma(videojuegoRecuperado.Plataforma);
            setLanzamiento(videojuegoRecuperado.Lanzamiento);
            setPrecio(videojuegoRecuperado.Precio);
            setDisponible(videojuegoRecuperado.Disponible);
            setProgreso(videojuegoRecuperado.Progreso.toString());
            setFechaLanzamiento(videojuegoRecuperado.FechaLanzamiento || "");
            setSinopsis(videojuegoRecuperado.Sinopsis || "");
            setCalificacion(videojuegoRecuperado.Calificacion || "");
        } else {
            setNombre("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(true);
            setProgreso("0");
            setFechaLanzamiento("");
            setSinopsis("");
            setCalificacion("");
        }
    }, [videojuegoRecuperado]);

    function validarFormulario() {
        const erroresActivos = {};
        const hoy = new Date().toISOString().split('T')[0];

        if (!nombre.trim()) erroresActivos.nombre = 'El nombre no puede estar vacío.';
        if (!genero) erroresActivos.genero = 'Selecciona un género.';
        if (!plataforma.trim()) erroresActivos.plataforma = 'La plataforma es obligatoria.';
        
        if (!fechaLanzamiento) {
            erroresActivos.fechaLanzamiento = 'La fecha de lanzamiento es obligatoria.';
        } else if (fechaLanzamiento > hoy) {
            erroresActivos.fechaLanzamiento = 'La fecha no puede ser futura.';
        }

        if (!sinopsis.trim()) {
            erroresActivos.sinopsis = 'La sinopsis es obligatoria.';
        } else if (sinopsis.trim().length < 10) {
            erroresActivos.sinopsis = 'Debe tener al menos 10 caracteres.';
        } else if (sinopsis.trim().length > 250) {
            erroresActivos.sinopsis = 'No puede superar los 250 caracteres.';
        }

        const calificacionNum = Number(calificacion);
        if (!calificacion) {
            erroresActivos.calificacion = 'La calificación es obligatoria.';
        } else if (calificacionNum < 1 || calificacionNum > 100) {
            erroresActivos.calificacion = 'Debe estar entre 1 y 100.';
        }

        if (!precio || Number(precio) <= 0) {
            erroresActivos.precio = 'Ingresa un precio válido.';
        }

        return erroresActivos;
    }

    function manejarGuardar(e) {
        e.preventDefault(); 

        const erroresActivos = validarFormulario();
        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return; // Detiene el guardado si hay errores
        }
        setErrores({});

        const juego = {
            id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
            Nombre: nombre,
            Genero: genero,
            Plataforma: plataforma,
            Lanzamiento: Number(lanzamiento),
            Precio: Number(precio),
            Disponible: disponible,
            Progreso: Number(progreso),
            FechaLanzamiento: fechaLanzamiento, 
            Sinopsis: sinopsis.trim(),          
            Calificacion: Number(calificacion)  
        };

        onGuardar(juego);
        navigate("/"); 
    }

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "left" }}>
            <h2>{videojuegoRecuperado ? "Editar Videojuego" : "Registrar Videojuego"}</h2>
            <form onSubmit={manejarGuardar}noValidate>
                
                <label style={{ display: "block", marginTop: "10px" }}>Nombre del Videojuego</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                {errores.nombre && <span style={{color: "red", fontSize: "12px"}}>{errores.nombre}</span>}

                <label style={{ display: "block", marginTop: "10px" }}>Género</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)}>
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

                {errores.genero && <span style={{color: "red", fontSize: "12px"}}>{errores.genero}</span>}

                <label style={{ display: "block", marginTop: "10px" }}>Plataforma principal</label>
                <input type="text" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} placeholder="Ej: Nintendo Switch, PC" />
                {errores.plataforma && <span style={{color: "red", fontSize: "12px"}}>{errores.plataforma}</span>}

                {/* MEJORA: Fecha de Lanzamiento */}
                <label style={{ display: "block", marginTop: "10px" }}>Fecha de Lanzamiento</label>
                <input type="date" value={fechaLanzamiento} onChange={(e) => setFechaLanzamiento(e.target.value)} />
                {errores.fechaLanzamiento && <span style={{color: "red", fontSize: "12px"}}>{errores.fechaLanzamiento}</span>}

                {/* MEJORA: Sinopsis */}
                <label style={{ display: "block", marginTop: "10px" }}>Sinopsis</label>
                <textarea value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} maxLength={250} rows={3} placeholder="Breve reseña..." />
                <span style={{fontSize: "11px", display: "block"}}>{sinopsis.length}/250</span>
                {errores.sinopsis && <span style={{color: "red", fontSize: "12px"}}>{errores.sinopsis}</span>}

                {/* MEJORA: Calificación */}
                <label style={{ display: "block", marginTop: "10px" }}>Calificación de la crítica (1-100)</label>
                <input type="number" value={calificacion} min="1" max="100" onChange={(e) => setCalificacion(e.target.value)} />
                {errores.calificacion && <span style={{color: "red", fontSize: "12px"}}>{errores.calificacion}</span>}

                <label style={{ display: "block", marginTop: "10px" }}>Precio ($)</label>
                <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                {errores.precio && <span style={{color: "red", fontSize: "12px"}}>{errores.precio}</span>}

                <label style={{ display: "block", marginTop: "10px" }}>Progreso de Completado (0.0 a 1.0)</label>
                <input type="number" step="0.01" min="0" max="1" value={progreso} onChange={(e) => setProgreso(e.target.value)} />

                <label style={{ display: "block", marginTop: "15px" }}>
                    <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
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