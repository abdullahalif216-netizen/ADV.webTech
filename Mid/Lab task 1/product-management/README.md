# Product & Employee Management API

Course: Advanced Webtech, Department of CSE, American International University - Bangladesh (AIUB)
Assignment: Mid - Lab Task 1

## Student details

| SL  | Name              | ID         | Section |
| --- | ----------------- | ---------- | ------- |
| ___ | Sifat Al Muqtadir | 23-50146-1 | B       |

## Tech stack

NestJS 11, TypeScript, TypeORM, PostgreSQL, class-validator, Swagger, pnpm.

## Prerequisites

- Node.js 22 or newer (tested with Node 22)
- pnpm (`npm install -g pnpm`)
- PostgreSQL 14 or newer, running on `localhost:5432`

Redis is **not** needed to run this lab task.

## Database setup

1. Create an empty database (using pgAdmin, or `psql`):

   ```sql
   CREATE DATABASE product_management;
   ```

2. Copy the sample environment file and put in your own PostgreSQL password:

   ```powershell
   copy .env.example .env
   ```

   Then edit `.env` and set `DB_PASSWORD` (and `DB_USER` / `DB_PORT` if yours are different).
   The real `.env` file is git-ignored and must never be committed.

3. Create the tables by running the migration:

   ```powershell
   pnpm run migration:run
   ```

   This creates the `products` and `employees` tables. Automatic schema sync is disabled on
   purpose, so the schema only changes through migrations.

## Installation and run

```powershell
pnpm install
pnpm start:dev
```

The server starts on `http://localhost:5001`.
Interactive Swagger documentation is available at `http://localhost:5001/api`.

Other commands:

| Command                       | Purpose                                  |
| ----------------------------- | ---------------------------------------- |
| `pnpm build`                  | Compile TypeScript into `dist/`          |
| `pnpm start:prod`             | Run the compiled app (`node dist/main`)  |
| `pnpm run migration:rollback` | Revert the last migration                |

## Endpoints

### Products

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| POST   | `/products`     | Create and save a product         |
| GET    | `/products`     | Return all products               |
| GET    | `/products/:id` | Return one product                |
| PATCH  | `/products/:id` | Update a product (partial update) |
| DELETE | `/products/:id` | Delete a product                  |

Create body:

```json
{ "name": "Basmati Rice 5kg", "category": "Grocery", "price": 750.5, "quantity": 40 }
```

### Employees

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| POST   | `/employees`     | Create and save an employee         |
| GET    | `/employees`     | Return all employees                |
| GET    | `/employees/:id` | Return one employee                 |
| PATCH  | `/employees/:id` | Update an employee (partial update) |
| DELETE | `/employees/:id` | Delete an employee                  |

Create body:

```json
{
  "name": "Rahim Uddin",
  "email": "rahim@example.com",
  "phone": "01712345678",
  "password": "dummy123",
  "age": 28,
  "yearsOfWorking": 5
}
```

## Design notes

- Each feature is a NestJS module (`module`, `controller`, `service`, `entity`, `dto`).
  All database operations live in the service, through the TypeORM repository.
- Request bodies are validated with DTOs and a global `ValidationPipe` (unknown fields are rejected).
- A missing record returns `404`, invalid input returns `400`, a duplicate employee email returns `409`.
- Employee passwords are hashed (argon2) before saving and are never returned in responses.

## Project structure

```
src/
  modules/
    product/                 entity, dto, service, controller, module
    employee/                entity, dto, service, controller, module
  database/migrations/       schema migration
  common/transformers/       decimal -> number transformer
screenshots/                 Postman evidence (01-create.png ... 07-confirm-delete.png)
```
