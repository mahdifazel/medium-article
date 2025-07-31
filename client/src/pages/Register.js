import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RegisterContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 20px;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
  
  &.valid {
    border-color: #28a745;
  }
  
  &.invalid {
    border-color: #dc3545;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    color: #333;
  }
`;

const ValidIcon = styled.div`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  color: #28a745;
  z-index: 1;
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 5px;
  font-size: 0.8rem;
  
  ul {
    margin: 0;
    padding-left: 1rem;
    list-style: none;
  }
  
  li {
    color: #dc3545;
    margin: 0.25rem 0;
    
    &.valid {
      color: #28a745;
    }
    
    &::before {
      content: '✗ ';
      margin-right: 0.5rem;
    }
    
    &.valid::before {
      content: '✓ ';
    }
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    const criteria = [
      { label: 'At least 6 characters', valid: password.length >= 6 },
      { label: 'Contains a number', valid: /\d/.test(password) },
      { label: 'Contains a letter', valid: /[a-zA-Z]/.test(password) }
    ];
    return criteria;
  };

  const isPasswordValid = () => {
    return getPasswordStrength().every(criterion => criterion.valid);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      isPasswordValid() &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isPasswordValid()) {
      setError('Please create a stronger password');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registration failed');
    }
    
    setLoading(false);
  };

  const passwordStrength = getPasswordStrength();

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <RegisterTitle>Join SuperMart</RegisterTitle>
          <RegisterSubtitle>Create your account to start shopping</RegisterSubtitle>
        </RegisterHeader>

        <RegisterForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className={formData.name.trim() ? 'valid' : ''}
              required
            />
            {formData.name.trim() && (
              <ValidIcon>
                <FaCheck />
              </ValidIcon>
            )}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={formData.email.includes('@') ? 'valid' : ''}
              required
            />
            {formData.email.includes('@') && (
              <ValidIcon>
                <FaCheck />
              </ValidIcon>
            )}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={isPasswordValid() ? 'valid' : formData.password ? 'invalid' : ''}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
            {isPasswordValid() && (
              <ValidIcon>
                <FaCheck />
              </ValidIcon>
            )}
            {formData.password && (
              <PasswordStrength>
                <ul>
                  {passwordStrength.map((criterion, index) => (
                    <li key={index} className={criterion.valid ? 'valid' : ''}>
                      {criterion.label}
                    </li>
                  ))}
                </ul>
              </PasswordStrength>
            )}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={
                formData.confirmPassword && formData.password === formData.confirmPassword
                  ? 'valid'
                  : formData.confirmPassword
                  ? 'invalid'
                  : ''
              }
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <ValidIcon>
                <FaCheck />
              </ValidIcon>
            )}
          </InputGroup>

          <RegisterButton type="submit" disabled={loading || !isFormValid()}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>
        </RegisterForm>

        <LoginLink>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;