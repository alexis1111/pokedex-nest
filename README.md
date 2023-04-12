<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm i
```
3. Tener Nest CLI o correr
```
npm i g @nestjs/cli
```
4. Levantar la base de datos con docker compose
```
docker-compose up -d
```
5. Clonar el archivo ```env.template```  y renombrar a ```.env```
6. Llenar las variables de entorno definidas
7. Ejecutar la aplicacion en dev con 
```
npm run start:dev
```
7. Reconstruir la base de datos con la semilla
```
GET http://localhost:3000/api/seed
```
## Stack Usado
* NestJS
* mongoDb