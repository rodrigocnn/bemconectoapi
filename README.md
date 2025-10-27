# BemConecto API

The **BemConecto API** is the official backend for the **BemConecto** system — a platform designed to support psychologists in managing their practice, including patient registration, appointment scheduling, and session tracking.  
Built with **Node.js + TypeScript**, the API provides a modular architecture, strong validation, and secure authentication using **JWT**.

---

## ✨ Overview

The API offers all the necessary resources for psychologists and clinics to manage their daily workflow efficiently and in one place.  
It integrates seamlessly with the frontend built in **Next.js + React**, exposing RESTful endpoints for complete CRUD operations and user authentication.

---

## 🧱 Tech Stack

- **Node.js + Express** – Framework for scalable and high-performance APIs
- **TypeScript** – Static typing for better reliability
- **Prisma ORM** – Object-relational mapping and database migrations
- **PostgreSQL** – Relational database
- **JWT** – Token-based authentication
- **Zod** – Input data validation
- **Jest** – Automated testing

---

## 🗂 Project Structure

```text
src/
├── database/ → Prisma configuration and database connection
├── modules/ → Domain-based modules
│ ├── appointments/ → Appointment management
│ ├── auth/ → Authentication and access control
│ ├── patient/ → Patient registration and management
│ ├── psychologist/ → Psychologist management
│ └── session/ → Therapy sessions
└── shared/ → Shared utilities and resources
  ├── middlewares/
  ├── routes/
  └── utils/
```

## ⚙️ Installation and Setup

1. Clone the repository:  
   git clone https://github.com/rodrigocnn/bemconecto-api.git

2. Enter the project directory:  
   cd bemconecto-api

3. Install dependencies:  
   yarn install

### 🔧 Environment Variables

Create a `.env` file in the root directory and include:

DATABASE_URL="postgresql://user:password@localhost:5432/bemconecto"  
JWT_SECRET="your_secret_key"

### 🗃️ Prisma Migrations

Run the database migrations:

yarn prisma migrate dev --name init

## ▶️ Running the Project

Development mode:  
yarn dev

Production:  
yarn build  
yarn start

---

## 📡 Example Endpoints

### Create Patient

Method: POST  
Route: /patients  
Header: Content-Type: application/json

Body:  
name  
email  
birth  
phone

---

### Create Session

Method: POST  
Route: /sessions  
Header: Authorization: Bearer <token>

Body:  
sessionDate  
patientId  
psychologistId  
summary

---

### List Appointments

Method: GET  
Route: /appointments  
Header: Authorization: Bearer <token>

---

## 🧪 Testing

Run all tests:  
yarn test

Run with coverage:  
yarn test --coverage

---

## 🤝 Contributing

This project is currently private and not open to external contributions.  
For future collaboration:

1. Fork the repository
2. Create a branch: feature/my-feature
3. Commit your changes
4. Push your branch
5. Open a Pull Request 🚀

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and share it.
