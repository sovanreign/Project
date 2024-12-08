## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22.x or later recommended)
- [PNPM](https://pnpm.io/) (`npm install -g pnpm`)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or later)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Mapakode/curriculum-coaching-api.git
    cd curriculum-coaching-api
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Environment variables:

    Create a .env file in the root directory and define the following variables:

    ```dotenv
    DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>
    JWT_SECRET_KEY=<your-secret-key>
    JWT_EXPIRES_IN=<your-expires-in>
    ```

    Note: update "user", "password", "database", with your PostgreSQL credentials

4.  Database Setup

    4.1 Apply prisma migration:

    ```bash
    pnpm prisma migrate dev
    ```

    4.2 Generate Prisma Client:

    ```bash
    pnpm prisma generate
    ```

5.  Running the application:

    5.1 Start the development server:

    ```bash
    pnpm run start:dev
    ```

The API will be accessible at http://localhost:3000 (or the port specified in your .env file).

Please refer to Postman to test the API routes.
