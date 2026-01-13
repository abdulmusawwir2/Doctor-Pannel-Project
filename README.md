# Doctor Panel Project

A comprehensive doctor appointment panel allowing patients to book appointments, doctors to manage schedules, and administrators to oversee the system. This full-stack application is divided into three parts:

* **Backend** (RESTful API):  [https://doctor-pannel-server.onrender.com](https://doctor-pannel-server.onrender.com)
* **Frontend** (Patient view): [https://doctor-pannel-project-new.vercel.app/](https://doctor-pannel-project-new.vercel.app/)
* **Admin Panel** (Administrator view): [https://doctor-pannel-project-admin.vercel.app/](https://doctor-pannel-project-admin.vercel.app/)

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Environment Variables](#environment-variables)
   * [Running the Application](#running-the-application)
4. [Usage](#usage)

   * [Patient Frontend](#patient-frontend)
   * [Admin Panel](#admin-panel)
   * [API Endpoints](#api-endpoints)
5. [Project Structure](#project-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

* User authentication and authorization (JWT)
* Role-based access: Patients, Doctors, Administrators
* Book, view, reschedule, and cancel appointments
* Doctor schedule management
* Admin dashboard: user and appointment management
* Responsive UI for both patient and admin interfaces
* Email notifications for appointment confirmations

## Tech Stack

### Backend

* Node.js & Express
* MongoDB & Mongoose
* JWT for authentication
* Nodemailer for email notifications

### Frontend & Admin Dashboard

* React.js with Hooks
* React Router for navigation
* Axios for API requests
* Tailwind CSS for styling

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Node.js (v14+)
* npm or Yarn
* MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abdulmusawwir2/Doctor-Pannel-Project.git
   cd Doctor-Pannel-Project
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend (Patient)**

   ```bash
   cd ../client
   npm install
   ```

4. **Setup Admin Dashboard**

   ```bash
   cd ../admin
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Running the Application

In separate terminals, start each part:

* **Backend**

  ```bash
  cd server
  npm run dev
  ```

* **Patient Frontend**

  ```bash
  cd client
  npm start
  ```

* **Admin Panel**

  ```bash
  cd admin
  npm start
  ```

The server runs on `http://localhost:5000`, patient client on `http://localhost:3000`, and admin panel on `http://localhost:3001` (if configured).

## Usage

### Patient Frontend

* Register or log in as a patient
* Browse available doctors and their schedules
* Book, view, reschedule, or cancel appointments
* Receive email confirmations

Visit the deployed patient app: [https://doctor-pannel-project-new.vercel.app/](https://doctor-pannel-project-new.vercel.app/)

### Admin Panel

* Log in with an admin account
* View and manage all users (patients & doctors)
* View, approve, or cancel appointments
* Dashboard statistics and charts

Visit the deployed admin app: [https://doctor-pannel-project-admin.vercel.app/](https://doctor-pannel-project-admin.vercel.app/)

### API Endpoints

Base URL: `https://doctor-pannel-server.onrender.com`

| Endpoint                | Method | Description                               | Access     |
| ----------------------- | ------ | ----------------------------------------- | ---------- |
| `/api/auth/register`    | POST   | Register a new user                       | Public     |
| `/api/auth/login`       | POST   | Log in and receive a JWT token            | Public     |
| `/api/doctors`          | GET    | Get list of all doctors                   | Protected  |
| `/api/doctors/:id`      | GET    | Get doctor details                        | Protected  |
| `/api/appointments`     | POST   | Book a new appointment                    | Protected  |
| `/api/appointments`     | GET    | Get all appointments (filtered by role)   | Protected  |
| `/api/appointments/:id` | PATCH  | Update (reschedule/cancel) an appointment | Protected  |
| `/api/users`            | GET    | Get all users (admin only)                | Admin Only |
| `/api/users/:id`        | DELETE | Delete a user                             | Admin Only |

## Project Structure

```
Doctor-Pannel-Project/
├── server/           # Backend source code
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── client/           # Patient frontend
│   ├── src/
│   └── public/
├── admin/            # Admin dashboard frontend
│   ├── src/
│   └── public/
└── README.md         # This file
```
#Project Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/74f93b09-76da-4a2b-88b8-3568fe82d692" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/56abdd27-c701-4afa-94b1-f14008c776ef" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5710f813-140f-4c3e-98df-a99bbc7c9624" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1bf732ba-ec9d-4496-883d-1397d59ee064" />





##Razorpay Integration Workflow


<img width="700" height="400" alt="image" src="https://github.com/user-attachments/assets/f23a4af8-18f2-427a-ab0e-d0e60fbca381" />


##LOAD TESTING IN POSTMAN

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0256a8d7-2c3c-4a40-b097-cc1e0022f0a4" />



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

