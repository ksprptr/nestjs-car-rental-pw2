<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="220" alt="Nest Logo" /></a>

# Car Rental API - NestJS

> A Car Rental API built for a PW2 school project. This API manages users, vehicles, brands, colors, countries, and related entities. Built using NestJS and Prisma ORM with a PostgreSQL database.

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Run](#Run)
- [Configuration](#Configuration)
- [License](#License)

## Prerequisites

- Knowledge of JavaScript/TypeScript, [NestJS](https://nestjs.com/), Git
- IDE ([VS Code](https://code.visualstudio.com/), WebStorm, ...)
- Package manager ([pnpm](https://pnpm.io/installation), npm, ...)

## Installation

- Go to the project folder using `cd nestjs-car-rental-pw2/`
- Install all dependecies using `pnpm install`
- Copy `.env.example` to `.env` and change the properties
  - **(Only first run)** Run `npx prisma migrate deploy`

## Run

- Development server: `pnpm run start:dev`
- Debugging: `pnpm run start:debug`
- Production: `pnpm run start:prod`

## Configuration

> Server

| Description       | Values                        |
| ----------------- | ----------------------------- |
| **Ports:**        | 4000                          |
| **Technologies:** | NestJS, Prisma                |
| **URL:**          | http://localhost:4000/        |
| **Swagger:**      | http://localhost:4000/swagger |

> Database

| Description      | Values      |
| ---------------- | ----------- |
| **Port:**        | 5432        |
| **Technology:**  | Postgres    |
| **Database:**    | car_rental  |
| **Credentials:** | `root:root` |

## License

> This software is developed by **Petr Kašpar** and is licensed under the MIT License.  
> For more details, please refer to the [LICENSE](./LICENSE) file.
