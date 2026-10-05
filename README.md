# Clinicdev

Sistema monolítico modular de gestión e imprevistos de citas médicas (React + TypeScript, API en Vercel Functions, Neon PostgreSQL).

## Ejecutar localmente

```bash
npm install
npm run dev
npm test
```

## Estructura

- `src/`: interfaz React.
- `shared/`: reglas reutilizables (RUT Módulo 11, código de cita CCCNNNN-DV, tipos).
- `tests/`: pruebas unitarias.
- `docs/`: arquitectura y reglas de negocio.

Los datos de demostración serán siempre ficticios. Los secretos van en variables de entorno, nunca en el repositorio.
