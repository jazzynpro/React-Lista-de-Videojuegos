import { Link } from "react-router-dom";
import "./Navbar.css"; 

function Navbar(){
    return(
        <nav className="navbar-container"> 
            <span className="navbar-brand">Tienda Videojuegos</span> 
            <div className="navbar-links"> 
                <Link to="/" className="navbar-link">Inventario</Link> 
                <Link to="/nuevo" className="navbar-link">Nuevo Juego</Link> 
            </div>
        </nav>
    );
}

export default Navbar;