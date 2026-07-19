
import { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onFin }) {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      onFin();
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [mensaje, onFin]);

  return (
    <div className="toast-exito">
      <span className="toast-icono">✅</span>
      <span>{mensaje}</span>
    </div>
  );
}

export default AlertaNotificacion;