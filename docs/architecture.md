# Arquitectura

Proyecto monolítico modular para la gestión de citas médicas.

## Componentes
- React + TypeScript: interfaz de paciente, recepción, médico y administración.
- API interna TypeScript: autenticación, reservas, disponibilidad, cancelaciones e informes.
- Neon PostgreSQL: persistencia de usuarios, pacientes, recursos, citas y auditoría.
- Vercel: despliegue del frontend y de las funciones API.

## Reglas centrales
- Validar RUT por Módulo 11 antes de habilitar la reserva.
- Validar de nuevo en la API antes de persistir.
- Prevenir solapamientos de paciente, médico y sala.
- Mantener auditoría de creación, modificación, cancelación y reasignación.
- Usar roles admin, recepcion, medico y paciente.

## Datos de demostración
Solo se usarán datos ficticios: pacientes DEMO, médicos ficticios, 50 salas y especialidades codificadas.

## Seguridad
Variables DATABASE_URL y JWT_SECRET se configurarán fuera del repositorio. No se subirán secretos ni información clínica real.