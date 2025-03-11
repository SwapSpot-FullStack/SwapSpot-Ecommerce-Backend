# SwapSpot Ecommerce (Backend)

This is the backend API for SwapSpot, a marketplace platform. It provides authentication, user management, listings, transactions, and messaging services.

Built with:
- **Node.js & Express** Backend Framework
- **MongoDB** Database
- **JWT Authentication** secure user sessions

## Features
- User authentication (Register/Login)
- Create, update, and delete listings
- Messaging system between users
- Secure transactions and payments
- API documentation with Postman

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/SwapSpot-Tech/swapspot-backend.git
   cd swapspot-backend

2. Install dependencies:
    ```bash
    pnpm install

3. Set up environment variables:
- Create a .env file in the root directory
- Add the following:
    ```bash
    PORT=5001
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/swapspot
    JWT_SECRET=your_jwt_secret

4. Start the server:
    ```bash
    pnpm run dev
- Server will run at http://localhost:5001/

## Testing API with Postman
1. Install [Postman](https://www.postman.com/downloads/)
2. Import the provided **Postman Collection** (coming soon).
3. Test the API endpoints!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author
[Declan Whitty](https://github.com/declan-whitty)

## Collaborators
[Niklas Frost](https://github.com/nikthebest3)