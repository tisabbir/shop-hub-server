# Backend - ShopHub

This is the backend service for the ShopHub project, a single-page e-commerce application that allows users to browse, filter, search, and sort products.

## **1. Project Description**

The backend service is built using Node.js and Express.js and uses MongoDB for data storage. It provides RESTful APIs to handle product data, user authentication, and more. This service is designed to support features like pagination, filtering, searching, and sorting.

## **2. Setup Instructions**

### **2.1. Prerequisites**

Ensure you have the following installed:
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB

### **2.2. Installation Steps**

1. **Clone the Repository**:
   - Clone this repository to your local machine using:
     ```
     git clone <repository-url>
     ```

2. **Install Dependencies**:
   - Navigate to the backend directory and run:
     ```
     npm install
     ```

3. **Create a `.env` file**:
   - In the root directory of the backend, create a `.env` file with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ```

4. **Start the Server**:
   - Run the following command to start the backend server:
     ```
     npm start
     ```
   - The server will run on `http://localhost:5000`.

## **3. API Documentation**

### **3.1. Base URL**

All API requests are prefixed with:


### **3.2. Endpoints**

- **GET /products**
  - Retrieves a paginated list of products.
  - **Query Parameters**:
    - `page`: Page number (default: 1)
    - `limit`: Number of products per page (default: 10)
    - `search`: Search query for product names (optional)
    - `category`: Filter by product category (optional)
    - `brand`: Filter by product brand (optional)
    - `minPrice`: Filter products by minimum price (optional)
    - `maxPrice`: Filter products by maximum price (optional)
    - `sortBy`: Sort products by price or date added (optional, values: `price`, `date`)
    - `order`: Order of sorting (`asc` for ascending, `desc` for descending)

- **POST /products**
  - Adds a new product to the database.
  - **Body Parameters**:
    - `name`: Name of the product (string, required)
    - `image`: URL of the product image (string, required)
    - `description`: Description of the product (string, required)
    - `price`: Price of the product (number, required)
    - `category`: Category of the product (string, required)
    - `brand`: Brand of the product (string, required)
    - `ratings`: Ratings of the product (number, required)
    - `dateAdded`: Date when the product was added (ISO string, required)

- **GET /products/:id**
  - Retrieves the details of a single product by its ID.

- **PUT /products/:id**
  - Updates the details of a product by its ID.

- **DELETE /products/:id**
  - Deletes a product by its ID.

## **4. Usage Details**

### **4.1. Running the Server**

- After setting up the project, you can run the server using: nmp start
