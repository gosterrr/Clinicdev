import { useState } from 'react';
import { formatRut, isValidRut } from '../shared/rut';

export default function App() {
  const [rut, setRut] = useState('');
  const [touched, setTouched] = useState(false);
  const valid = isValidRut(rut);

  return (
    <main className="page">
      <header className="topbar">
        <strong>Clínica Gestión</strong>
        <span>Reserva de horas</span>
      </header>

      <section className="card">
        <h1>Reservar hora</h1>
        <p>Ingresa tu RUT para validar tu identidad antes de elegir un horario.</p>

        <label htmlFor="rut">RUT del paciente</label>
        <input
          id="rut"
          value={rut}
          placeholder="12.345.678-5"
          onChange={(e) => setRut(formatRut(e.target.value))}
          onBlur={() => setTouched(true)}
          aria-invalid={touched && !valid}
        />

        {touched && !valid && (
          <p className="error">
            El RUT ingresado no es válido. Verifica los números y el dígito verificador.
          </p>
        )}
        {valid && <p className="ok">RUT válido. Puedes continuar con la reserva.</p>}

        <button className="cta" disabled={!valid}>
          Continuar
        </button>
      </section>
    </main>
  );
}
