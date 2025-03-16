# SwapSpot Ecommerce (Backend)

Welcome! This is the backend API part of my full stack web application SwapSpot. SwapSpot is intended to be a marketplace platform. In here you will find provides authentication, user management, listings, transactions, and messaging services.

## Built with:

- **Node.js & Express** Backend Framework
- **MongoDB** NoSQL Database
- **JWT Authentication** Secure User Sessions
- **Express-Validator** Data Validation
- **CORS** Secure Cross-Origin Requests

## Code Style & Best Practices

- This project follows the **[JavaScript Standard Style](https://standardjs.com/)**.
- DRY (Don’t Repeat Yourself) principles are applied by using **modular controllers, middleware, and reusable functions**.

## Technologies Used

SwapSpot's backend is built using various technologies. Below is an overview of why each technology was chosen, industry examples, pros & cons and licensing:

### **Backend Framework: Node.js & Express**

| Feature          | **Node.js & Express** (Used)                  | **Flask/Django (Alternative)**            |
| ---------------- | --------------------------------------------- | ----------------------------------------- |
| **Why?**         | Fast, non-blocking, great for APIs            | Flask is minimal, Django is full-featured |
| **Industry Use** | Used by Netflix, LinkedIn, PayPal             | Used by Instagram, Spotify                |
| **Pros**         | High performance, scalable, easy to integrate | Strong security, built-in admin panel     |
| **Cons**         | Lacks built-in database integration           | Slower for real-time apps                 |
| **License**      | MIT License                                   | BSD License (Django), MIT License (Flask) |

### **Database: MongoDB**

| Feature          | **MongoDB (Used)**                    | **PostgreSQL/MySQL (Alternative)**                |
| ---------------- | ------------------------------------- | ------------------------------------------------- |
| **Why?**         | Flexible document-based storage       | SQL databases with structured schema              |
| **Industry Use** | Uber, eBay, Twitter                   | Facebook, Instagram                               |
| **Pros**         | Scalable, great for unstructured data | Strong ACID compliance, better for financial apps |
| **Cons**         | Less strict schema                    | Slower for large NoSQL datasets                   |
| **License**      | SSPL License                          | PostgreSQL: Open-source, MySQL: GPL               |

### **Authentication: JSON Web Tokens (JWT)**

| Feature          | **JWT (Used)**                    | **OAuth2 (Alternative)**                   |
| ---------------- | --------------------------------- | ------------------------------------------ |
| **Why?**         | Stateless, fast                   | OAuth2 allows third-party authentication   |
| **Industry Use** | Used in APIs for session security | Google, Facebook logins                    |
| **Pros**         | Lightweight, easy to use          | More secure for third-party logins         |
| **Cons**         | No built-in session revocation    | Requires external authentication providers |
| **License**      | MIT License                       | OpenID Connect                             |

### **Validation: express-validator**

| Feature          | **express-validator (Used)**                    | **Joi (Alternative)**                 |
| ---------------- | ----------------------------------------------- | ------------------------------------- |
| **Why?**         | Validates user input directly in Express routes | More customizable schema validation   |
| **Industry Use** | Common in production apps                       | Used in enterprise-level applications |
| **Pros**         | Simple syntax, integrates easily                | Strong type enforcement               |
| **Cons**         | Requires manual integration                     | Higher learning curve                 |
| **License**      | MIT License                                     | MIT License                           |

### **Middleware: CORS**

| Feature          | **CORS (Used)**                           | **Manual Header Setup (Alternative)**    |
| ---------------- | ----------------------------------------- | ---------------------------------------- |
| **Why?**         | Enables secure cross-origin requests      | Developers manually set security headers |
| **Industry Use** | Used in all major web-based APIs          | Not recommended for scalable apps        |
| **Pros**         | Easy setup, better security               | More control over request restrictions   |
| **Cons**         | Can be overly permissive if misconfigured | Requires manual implementation           |
| **License**      | MIT License                               | N/A                                      |

## Features

- User authentication (Register/Login)
- Create, update, and delete listings
- Messaging system between users
- Secure transactions and payments
- Error handling & validation
- API documentation with Postman

## Error Handling

- I have used **custom error middleware** to handle **400, 401, 403, 404, and 500 status codes**.
- Errors are logged using **console logging for debugging**.
- Incorrect input is caught via **express-validator** before reaching the database.

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/SwapSpot-Tech/swapspot-backend.git
   cd swapspot-backend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Set up environment variables:

- Create a .env file in the root directory
- Add the following:
  ```bash
  PORT=5001
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/swapspot
  JWT_SECRET=your_jwt_secret
  ```

4. Start the server:
   ```bash
   npm run dev
   ```

- Server will run at http://localhost:5001/

## Testing API with Postman

1. Install [Postman](https://www.postman.com/downloads/)
2. Import the provided **Postman Collection** (coming soon).
3. Test the API endpoints!

## Licensing

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

[Declan Whitty](https://github.com/declan-whitty)

## Collaborators

[Niklas Frost](https://github.com/nikthebest3)
