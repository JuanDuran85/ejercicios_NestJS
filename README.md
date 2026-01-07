# NestJS_exercises

Exercises with NestJS

# Nest CLI Commands

- Source: <https://docs.nestjs.com/cli/usages>

## Modules

- A module is a class that is annotated with the @Module() decorator. This decorator provides metadata that Nest uses to organize and manage the application structure efficiently.

## Controllers

- Controllers are responsible for handling incoming requests and sending responses back to the client.

## Providers

- Providers are a core concept in Nest. Many of the basic Nest classes, such as services, repositories, factories, and helpers, can be treated as providers. The key idea behind a provider is that it can be injected as a dependency, allowing objects to form various relationships with each other. The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.

## Services

- Services are a core concept in Nest. They are used to perform business logic and provide data to controllers.

## Pipes

A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

## Exception filters

- Nest comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

## Nest CLI Commands

1. Create a new project

   ```
       nest new project_name
   ```

   - To avoid initializing git with the project.

   ```
       nest new project_name --skip-git
   ```

2. To start the local server

   ```
       npm run start:dev
   ```

3. To generate classes

   ```
       nest g class
   ```

4. To generate a new service

   ```
       nest g service name_file
   ```

5. To generate a module

   ```
       nest g module name_file
   ```

6. To generate a controller

   ```
       nest g controller name_file
   ```

7. Generate a full CRUD resource

   ```
        nest g resource
   ```

# Using Docker PostgreSQL

1. Start container

   ```
       docker run --name container_name -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
   ```

2. Check running containers

   ```
       docker container ls
   ```

3. Stop a container

   ```
       docker container stop container_name
   ```

4. Remove a container

   ```
       docker container rm container_name
   ```

5. Use portainer

   ```
        docker volume create portainer_data
        docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
   ```

# Windows: Environment Variables

Windows users only: Environment Variables

In the upcoming lectures I will set up environment variables via NPM scripts. This is not supported in Windows by default.

To overcome this, please install the [win-node-env](https://www.npmjs.com/package/win-node-env) NPM package globally.

If you are using NPM:
`npm install -g win-node-env`

If you are using Yarn:
`yarn global add win-node-env`

# Additional Installations

1. To take advantage of express typings (as in request: Request), you can install the @types/express package.

   ```
        yarn add @types/express
   ```

   ```
        npm install --save @types/express
   ```

2. For data entry validations in DTOs

   ```
        npm install class-validator class-transformer --save
   ```

   ```
        yarn add class-validator class-transformer
   ```

3. To use optional data from a DTO

   ```
        npm install @nestjs/mapped-types --save
   ```

   ```
        yarn add @nestjs/mapped-types
   ```

4. To make global configurations on NestJS like environment variables

   ```
        npm i --save @nestjs/config
   ```

   ```
        yarn add @nestjs/config
   ```

5. For auto-documentation

   ```
        npm install --save @nestjs/swagger swagger-ui-express
   ```

   ```
        yarn add @nestjs/swagger swagger-ui-express
   ```

6. To validate environment variables

   ```
        npm install --save joi
   ```

   ```
        yarn add joi
   ```

7. PostgreSQL database installation

   ```
        npm install --save pg
   ```

   ```
        yarn add pg
   ```

8. Typings for PostgreSQL database

   ```
        npm install --save @types/pg
   ```

   ```
        yarn add @types/pg
   ```

9. TypeORM for database

   ```
        npm install --save @nestjs/typeorm typeorm
   ```

   ```
        yarn add @nestjs/typeorm typeorm
   ```

10. Encrypting keys and typing

    ```bash
        npm install --save bcryptjs @types/bcryptjs
    ```

    ```bash
        yarn add bcryptjs @types/bcryptjs
    ```

11. To work with mongoose

    ```bash
        npm install -D @types/mongoose
    ```

    ```bash
        yarn add @types/mongoose -D
    ```

12. To work with environment variables and their typings

    ```bash
        npm install dotenv @types/dotenv -D
    ```

    ```bash
        yarn add dotenv @types/dotenv -D
    ```

13. Passport library for NestJS with JWT (jsonwebtoken) including typings for TypeScript

    ```bash
        npm install @nestjs/passport @nestjs/jwt passport-jwt @types/passport-jwt jsonwebtoken @types/jsonwebtoken @types/passport passport
    ```

    ```bash
        yarn add @nestjs/passport @nestjs/jwt passport-jwt @types/passport-jwt jsonwebtoken @types/jsonwebtoken @types/passport passport
    ```

14. TypeOrm - create migrations

    ```bash
        npx typeorm migration:create src/..path/to/migration
    ```

15. TypeOrm - run migrations

    ```bash
        npx typeorm migration:run -d dist/..path/to/migration
    ```

16. TypeOrm - revert migrations
    ```bash
        npx typeorm migration:revert -d dist/..path/to/migration
    ```
