# 🛒 SuperMart - Shopping App for Supermarket

A modern, full-stack shopping application built with React and Node.js, designed for supermarket online shopping with a beautiful UI and seamless user experience.

![SuperMart](https://img.shields.io/badge/SuperMart-Shopping%20App-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Styled Components](https://img.shields.io/badge/Styled-Components-pink)

## ✨ Features

### 🎯 Core Features
- **Product Catalog** - Browse products by categories with search and filtering
- **Shopping Cart** - Add, remove, and update product quantities
- **User Authentication** - Register and login with secure authentication
- **Checkout Process** - Complete order flow with customer and payment information
- **Responsive Design** - Optimized for both desktop and mobile devices

### 🔧 Technical Features
- **Modern React** - Built with React 18 and functional components
- **Context API** - State management for cart and authentication
- **Styled Components** - Beautiful, responsive UI with CSS-in-JS
- **Express API** - RESTful backend with comprehensive endpoints
- **Form Validation** - Client-side validation with user feedback
- **Toast Notifications** - Real-time feedback for user actions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supermarket-shopping-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both client and server.

3. **Start the development servers**
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and React client (port 3000).

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📁 Project Structure

```
supermarket-shopping-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles
│   │   └── App.js          # Main App component
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🛠 Available Scripts

### Root Directory
- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start only the React client
- `npm run server` - Start only the Express server
- `npm run build` - Build the React app for production
- `npm run install-all` - Install dependencies for both client and server

### Client Directory
- `npm start` - Start the React development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Directory
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## 🏗 Architecture

### Frontend (React)
- **Component-based architecture** with reusable UI components
- **Context API** for global state management (cart, authentication)
- **React Router** for client-side routing
- **Styled Components** for component-level styling
- **Axios** for API communication

### Backend (Node.js/Express)
- **RESTful API** with organized endpoints
- **In-memory data storage** (easily replaceable with database)
- **CORS enabled** for cross-origin requests
- **Express middleware** for JSON parsing and static files

## 📱 Pages & Components

### Pages
- **Home** - Hero section, features, and featured products
- **Products** - Product catalog with search, filtering, and sorting
- **Cart** - Shopping cart management with quantity controls
- **Checkout** - Order form with customer and payment information
- **Login** - User authentication with demo credentials
- **Register** - User registration with form validation

### Key Components
- **Header** - Navigation with search, cart icon, and user menu
- **ProductCard** - Reusable product display component
- **GlobalStyle** - Global CSS styles using styled-components

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filtering)
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get all product categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process order and payment

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

## 🎨 Design System

### Colors
- **Primary**: `#667eea` (Purple-blue gradient)
- **Secondary**: `#764ba2` (Purple)
- **Success**: `#28a745` (Green)
- **Danger**: `#dc3545` (Red)
- **Background**: `#f8f9fa` (Light gray)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headings**: Bold weights with appropriate sizing
- **Body**: Regular weight with good line height for readability

### Components
- **Cards**: Rounded corners (15px) with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states and validation

## 🔒 Authentication

The app includes a simple authentication system:

### Demo Credentials
- **Email**: `demo@supermart.com`
- **Password**: `demo123`

### Features
- User registration with password strength validation
- Secure login with form validation
- Persistent authentication using localStorage
- Protected checkout flow (requires login)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+) - Full layout with sidebar elements
- **Tablet** (768px-1199px) - Adapted grid layouts
- **Mobile** (< 768px) - Single column layouts with mobile-friendly navigation

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify/Vercel** (Frontend) + **Heroku** (Backend)
- **Docker** containers for both services
- **AWS** with S3 (frontend) + EC2/Lambda (backend)

## 🔮 Future Enhancements

### Potential Features
- **Database Integration** - Replace in-memory storage with MongoDB/PostgreSQL
- **Payment Processing** - Integrate with Stripe/PayPal
- **Order History** - User order tracking and history
- **Product Reviews** - Customer reviews and ratings
- **Admin Panel** - Product and order management
- **Email Notifications** - Order confirmations and updates
- **Push Notifications** - Real-time updates
- **Multi-language Support** - Internationalization

### Technical Improvements
- **TypeScript** - Type safety and better development experience
- **Testing** - Unit and integration tests with Jest/Testing Library
- **PWA** - Progressive Web App capabilities
- **Performance** - Code splitting and lazy loading
- **SEO** - Server-side rendering with Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shopping App Developer**
- Built with ❤️ for modern e-commerce experience
- Focused on user experience and clean code

## 🙏 Acknowledgments

- React team for the amazing framework
- Styled Components for beautiful styling solutions
- React Icons for comprehensive icon library
- Express.js for the robust backend framework

---

**Happy Shopping! 🛍️**