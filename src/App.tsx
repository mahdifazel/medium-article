import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { CartItem, Product } from './types'

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          cartItemCount={cartItemCount}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<ProductList onAddToCart={addToCart} />} 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart}
                  cartTotal={cartTotal}
                  onClearCart={clearCart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                />
              } 
            />
          </Routes>
        </main>

        {isCartOpen && (
          <Cart
            cart={cart}
            cartTotal={cartTotal}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onCheckout={() => {
              setIsCartOpen(false)
              window.location.href = '/checkout'
            }}
          />
        )}
      </div>
    </Router>
  )
}

export default App