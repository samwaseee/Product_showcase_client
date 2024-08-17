# Product Showcase

Welcome to the GitHub repository of Product Showcase, a platform designed to present and manage products efficiently.  
> **[Live site](https://product-showcase-82903.web.app)**       **[Server side repo](https://github.com/samwaseee/Product_showcase_server)**

## Introduction
Product Showcase is a web application that allows users to explore and interact with a wide range of products. The platform provides advanced features for searching, filtering, sorting, and managing product information, ensuring a seamless experience for users.

## Features
1. **Pagination**: 
   - Efficiently load products with server-side pagination.
   - Navigate through pages using page numbers and navigation buttons (Next, Previous).

2. **Searching**:
   - Search for products by name to quickly find desired items.

3. **Categorization**:
   - Products are categorized into:
     - Brand Name
     - Category Name
     - Price Range
   - Users can filter products using one or multiple criteria simultaneously, such as brand name, category name, and price range.

4. **Sorting**:
   - Sort products based on:
     - Price: Low to High, High to Low
     - Date Added: Newest first

5. **Authentication**:
   - Google Authentication using Firebase.
   - Email and Password Authentication using Firebase.

6. **UI Instructions**:
   - Mobile-first, fully responsive design.
   - Fixed-size product cards to display concise product information.
   - Navbar with website name/logo and relevant routes.
   - Footer with essential information and links.

## Technologies Used
- **Frontend**: The frontend is built using ReactJS, with a focus on responsive design and user experience. Styling is managed with HTML and CSS, incorporating CSS libraries to enhance the visual appeal.
- **Backend**: The backend is developed using Node.js and Express.js, providing a reliable and scalable server environment. Express.js enables flexible routing and middleware support.
- **Database**: MongoDB is used for data storage, offering a NoSQL database with JSON-like document storage and optional schemas.

## Setup and Installation
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/samwaseee/Product_showcase_client
   ```
2. Navigate to the project directory.
   ```bash
   cd product-showcase
   ```
3. Install the necessary dependencies.
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and define the required environment variables:
   - `VITE_APIKEY`: Your Firebase API key.
   - `VITE_AUTHDOMAIN`: Your Firebase Auth domain.
   - `VITE_PROJECTID`: Your Firebase project ID.
   - `VITE_STORAGEBUCKET`: Your Firebase storage bucket.
   - `VITE_MESSAGINGSENDERID`: Your Firebase messaging sender ID.
   - `VITE_APPID`: Your Firebase app ID.
   - `VITE_IMAGE_HOSTING_KEY`: Your image hosting service key.
   - `VITE_PAYMENT_GATEWAY_PK`: Your payment gateway public key.

5. Start the server.
   ```bash
   npm start
   ```

## Usage
After setting up the project, navigate to the specified localhost port in your browser to view the application. Explore the features by browsing through products, applying filters, searching, sorting, and utilizing authentication options.

Feel free to contribute, provide feedback, or report issues via the repository's issue tracker. Enjoy exploring Product Showcase!