const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for products (in a real app, this would be in a database)
let products = [
  {
    id: 1,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 2.99,
    image: "/images/bananas.jpg",
    description: "Fresh organic bananas, perfect for breakfast",
    inStock: true,
    quantity: 50
  },
  {
    id: 2,
    name: "Whole Milk",
    category: "Dairy",
    price: 3.49,
    image: "/images/milk.jpg",
    description: "Fresh whole milk, 1 gallon",
    inStock: true,
    quantity: 30
  },
  {
    id: 3,
    name: "Bread Loaf",
    category: "Bakery",
    price: 2.79,
    image: "/images/bread.jpg",
    description: "Freshly baked whole wheat bread",
    inStock: true,
    quantity: 25
  },
  {
    id: 4,
    name: "Chicken Breast",
    category: "Meat",
    price: 8.99,
    image: "/images/chicken.jpg",
    description: "Boneless skinless chicken breast, 1 lb",
    inStock: true,
    quantity: 15
  },
  {
    id: 5,
    name: "Tomatoes",
    category: "Vegetables",
    price: 3.99,
    image: "/images/tomatoes.jpg",
    description: "Fresh red tomatoes, 1 lb",
    inStock: true,
    quantity: 40
  },
  {
    id: 6,
    name: "Orange Juice",
    category: "Beverages",
    price: 4.29,
    image: "/images/orange-juice.jpg",
    description: "100% pure orange juice, 64 oz",
    inStock: true,
    quantity: 20
  }
];

let cart = [];
let users = [];

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filteredProducts = products;

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredProducts);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(product => product.category))];
  res.json(categories);
});

// Get cart items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: cart.length + 1,
      productId,
      quantity,
      product
    });
  }

  res.json({ message: 'Item added to cart', cart });
});

// Update cart item quantity
app.put('/api/cart/:id', (req, res) => {
  const { quantity } = req.body;
  const cartItem = cart.find(item => item.id === parseInt(req.params.id));
  
  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== parseInt(req.params.id));
    return res.json({ message: 'Item removed from cart', cart });
  }

  cartItem.quantity = quantity;
  res.json({ message: 'Cart updated', cart });
});

// Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  cart = cart.filter(item => item.id !== parseInt(req.params.id));
  res.json({ message: 'Item removed from cart', cart });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// Process checkout
app.post('/api/checkout', (req, res) => {
  const { customerInfo, paymentInfo } = req.body;
  
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const order = {
    id: Date.now(),
    items: [...cart],
    total: total.toFixed(2),
    customerInfo,
    status: 'confirmed',
    orderDate: new Date().toISOString()
  };

  // Clear cart after successful checkout
  cart = [];

  res.json({ message: 'Order placed successfully', order });
});

// User registration (simplified)
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    password, // In production, this should be hashed
    createdAt: new Date().toISOString()
  };

  users.push(user);
  res.json({ message: 'User registered successfully', user: { id: user.id, name, email } });
});

// User login (simplified)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ 
    message: 'Login successful', 
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});