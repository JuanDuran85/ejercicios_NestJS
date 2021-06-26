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
7. Generar todo un recurso CRUD
   ```
        nest g resource
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

# Windows: Environment Variables

Windows users only: Environment Variables

In the upcoming lectures I will set up environment variables via NPM scripts. This is not supported in Windows by default.

To overcome this, please install the [win-node-env](https://www.npmjs.com/package/win-node-env) NPM package globally.

If you are using NPM:
    ```
        npm install -g win-node-env
    ```

If you are using Yarn:
    ```
        yarn global add win-node-env
    ```

# Instalaciones adicionales

1. Para aprovechar las tipificaciones de express  (como en el request: Request), se puede instalar el package @types/express.
   ```
        yarn add @types/express
   ```
   ```
        npm install --save @types/express
   ```

2. Para validaciones en la entrada de datos en los DTO
   ```
        npm install class-validator class-transformer --save
   ```
   ```
        yarn add class-validator class-transformer
   ```

3. Para utilizar datos de un DTO que no sean obligatorios
   ```
        npm install @nestjs/mapped-types --save
   ```
   ```
        yarn add @nestjs/mapped-types
   ```