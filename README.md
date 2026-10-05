# Clínica Alemania

Portal de demostración para reserva de horas médicas, construido con React, TypeScript y Vite.

## Estado actual

- Frontend público funcional: reserva, cancelación, especialidades, servicios, convenios, contacto, reclamos y ayuda.
- Validación de RUT mediante módulo 11.
- Persistencia local temporal mediante `localStorage`.
- Datos de profesionales, salas y canales de contacto simulados.
- Endpoints base en `api/` preparados para Vercel; devuelven `501` hasta configurar PostgreSQL/Neon.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Variables de entorno

Copia `.env.example` a `.env.local`. No subas secretos al repositorio.

```bash
VITE_API_URL=
DATABASE_URL=
```

## Contratos HTTP previstos

| Ruta | Método | Uso | Estado actual |
|---|---:|---|---|
| `/api/health` | GET | Verificar disponibilidad | Activo |
| `/api/appointments` | GET | Disponibilidad y citas | Preparado, requiere BD |
| `/api/appointments` | POST | Crear reserva | Preparado, requiere BD |
| `/api/appointments` | PATCH/DELETE | Reprogramar o anular | Preparado, requiere BD |
| `/api/feedback` | GET/POST | Contacto y reclamos | Preparado, requiere BD |

## Siguiente etapa

1. Conectar una base PostgreSQL/Neon con `DATABASE_URL`.
2. Crear migraciones para pacientes, profesionales, horarios, citas, reclamos y auditoría.
3. Implementar autenticación y autorización por roles.
4. Cambiar el cliente `localStorage` a solicitudes autenticadas a `/api`.
5. Desplegar en Vercel configurando `DATABASE_URL` como secreto de entorno.

## Aviso de datos

Esta versión es de demostración. Antes de recolectar datos personales reales se requiere una política de privacidad, controles de seguridad, retención/borrado de datos y revisión legal aplicable.
