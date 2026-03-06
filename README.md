# 🚗 Vehicle Rental Management System

A robust, enterprise-grade Backend API built with **Node.js**, **Express.js**, and **Sequelize ORM**. This system manages vehicle rentals with a focus on clean architecture, multiple database support, and strict data validation.

---

## ✨ Key Features

-   **Modular Architecture**: Built on a highly maintainable **Route-Controller-Service** pattern.
-   **Multi-Database Support**: Easily switch between **PostgreSQL**, **MySQL**, **MariaDB**, and **SQLite** via `.env`.
-   **Strict validation**: All request data is validated using **Joi-based DTOs** before it hits the controller.
-   **Role-Based Security**: Secure operations with **JWT Authentication** and **Role-Based Authorization** (Admin vs Customer).
-   **Interactive API Docs**: Built-in **Swagger UI** for testing and exploring every endpoint.
-   **Database Sync & Seed**: Automated table creation and sample data population scripts.

---

## 🛠️ Technology Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| **Runtime**    | Node.js                        |
| **Framework**  | Express.js                     |
| **ORM**        | Sequelize                      |
| **Validation** | Joi                            |
| **Security**   | bcryptjs, jsonwebtoken         |
| **API Docs**   | Swagger UI (via `swagger.yaml`) |
| **Testing**    | Jest, Supertest                |

---

## 📁 Project Structure

```text
/
├── src/
│   ├── config/      # Configuration & Environment loading
│   ├── controllers/ # Request/Response handling logic
│   ├── db/          # Database connection & Sequelize initialization
│   ├── dtos/        # Data Transfer Objects (Joi validation schemas)
│   ├── middleware/  # Auth, Validation, and Global Error handlers
│   ├── models/      # Sequelize database models (Schema design)
│   ├── routes/      # API endpoint definitions
│   ├── services/    # Core business logic & DB operations
│   ├── utils/       # JWT & Hashing utilities
│   └── app.js       # Main Express application setup
├── tests/           # Integration tests for Users & Vehicles
├── .env             # Environment variables (DB, Port, Secret)
├── server.js        # Entry point for starting the server
├── seed.js          # Script to seed the database with sample data
└── swagger.yaml     # OpenAPI/Swagger specification
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- A running database (PostgreSQL, MySQL) or use the default **SQLite** (file-based).

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Configure your database in the `.env` file. You can choose your database type here:
```env
DB_TYPE=sqlite # or postgres, mysql, mariadb
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=vehicle_rental_db
JWT_SECRET=your_secret_key
```

### 4. Seed Database
Run the seed script to create tables and add an initial **Admin** and **Customer**:
```bash
npm run seed
```

### 5. Start Development
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

---

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/users/register` - Create a new user account as Admin or Customer.
- `POST /api/users/login` - Authenticate and receive a JWT token.

### 🚙 Vehicle Management
- `GET /api/vehicles` - List all available vehicles (Public).
- `GET /api/vehicles/:id` - Get details of a single vehicle (Public).
- `POST /api/vehicles` - Add a new vehicle (**Admin Only**).
- `PUT /api/vehicles/:id` - Update vehicle details (**Admin Only**).
- `DELETE /api/vehicles/:id` - Remove a vehicle from the system (**Admin Only**).

---

## 📖 Interactive Documentation
Once the server is running, visit:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

Use the **"Authorize"** button in Swagger to test protected routes with your JWT token.

---

## 🧪 Testing
Run the comprehensive test suite (12+ tests) using Jest:
```bash
npm test
```

---

## 🛡️ License
Distributed under the MIT License.
