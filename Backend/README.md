# 🚖 Uber Backend API

A robust Node.js backend API for an Uber-like ride-sharing application, built with Express.js and MongoDB. This API handles user and captain (driver) authentication, registration, and profile management.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Models](#-database-models)
- [Authentication](#-authentication)
- [Running the Application](#-running-the-application)
- [API Endpoints Summary](#-api-endpoints-summary)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **User Management**: Complete user registration, login, and profile management
- **Captain (Driver) Management**: Driver registration with vehicle details
- **JWT Authentication**: Secure token-based authentication system
- **Input Validation**: Request validation using express-validator
- **MongoDB Integration**: Robust database with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Cookie Management**: JWT tokens stored in HTTP-only cookies
- **Password Hashing**: Secure password storage using bcrypt

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.18.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcrypt 6.0.0
- **Validation**: express-validator 7.2.1
- **CORS**: cors 2.8.5
- **Cookie Parser**: cookie-parser 1.4.7
- **Development**: nodemon 3.1.10, dotenv 17.2.1

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   node server.js
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8001

# Database Configuration
DB_CONNECT=mongodb://localhost:27017/uber_app
# OR for MongoDB Atlas:
# DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/uber_app

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Optional: Environment
NODE_ENV=development
```

## 📁 Project Structure

```
Backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── controllers/        # Route controllers
│   │   ├── user.controllers.js
│   │   └── captain.controllers.js
│   ├── db/
│   │   └── db.js          # Database connection
│   ├── middlewares/
│   │   └── authUser.js    # Authentication middleware
│   ├── models/            # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── captain.models.js
│   │   └── blacklistToken.models.js
│   ├── routes/            # API routes
│   │   ├── user.routes.js
│   │   └── captain.routes.js
│   └── services/          # Business logic services
├── server.js              # Server entry point
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 📚 API Documentation

### Base URL
```
http://localhost:8001/api
```

### Authentication
All protected routes require a JWT token passed in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 👤 User APIs

### 1. User Registration
**POST** `/api/user/register`

Registers a new user into the system.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Hemant",
    "lastname": "Singh"
  },
  "email": "hemant@example.com",
  "password": "MySecurePass123"
}
```

**Validation Rules:**
- `fullname.firstname`: Required, minimum 2 characters
- `fullname.lastname`: Optional, minimum 2 characters
- `email`: Required, valid email format, must be unique
- `password`: Required, minimum 6 characters

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "Hemant",
        "lastname": "Singh"
      },
      "email": "hemant@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. User Login
**POST** `/api/user/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "hemant@example.com",
  "password": "MySecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "Hemant",
        "lastname": "Singh"
      },
      "email": "hemant@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

### 3. Get User Profile
**GET** `/api/user/get-user`

Fetches the profile details of the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "Hemant",
        "lastname": "Singh"
      },
      "email": "hemant@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 4. User Logout
**GET** `/api/user/logout`

Logs out the user and invalidates the JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🚖 Captain (Driver) APIs

### 1. Captain Registration
**POST** `/api/captains/register`

Registers a new captain (driver) with vehicle details.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Rohit",
    "lastname": "Sharma"
  },
  "email": "rohit.captain@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "White",
    "plate": "MH12AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation Rules:**
- `fullname.firstname`: Required, minimum 2 characters
- `fullname.lastname`: Optional, minimum 2 characters
- `email`: Required, valid email format, must be unique
- `password`: Required, minimum 6 characters
- `vehicle.plate`: Required, minimum 4 characters
- `vehicle.capacity`: Required, minimum 2 seats
- `vehicle.vehicleType`: Required, must be one of: `car`, `motorcycle`, `auto`
- `vehicle.color`: Optional

**Response:**
```json
{
  "success": true,
  "message": "Captain registered successfully",
  "data": {
    "captain": {
      "id": "captain_id",
      "fullname": {
        "firstname": "Rohit",
        "lastname": "Sharma"
      },
      "email": "rohit.captain@example.com",
      "vehicle": {
        "color": "White",
        "plate": "MH12AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "jwt_token_here"
  }
}
```

