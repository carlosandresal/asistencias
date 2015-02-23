# Asistencias

Una aplicación para que cada alumno se marque su asistencia utilizando una interfaz REST API.

Se ejecuta de la siguiente forma: 
```
node index.js --port 3000
```
donde podés cambiar 3000 por el puerto de tu preferencia.

Para marcar tu asistencia, podés utilizar curl:
```bash
curl -H "Content-Type: application/json" -d '{"name":"Alejandro Oviedo","email":"alejandro.oviedo.g@gmail.com"}' host:port/asistencia
```
donde host será reemplazado por el hostname y port por el puerto donde la aplicación está siendo ejecutada.