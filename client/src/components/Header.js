import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  
  &:hover {
    text-decoration: none;
    color: #f8f9fa;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  min-width: 300px;
  
  @media (max-width: 768px) {
    min-width: 200px;
    width: 100%;
    order: 3;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #764ba2;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f8f9fa;
    text-decoration: none;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  
  &:hover {
    color: #f8f9fa;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #f8f9fa;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">🛒 SuperMart</Logo>
        
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch />
            </SearchButton>
          </form>
        </SearchContainer>

        <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          
          <CartIcon to="/cart" onClick={() => setIsMenuOpen(false)}>
            <FaShoppingCart />
            {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
          </CartIcon>

          <UserMenu>
            {isAuthenticated ? (
              <>
                <span>Hello, {user.name}</span>
                <UserButton onClick={handleLogout}>Logout</UserButton>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  <FaUser style={{ marginRight: '0.5rem' }} />
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
              </>
            )}
          </UserMenu>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;