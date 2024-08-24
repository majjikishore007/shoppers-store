# 🛒 Shoppers Store - E-commerce Platform

<div align="center">
  <h3>
    <a href="https://shoppersstore.vercel.app/" target="_blank">
      🌐 Live Demo
    </a>
    &nbsp;|&nbsp;
    <a href="https://github.com/yourusername/Shoppers Store" target="_blank">
      📂 Repository
    </a>
  </h3>
</div>

<p align="center">
  <img src="img/Screenshot%20from%202022-03-14%2017-07-48.png" alt="Shoppers Store Homepage" width="400px">
  <img src="img/Screenshot%20from%202022-03-14%2017-08-01.png" alt="Shoppers Store Product Page" width="400px">
</p>

## 🚀 Overview

**Shoppers Store** is a full-featured e-commerce web application focused on selling T-shirts. The platform supports essential e-commerce functionalities such as user authentication, product management, cart and order management, and payment processing. Whether you are a user looking to purchase T-shirts or an admin managing the store, Shoppers Store provides a seamless experience.

## ✨ Key Features

- **User Authentication:** Secure sign-up and login system, allowing users to browse products and manage their cart.
- **Admin Dashboard:** Full-featured admin panel to create, update, and delete products and categories.
- **Cart & Checkout:** Users can add products to their cart, proceed to checkout, and place orders with integrated payment processing.
- **Payment Gateway:** Integrated with Braintree for secure and smooth payment transactions.
- **Responsive Design:** Fully responsive UI, providing a great experience across all devices.

## 🛠️ Tech Stack

- **Frontend:** React.js, Chakra UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Integration:** Braintree
- **Deployment:** Vercel

## 📸 Screenshots

- **Homepage:** The homepage displays the latest products and categories.
- **Product Page:** Detailed product descriptions with an option to add items to the cart.
- **Cart & Checkout:** Users can view their cart, proceed to checkout, and complete purchases.

<p align="center">
  <img src="img/Screenshot%20from%202022-03-14%2017-07-48.png" alt="Homepage" width="300px">
  <img src="img/Screenshot%20from%202022-03-14%2017-08-01.png" alt="Product Page" width="300px">
</p>

## 🔧 Installation & Setup

Follow the steps below to get a local copy of the project up and running:

### Prerequisites

- **Node.js:** Ensure you have [Node.js](https://nodejs.org/en/) installed.
- **MongoDB:** Install and run [MongoDB](https://www.mongodb.com/) on your local machine.

### Steps to Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Shoppers Store.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Shoppers Store
   ```
3. **Install frontend and backend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. **Setup environment variables:**
   - Create a `.env` file in the `backend` directory and add the necessary environment variables:
     ```bash
     MONGODB_URI=your_mongodb_uri
     BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
     BRAINTREE_PUBLIC_KEY=your_braintree_public_key
     BRAINTREE_PRIVATE_KEY=your_braintree_private_key
     ```
5. **Run the application:**
   ```bash
   npm start
   ```
   - This will start both the frontend and backend servers.

## 🧪 Running Tests

To run tests, use the following command:

```bash
npm run test
```

## 🚀 Deployment

The project is deployed on Vercel for quick access. To deploy your own instance:

1. **Fork the repository.**
2. **Deploy to Vercel:** Follow the [Vercel documentation](https://vercel.com/docs) to deploy the app.


## 🤝 Contributing

Contributions are welcome! Follow the steps below to contribute:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Create a Pull Request.**

## 👤 Author

- **Majji Kishore**  
  - [GitHub](https://github.com/yourusername)  
  - [LinkedIn](https://www.linkedin.com/in/yourusername)

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 💖 Show Your Support

If you found this project helpful, please consider giving it a ⭐️ on GitHub!
