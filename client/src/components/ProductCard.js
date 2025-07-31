import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background: #dee2e6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #6c757d;
`;

const StockBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.inStock ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
`;

const ProductCategory = styled.span`
  display: inline-block;
  background: #e9ecef;
  color: #6c757d;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
`;

const QuantityBadge = styled.span`
  background: #f8f9fa;
  color: #6c757d;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product.id, 1);
    }
  };

  // Function to get category emoji
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

  return (
    <Card>
      <ImageContainer>
        {product.image ? (
          <ProductImage src={product.image} alt={product.name} />
        ) : (
          <ImagePlaceholder>
            {getCategoryEmoji(product.category)}
          </ImagePlaceholder>
        )}
        <StockBadge inStock={product.inStock}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </StockBadge>
      </ImageContainer>
      
      <CardContent>
        <ProductName>{product.name}</ProductName>
        <ProductCategory>{product.category}</ProductCategory>
        <ProductDescription>{product.description}</ProductDescription>
        
        <PriceSection>
          <Price>${product.price.toFixed(2)}</Price>
          <QuantityBadge>{product.quantity} left</QuantityBadge>
        </PriceSection>
        
        <AddToCartButton 
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <FaShoppingCart />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </AddToCartButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;