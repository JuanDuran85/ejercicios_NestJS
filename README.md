# ejercicios_NestJS

Ejercicios con NestJS

# Comandos con Nest Cli
- Fuente: https://docs.nestjs.com/cli/usages
  
1. Crear un nuevo proyecto
    ```
        nest new nombre_proyecto
    ```

2. Para iniciar el servidor local
    ```
        npm run start:dev
    ``` 

3. Para generar clases
    ``` 
        nest g class 
    ```
4. Para iniciar un nuevo servicio
    ```
        nest g service name_file
    ```

5. Para generar un modulo
    ```
        nest g module name_file
    ```
6. Para generar un controlador
    ```
        nest g controller name_file
    ```

 # Usando Docker PostgreSQL
1. Inicar contenedor
```
docker run --name nombre_contenedor -p 5432:5432 -e POSTGRES_PASSWORD=clave -d postgres
```

2. Verificar los contenedores en ejecucion
```
 docker container ls
```

3. Detener un contenedor
```
docker container stop nombre_contenedor
```

4. Eliminar un contenedor
```
docker container rm nombre_contenedor
```