# MERN Authentication

A full-stack authentication app built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Supports:

-  User Registration
-  Login/Logout
-  Email Verification via OTP
-  Password Reset via OTP
-  JWT-based authentication
-  Protected routes and middleware

---

##  Tech Stack

- **Frontend:** React + Vite + Axios + Tailwind CSS
- **Backend:** Express.js + MongoDB + Mongoose + JWT
- **Email Service:** SMTP via Brevo (formerly Sendinblue)

---

##  Getting Started

###  Prerequisites

- Node.js and npm installed
- MongoDB Atlas database
- SMTP credentials (e.g., Brevo)

---

###  Setup

```bash
# Clone the repo
git clone https://github.com/SriHarsha-23/MERN-auth.git
cd MERN-auth

# Install server dependencies
cd Server
npm install

# Create .env in /Server with:
# MONGODB_URL=
# JWT_SECRET=
# NODE_ENV=
# SMTP_USER=
# SMTP_PASS=
# SENDER_EMAIL=

# Install client dependencies
cd ../client
npm install
