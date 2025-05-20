# Prueba Técnica - Gestión de Usuarios

## Instrucciones de ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/valen0626/gestion-usuarios.git
   cd dashboard-usuarios

2. Instalar dependencias:
npm install

3. Ejecutar la aplicación:
ng serve

4. Abrir en el navegador:
http://localhost:4200

## Instrucciones para pruebas
### Ejecutar pruebas unitarias:

ng test

## Credenciales de acceso
correo: camargovalen06@gmail.com
contraseña: 1234

## Sustento del diseño de la solución
Angular con componentes standalone para modularidad.
UserService maneja usuarios mediante observables para sincronización reactiva.
Paginación y filtros para mejorar usabilidad y rendimiento.
Separación de responsabilidades y comunicación entre componentes vía @Input y @Output.

## Arquitectura utilizada
Arquitectura basada en componentes standalone de Angular.
Patrón reactivo con RxJS.
Servicio centralizado para manejo de usuarios.
Esta arquitectura facilita escalabilidad, reutilización y mantenimiento.