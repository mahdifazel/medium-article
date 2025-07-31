import { Product } from '../types'

export const products: Product[] = [
  {
    id: 1,
    name: "Fresh Organic Bananas",
    description: "Sweet and ripe organic bananas, perfect for smoothies or snacking",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    category: "Fruits",
    inStock: true,
    unit: "bunch"
  },
  {
    id: 2,
    name: "Whole Grain Bread",
    description: "Freshly baked whole grain bread with seeds and nuts",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    category: "Bakery",
    inStock: true,
    unit: "loaf"
  },
  {
    id: 3,
    name: "Organic Milk",
    description: "Fresh organic whole milk from grass-fed cows",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    category: "Dairy",
    inStock: true,
    unit: "gallon"
  },
  {
    id: 4,
    name: "Free Range Eggs",
    description: "Large free-range eggs from happy chickens",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop",
    category: "Dairy",
    inStock: true,
    unit: "dozen"
  },
  {
    id: 5,
    name: "Organic Spinach",
    description: "Fresh organic spinach leaves, perfect for salads",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    category: "Vegetables",
    inStock: true,
    unit: "bag"
  },
  {
    id: 6,
    name: "Grass-Fed Beef",
    description: "Premium grass-fed ground beef, 85% lean",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    category: "Meat",
    inStock: true,
    unit: "lb"
  },
  {
    id: 7,
    name: "Wild Salmon",
    description: "Fresh wild-caught Alaskan salmon fillets",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    category: "Seafood",
    inStock: true,
    unit: "lb"
  },
  {
    id: 8,
    name: "Quinoa",
    description: "Organic quinoa, a complete protein source",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    category: "Grains",
    inStock: true,
    unit: "lb"
  },
  {
    id: 9,
    name: "Avocados",
    description: "Ripe Hass avocados, perfect for guacamole",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    category: "Fruits",
    inStock: true,
    unit: "pack"
  },
  {
    id: 10,
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt with live cultures",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    category: "Dairy",
    inStock: true,
    unit: "container"
  },
  {
    id: 11,
    name: "Sweet Potatoes",
    description: "Organic sweet potatoes, rich in vitamins",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    category: "Vegetables",
    inStock: true,
    unit: "lb"
  },
  {
    id: 12,
    name: "Chicken Breast",
    description: "Boneless, skinless chicken breast",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
    category: "Meat",
    inStock: true,
    unit: "lb"
  }
]

export const categories = [
  { id: "all", name: "All Products", icon: "🛒" },
  { id: "fruits", name: "Fruits", icon: "🍎" },
  { id: "vegetables", name: "Vegetables", icon: "🥬" },
  { id: "dairy", name: "Dairy", icon: "🥛" },
  { id: "meat", name: "Meat", icon: "🥩" },
  { id: "seafood", name: "Seafood", icon: "🐟" },
  { id: "bakery", name: "Bakery", icon: "🍞" },
  { id: "grains", name: "Grains", icon: "🌾" }
]