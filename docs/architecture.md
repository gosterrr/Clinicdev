# Arquitectura

## Objetivo

Clinicdev se organiza como un monorepo para separar la aplicación web, la API, los contratos compartidos, la persistencia, la infraestructura y la documentación.

## Límites

- `apps/web`: interfaz pública y áreas privadas; no contiene secretos ni acceso directo a la base de datos.
- `apps/api`: API responsable de autenticación, autorización, validación, reglas de negocio y acceso a datos.
- `packages/shared`: contratos, tipos y validaciones reutilizables que no contienen credenciales.
- `packages/ui`: componentes visuales reutilizables.
- `packages/config`: configuraciones compartidas de herramientas.
- `database`: migraciones, semillas controladas y consultas operativas; no incluye datos clínicos ni credenciales.
- `infrastructure`: configuración y documentación de despliegue por entorno.

## Seguridad

Las variables sensibles se administran exclusivamente mediante los entornos seguros de cada proveedor. El navegador no debe conectarse directamente a la base de datos. Los datos de pacientes, credenciales y cualquier información clínica no se almacenan en el repositorio.

## Migración

La migración será incremental. En la primera etapa se crea esta estructura sin modificar la aplicación existente. Las etapas posteriores moverán el frontend, crearán la API mínima y extraerán módulos por dominio con verificación de compilación en cada entrega.