### 2. Captain Login
**POST** `/api/captains/login`

Authenticates a captain and returns a JWT token.

**Request Body:**
```json
{
  "email": "rohit.captain@example.com",
  "password": "securePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "captain": {
      "id": "captain_id",
      "fullname": {
        "firstname": "Rohit",
        "lastname": "Sharma"
      },
      "email": "rohit.captain@example.com",
      "vehicle": {
        "color": "White",
        "plate": "MH12AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "jwt_token_here"
  }
}
```

### 3. Get Captain Profile
**GET** `/api/captains/get-captain`

Fetches the profile details of the authenticated captain.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "captain": {
      "id": "captain_id",
      "fullname": {
        "firstname": "Rohit",
        "lastname": "Sharma"
      },
      "email": "rohit.captain@example.com",
      "vehicle": {
        "color": "White",
        "plate": "MH12AB1234",
        "capacity": 4,
        "vehicleType": "car"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 4. Captain Logout
**GET** `/api/captains/logout`

Logs out the captain and invalidates the JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🗄️ Database Models

### User Model
- **fullname**: Object containing firstname and lastname
- **email**: Unique email address
- **password**: Hashed password using bcrypt
- **createdAt**: Timestamp of account creation

### Captain Model
- **fullname**: Object containing firstname and lastname
- **email**: Unique email address
- **password**: Hashed password using bcrypt
- **vehicle**: Object containing:
  - **color**: Vehicle color
  - **plate**: Vehicle number plate
  - **capacity**: Number of seats
  - **vehicleType**: Type of vehicle (car, motorcycle, auto)
- **createdAt**: Timestamp of account creation

### Blacklist Token Model
- **token**: JWT token to be blacklisted
- **createdAt**: Timestamp of blacklisting

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Token Generation**: Tokens are generated upon successful login/registration
2. **Token Storage**: Tokens are stored in HTTP-only cookies for security
3. **Token Validation**: All protected routes validate the JWT token
4. **Token Blacklisting**: Logout functionality blacklists tokens for security

### Middleware Usage
```javascript
// For user routes
const { authUser } = require('../middlewares/authUser.js');
app.get('/protected-route', authUser, controllerFunction);

// For captain routes
const { authCaptain } = require('../middlewares/authUser.js');
app.get('/protected-route', authCaptain, controllerFunction);
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with nodemon for automatic reloading on file changes.

### Production Mode
```bash
node server.js
```

### Environment Variables
Make sure to set the following environment variables:
- `PORT`: Server port (default: 8001)
- `DB_CONNECT`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: JWT expiration time (default: 7d)

## 📊 API Endpoints Summary

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/user/register` | User registration | ❌ |
| POST | `/api/user/login` | User login | ❌ |
| GET | `/api/user/get-user` | Get user profile | ✅ |
| GET | `/api/user/logout` | User logout | ✅ |
| POST | `/api/captains/register` | Captain registration | ❌ |
| POST | `/api/captains/login` | Captain login | ❌ |
| GET | `/api/captains/get-captain` | Get captain profile | ✅ |
| GET | `/api/captains/logout` | Captain logout | ✅ |

## 🧪 Testing the API

You can test the API endpoints using tools like:
- **Postman**
- **Insomnia**
- **cURL**
- **Thunder Client (VS Code extension)**

### Example cURL Commands

**User Registration:**
```bash
curl -X POST http://localhost:8001/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Test",
      "lastname": "User"
    },
    "email": "test@example.com",
    "password": "password123"
  }'
```

**User Login:**
```bash
curl -X POST http://localhost:8001/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Request validation using express-validator
- **CORS Protection**: Cross-origin resource sharing configuration
- **HTTP-only Cookies**: Secure cookie storage for JWT tokens
- **Token Blacklisting**: Secure logout with token invalidation

## 🚧 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Note**: This is a backend API for an Uber-like application. Make sure to implement proper frontend applications to consume these APIs and add additional features like ride booking, real-time tracking, and payment processing as needed.
