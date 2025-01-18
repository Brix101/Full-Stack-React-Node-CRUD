# Full-Stack-React-Node-CRUD

This is a full-stack CRUD application built using React for the frontend and Node.js for the backend. The project demonstrates essential Create, Read, Update, and Delete functionalities.

## Features

- React-based frontend for an intuitive and responsive user interface.
- Node.js-based backend to handle API requests and business logic.
- CRUD operations for managing data.
- Docker support for containerized deployment.

## Prerequisites

Ensure you have the following installed on your machine

- [Docker](https://www.docker.com/get-started)
- [Pnpm](https://pnpm.io/installation)

## Installation and Setup

Follow these steps to set up the project locally

### 1. Clone the Repository

```bash
git clone https://github.com/Brix101/Full-Stack-React-Node-CRUD
cd Full-Stack-React-Node-CRUD
```

### 2. Install Dependencies

Install the required dependencies using `pnpm`:

```bash
pnpm install
```

### 3. Run Docker Compose

Start the database using Docker Compose:

```bash
docker-compose up -d --build
```

This will spin up the database container defined in the `docker-compose.yml` file. Ensure the backend connects to this database during development.

### 4. Setup Environment Variables

Copy the example `.env` file for the backend:

```bash
cp ./api/.env.example ./api/.env
```

### 5. Push Database Migrations

Push the database migrations to ensure the schema is up-to-date:

```bash
pnpm run --filter=api drizzle-kit push
```

### 6. Access the Application

Run the entire application using the development script:

```bash
pnpm dev
```

This will start both the frontend and backend servers. Then we can access the application at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
