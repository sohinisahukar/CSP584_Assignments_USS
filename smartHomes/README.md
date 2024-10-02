SmartHomes Web Application
Overview
SmartHomes is an online retail platform for smart home products, allowing users to browse, purchase, and review a variety of smart home products. The platform includes features such as:

-User authentication (signup and login).
-Shopping cart and checkout system.
-Writing product reviews.
-Displaying top-rated products and trending products by sales.
-Admin (Store Manager) functionalities to add, edit, or delete products.

Technologies Used
-Frontend: React.js
-Backend: Node.js, Express.js
-Database:
 -MySQL: For product, store, order, and customer information.
 -MongoDB: For handling product reviews.
-ORM: Sequelize for MySQL
-Mongoose: For MongoDB
-Charts: Recharts for displaying visual data

Prerequisites
Node.js: Ensure you have Node.js installed (v14 or later).
MySQL: Ensure MySQL is installed and running.
MongoDB: You need a MongoDB instance or cluster (local or cloud).

Setup Instructions
1. Clone the repository
    git clone https://github.com/your-username/smarthomes.git
    cd smarthomes
2. Backend Setup (Node.js + Express + Sequelize + MongoDB)
   Navigate to the backend folder:
    cd sh-backend
   Install backend dependencies:
    npm install

Configure environment variables: Create a .env file in the sh-backend folder with the following contents:

PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=smarthomes
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/smarthomes?retryWrites=true&w=majority

Initialize the MySQL database and create tables:
npx sequelize-cli db:migrate

Run the backend server:
npm start
The backend will now be running on http://localhost:5000.

3. Frontend Setup (React.js)
Navigate to the frontend folder:
cd ../sh-frontend

Install frontend dependencies:
npm install

Run the frontend development server:
npm start
The frontend will now be running on http://localhost:3000.

4. Accessing the Application
-Ensure both the backend (http://localhost:5000) and frontend (http://localhost:3000) servers are running.
-Open your browser and visit http://localhost:3000 to access the SmartHomes web application.

Application Features
1. User Authentication
Users can sign up, log in, and access their account details.
2. Product Browsing
View products by category, and see trending products and top-rated products using charts.
3. Shopping Cart & Checkout
Add products to the shopping cart and proceed to checkout with various payment and shipping options.
4. Product Reviews
Users can write and submit reviews for purchased products.
5. Admin Features (Store Manager)
Admins can add, edit, and delete products directly from the platform.
Available API Endpoints
Here are some of the key API endpoints that the application uses:

Authentication
POST /api/auth/login: Log in a user.
POST /api/auth/signup: Register a new user.
Products
GET /api/products: Fetch all products.
GET /api/products/productId/:id: Fetch a product by its ID.
POST /api/products: Add a new product (Admin only).
PUT /api/products/:id: Update a product (Admin only).
DELETE /api/products/:id: Delete a product (Admin only).
Reviews
POST /api/reviews/submitReview: Submit a new review.
GET /api/reviews/topProductsByRating: Fetch top-rated products.
Orders
POST /api/orders/createOrder: Create a new order.
GET /api/orders/userOrders/:userId: Fetch orders for a specific user.

Deployment
For deployment, ensure your MySQL and MongoDB databases are hosted on a cloud provider or a production server.
You can deploy the React frontend using services like Vercel, Netlify, or any other static hosting service.
For deploying the backend, services like Heroku, AWS, or DigitalOcean are good choices for Node.js applications.

License
This project is licensed under the MIT License.