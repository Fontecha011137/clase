import React, { useState } from 'react';
import './App.css'; // Usa este si estás colocando estilos en App.css

const palabras = ['react', 'javascript', 'ahorcado', 'computadora', 'programa'];

const Ahorcado = () => {
  const [palabra, setPalabra] = useState(palabras[Math.floor(Math.random() * palabras.length)]);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
  const [errores, setErrores] = useState(0);
  const [entrada, setEntrada] = useState('');
  const maxErrores = 6;

  const manejarCambio = (e) => {
    setEntrada(e.target.value.toLowerCase());
  };

  const manejarIntento = (e) => {
    e.preventDefault();
    if (entrada.length !== 1 || !/[a-z]/.test(entrada)) {
      alert('Ingresa solo una letra válida (a-z)');
      setEntrada('');
      return;
    }

    if (letrasAdivinadas.includes(entrada)) {
      setEntrada('');
      return;
    }

    setLetrasAdivinadas([...letrasAdivinadas, entrada]);

    if (!palabra.includes(entrada)) {
      setErrores(errores + 1);
    }

    setEntrada('');
  };

  const palabraMostrada = palabra
    .split('')
    .map((letra) => (letrasAdivinadas.includes(letra) ? letra : '_'))
    .join(' ');

  const juegoGanado = palabra.split('').every((letra) => letrasAdivinadas.includes(letra));
  const juegoPerdido = errores >= maxErrores;

  const reiniciarJuego = () => {
    setPalabra(palabras[Math.floor(Math.random() * palabras.length)]);
    setLetrasAdivinadas([]);
    setErrores(0);
    setEntrada('');
  };

  return (
    <div className="ahorcado-container">
      <h1 className="titulo">🎯 Juego del Ahorcado</h1>
      <p className="errores">Errores: {errores} / {maxErrores}</p>
      <h2 className="palabra">{palabraMostrada}</h2>

      {!juegoGanado && !juegoPerdido && (
        <form onSubmit={manejarIntento} className="formulario">
          <input
            type="text"
            maxLength="1"
            value={entrada}
            onChange={manejarCambio}
            className="input-letra"
            disabled={juegoGanado || juegoPerdido}
            autoFocus
          />
          <button type="submit" className="boton-probar">Probar</button>
        </form>
      )}

      {juegoGanado && <h2 className="mensaje-ganador">¡Ganaste! 🎉</h2>}
      {juegoPerdido && (
        <h2 className="mensaje-perdedor">
          ¡Perdiste! La palabra era: <strong>{palabra}</strong>
        </h2>
      )}

      {(juegoGanado || juegoPerdido) && (
        <button onClick={reiniciarJuego} className="boton-reiniciar">🔄 Jugar de nuevo</button>
      )}
    </div>
  );
};

export default Ahorcado;
