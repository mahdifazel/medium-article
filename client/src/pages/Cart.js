import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ItemCategory = styled.span`
  display: inline-block;
  background: #e9ecef;
  color: #6c757d;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #28a745;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    margin: 0;
    justify-content: space-between;
    width: 100%;
  }
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: #f8f9fa;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e9ecef;
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      background: #f8f9fa;
    }
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8d7da;
    transform: scale(1.1);
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #eee;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
    text-decoration: none;
    color: white;
  }
`;

const ClearCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: #dc3545;
  border: 2px solid #dc3545;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dc3545;
    color: white;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const ShoppingIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.5;
`;

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const getCategoryEmoji = (category) => {
    const categoryEmojis = {
      'Fruits': '🍎',
      'Vegetables': '🥕',
      'Dairy': '🥛',
      'Meat': '🥩',
      'Bakery': '🍞',
      'Beverages': '🥤',
      'Snacks': '🍿',
      'Frozen': '🧊'
    };
    return categoryEmojis[category] || '🛍️';
  };

  if (cart.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <ShoppingIcon>🛒</ShoppingIcon>
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to your cart and they will appear here.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <PageHeader>
        <PageTitle>Shopping Cart ({getCartItemsCount()} items)</PageTitle>
      </PageHeader>

      <CartContent>
        <CartItems>
          {cart.map(item => (
            <CartItem key={item.id}>
              <ItemImage>
                {getCategoryEmoji(item.product.category)}
              </ItemImage>
              
              <ItemDetails>
                <ItemName>{item.product.name}</ItemName>
                <ItemCategory>{item.product.category}</ItemCategory>
                <ItemPrice>${item.product.price.toFixed(2)} each</ItemPrice>
              </ItemDetails>

              <QuantityControls>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <FaMinus />
                </QuantityButton>
                
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <FaPlus />
                </QuantityButton>

                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </RemoveButton>
              </QuantityControls>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {cart.map(item => (
            <SummaryRow key={item.id}>
              <span>{item.product.name} x{item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </SummaryRow>
          ))}
          
          <SummaryRow>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </SummaryRow>

          <CheckoutButton onClick={handleCheckout}>
            <FaShoppingBag style={{ marginRight: '0.5rem' }} />
            Proceed to Checkout
          </CheckoutButton>

          <ClearCartButton onClick={clearCart}>
            Clear Cart
          </ClearCartButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;