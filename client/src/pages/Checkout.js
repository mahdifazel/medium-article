import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard, FaLock, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutContainer = styled.div`
  max-width: 1200px;
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

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CheckoutForm = styled.form`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #dc3545;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const OrderSummary = styled.div`
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

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.span`
  font-weight: 500;
  color: #333;
`;

const ItemQuantity = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ItemPrice = styled.span`
  font-weight: bold;
  color: #28a745;
`;

const OrderTotal = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
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

const SecurityNotice = styled.div`
  background: #e8f4fd;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #0c5460;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Checkout = () => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handlePaymentInfoChange = (e) => {
    let value = e.target.value;
    
    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(.{2})(.{2})/, '$1/$2');
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    // Format CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substring(0, 3);
    }

    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: value
    });
    
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate customer info
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.state.trim()) newErrors.state = 'State is required';
    if (!customerInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Validate payment info
    if (!paymentInfo.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required';
    if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
    if (!paymentInfo.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';

    // Validate card number length
    if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Validate CVV length
    if (paymentInfo.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerInfo: {
          ...customerInfo,
          email: user?.email || customerInfo.email
        },
        paymentInfo: {
          // In a real app, this would be securely processed
          cardLast4: paymentInfo.cardNumber.slice(-4),
          cardholderName: paymentInfo.cardholderName
        }
      };

      const response = await axios.post('/api/checkout', orderData);
      
      toast.success('Order placed successfully!');
      clearCart();
      
      // In a real app, you would redirect to an order confirmation page
      navigate('/', { 
        state: { 
          message: `Order #${response.data.order.id} placed successfully! Total: $${response.data.order.total}` 
        }
      });
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <CheckoutContainer>
        <PageHeader>
          <PageTitle>Your cart is empty</PageTitle>
          <p>Add some items to your cart before proceeding to checkout.</p>
        </PageHeader>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <PageHeader>
        <PageTitle>Checkout</PageTitle>
      </PageHeader>

      <CheckoutGrid>
        <CheckoutForm onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>
              <FaUser />
              Customer Information
            </SectionTitle>
            
            <FormGrid>
              <FormGroup>
                <Label>First Name *</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleCustomerInfoChange}
                  className={errors.firstName ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Last Name *</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleCustomerInfoChange}
                  className={errors.lastName ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  value={user?.email || customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  className={errors.email ? 'error' : ''}
                  disabled={!!user?.email}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfoChange}
                  className={errors.phone ? 'error' : ''}
                  required
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>
              <FaMapMarkerAlt />
              Delivery Address
            </SectionTitle>
            
            <FormGrid>
              <FormGroup className="full-width">
                <Label>Street Address *</Label>
                <Input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                  className={errors.address ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>City *</Label>
                <Input
                  type="text"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleCustomerInfoChange}
                  className={errors.city ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>State *</Label>
                <Select
                  name="state"
                  value={customerInfo.state}
                  onChange={handleCustomerInfoChange}
                  className={errors.state ? 'error' : ''}
                  required
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  {/* Add more states as needed */}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>ZIP Code *</Label>
                <Input
                  type="text"
                  name="zipCode"
                  value={customerInfo.zipCode}
                  onChange={handleCustomerInfoChange}
                  className={errors.zipCode ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup className="full-width">
                <Label>Special Instructions</Label>
                <TextArea
                  name="specialInstructions"
                  value={customerInfo.specialInstructions}
                  onChange={handleCustomerInfoChange}
                  placeholder="Any special delivery instructions..."
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>
              <FaCreditCard />
              Payment Information
            </SectionTitle>
            
            <FormGrid>
              <FormGroup className="full-width">
                <Label>Card Number *</Label>
                <Input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Expiry Date *</Label>
                <Input
                  type="text"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentInfoChange}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>CVV *</Label>
                <Input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInfoChange}
                  placeholder="123"
                  className={errors.cvv ? 'error' : ''}
                  required
                />
              </FormGroup>
              
              <FormGroup className="full-width">
                <Label>Cardholder Name *</Label>
                <Input
                  type="text"
                  name="cardholderName"
                  value={paymentInfo.cardholderName}
                  onChange={handlePaymentInfoChange}
                  className={errors.cardholderName ? 'error' : ''}
                  required
                />
              </FormGroup>
            </FormGrid>
            
            <SecurityNotice>
              <FaLock />
              Your payment information is secure and encrypted
            </SecurityNotice>
          </Section>

          {Object.keys(errors).length > 0 && (
            <ErrorMessage>
              Please correct the errors above before placing your order.
            </ErrorMessage>
          )}
        </CheckoutForm>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          {cart.map(item => (
            <OrderItem key={item.id}>
              <ItemDetails>
                <ItemName>{item.product.name}</ItemName>
                <br />
                <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
              </ItemDetails>
              <ItemPrice>${(item.product.price * item.quantity).toFixed(2)}</ItemPrice>
            </OrderItem>
          ))}
          
          <OrderTotal>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </OrderTotal>

          <PlaceOrderButton onClick={handleSubmit} disabled={loading}>
            {loading ? (
              'Processing...'
            ) : (
              <>
                <FaCheck />
                Place Order
              </>
            )}
          </PlaceOrderButton>
        </OrderSummary>
      </CheckoutGrid>
    </CheckoutContainer>
  );
};

export default Checkout;