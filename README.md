# 🏥 Hospital Management System

A full-stack Hospital Management System built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

## Features

- 🔐 **Authentication** - Login, Register, Role-based access (Admin, Doctor, Receptionist)
- 👥 **Patient Management** - Add, Edit, Delete patients with full medical details
- 🩺 **Doctor Management** - Manage doctors, specializations, and availability
- 📅 **Appointment Scheduling** - Book, update, and track appointments
- 📊 **Dashboard** - Real-time stats and recent activity

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Views | EJS (Embedded JavaScript) |
| Auth | bcrypt + express-session |
| Session Store | connect-mongo |

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB running locally or MongoDB Atlas

### Installation

```bash
# Clone the repository
git clone https://github.com/veeranagulan-bit/HosipatlManagement.git

# Navigate to project
cd HosipatlManagement

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and session secret

# Start the server
npm run dev
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/hospital-management
SESSION_SECRET=your-secret-key
PORT=3000
```

## Project Structure

```
hospital-management/
├── app.js                  # Main application entry
├── models/
│   ├── User.js
│   ├── Patient.js
│   ├── Doctor.js
│   └── Appointment.js
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   ├── patients.js
│   ├── doctors.js
│   └── appointments.js
├── middleware/
│   └── auth.js
├── views/
│   ├── auth/
│   ├── dashboard/
│   ├── patients/
│   ├── doctors/
│   └── appointments/
├── public/
│   └── css/style.css
└── package.json
```

## License

ISC
