# Despliegue

## Principios

- El frontend y la API se despliegan como aplicaciones separadas.
- Cada entorno administra sus propias variables de entorno.
- Los secretos no se versionan ni se exponen al cliente.
- La base de datos se accede únicamente desde la API o servicios autorizados.

## Destinos previstos

- `apps/web`: despliegue en Vercel u otro host compatible con el frontend.
- `apps/api`: servicio independiente o funciones compatibles con la infraestructura seleccionada.
- Base de datos: Neon como origen de datos operativo, configurado mediante variables de entorno seguras.

## Antes de producción

1. Configurar variables de entorno por plataforma.
2. Ejecutar migraciones revisadas.
3. Ejecutar pruebas y validaciones de compilación.
4. Confirmar controles de acceso, registros y manejo de errores.
5. No cargar datos reales de pacientes en semillas ni entornos no productivos.
