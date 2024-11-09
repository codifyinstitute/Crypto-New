import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import logoM1 from './../assets/logo2.png'
import logoM from './../assets/logo2.png'

import { Link, useNavigate } from 'react-router-dom';
import HomeContact from './HomeContact';
import axios from 'axios';
import { ChevronLeft  } from 'lucide-react';
import {  ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: fit-content;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding: 20px;
  /* padding-top: 140px; */
  @media (max-width: 480px) {
  padding-top: 80px;

  }
`;
const Moon = styled.img`
width: 25%;

`;
const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 20px;
  width: 380px;
  /* height: 610px; */
  color: black;
  // margin-bottom: 240px;
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-weight:700 ;
  font-size: 22px;
`;

const Logo = styled.img`
display: inline-block; /* Ensure it's aligned with the text */
  vertical-align: middle; /* Align vertically with the text */
  width: 25%; /* Adjust the size of the logo */
  margin-left: 40px; 
  margin-bottom: 20px;
  width: 70%;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
  margin: 10px auto;

  a{
    color: blue;
    font-weight: 800;
    text-decoration: none;
    display: contents;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffa500;
  color: black;
  border: none;
  font-size: 20px;
  font-weight: 700;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const PoweredBy = styled.p`
  font-size: 13px;
  color: #666;
  text-align: center;
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffa500;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Boxx = styled.div`
  margin-bottom: 32%;

  @media (max-width: 380px) {
    margin-bottom: 32%;
  }
`;

const Boo = styled.div``;

const Forg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #FFA500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  /* z-index: 1001; */
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Sell2 = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const  [countryCode, setCountryCode] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email !== '' && phone.length === 10 && isChecked;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleCountryCode = (e) => {
    const inputValue = e.target.value;
    
    // Remove the '+' sign for validation
    const numericValue = inputValue.replace('+', '');
    
    // Allow only digits and limit to 10 digits
    if (/^\d{0,10}$/.test(numericValue)) {
      setCountryCode(numericValue);
    }
  }; 

  const handleProceed = async () => {
    if (isFormValid) {
      setLoading(true);
      const fullPhoneNumber = `+${countryCode}${phone}`;  
      console.log("mnumber",fullPhoneNumber);
      try {
        const response = await axios.post('https://api.moonpayx.com/users/login', { Email: email, MobileNo: fullPhoneNumber });
        if (response.status === 200) {
          navigate('/otp', { state: { email: email, phone: fullPhoneNumber } });
        }
        console.log( "login data",response.data)
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Invalid email, phone number, or server error. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a valid email, phone number, and agree to the terms.");
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>
          <TabContainer>
            <BackButton onClick={() => navigate('/')}>
              <ChevronLeft />
            </BackButton>
            <Tab active>Login To Moon Pay</Tab>
          </TabContainer>
          <Logo src ={logoM1}/>
          {/* <Subtitle>Checkout with Moon Pay</Subtitle> */}

          <Forg>
            <Boxx>
              <Label>What is your Email Address?</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <Label>What is your Phone Number?</Label>
              <Input
                type="tel"
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={handlePhoneChange}
              /> */}
              <Label>What is your Phone Number?</Label>
<div style={{ display: 'flex', alignItems: 'center' }}>
<Input
  type="tel"
  placeholder="    ISD"
  value={countryCode ? `+${countryCode}` : ''} // Display the '+' symbol
  onChange={handleCountryCode}
  style={{ width: '80px', marginRight: '10px' }} // Adjust width and margin as needed
/>
  <Input
    type="tel"
    placeholder="Phone Number"
    value={phone}
    onChange={handlePhoneChange}
    style={{ flex: 1 }} // This will allow it to take the remaining space
  />
</div>
              
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I have read and agree to Moon Pay's <Link to='/terms'>Terms  and conditions</Link> Of services and <Link to='/TandC'>Privacy Policy.</Link>
              </CheckboxLabel>
            </Boxx>
            <Boo>
              <Button type="button" disabled={!isFormValid || loading} onClick={handleProceed}>
                {loading ? <LoadingSpinner /> : 'Login'}<ChevronRight />
              </Button>
              <PoweredBy>
              Powered by <Moon src={logoM}/>
            </PoweredBy>
            </Boo>
          </Forg>
        </Card>
      </PageContainer>
      {/* <HomeContact /> */}
      <Footer />
      <ToastContainer />
    </>
  );
};




export default Sell2;
