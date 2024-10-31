

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, RefreshCcw } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomeContact from './HomeContact';
import moneyIcon from '../assets/usdtt.png';
import { AiOutlineHistory } from "react-icons/ai";
import trc20 from '../assets/trc20.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import usdtimg from "./../assets/usdt1-removebg-preview(2).png";
import Bepimg from "./../assets/bep21(1).png";
import trcimg from "./../assets/trc20(1).png";
const WithdrawUSDT = () => {
  const [login, setLogin] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [networkFee, setNetworkFee] = useState(0);
  const [selectNetwork, setSelectNetwork] = useState('TRC20');
  const [isValid, setIsValid] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLogin(!!token);
  }, []);

  useEffect(() => {
    // Check form validity
    const isAddressValid = walletAddress.length >= 6 && walletAddress.length <= 42;
    const isAmountValid = parseFloat(withdrawAmount) > 0;
    setIsFormValid(isAddressValid && isAmountValid);
  }, [walletAddress, withdrawAmount]);

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setWalletAddress(value);

    // Basic validation for wallet address
    if (value.length < 6 || value.length > 42) {
      setAddressError('Wallet address should be between 6 and 42 characters.');
    } else {
      setAddressError('');
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Regular expression to allow only numbers and an optional decimal point
    const validAmountPattern = /^\d*\.?\d*$/;

    // Validate the input against the pattern
    if (validAmountPattern.test(value) || value === '') {
      setWithdrawAmount(value);
      setAmountError(''); // Clear the error if the input is valid

      // Basic validation for withdraw amount
      if (parseFloat(value) <= 0) {
        setAmountError('Withdraw amount should be greater than 0.');
      }
    } else {
      setAmountError('Only numeric values are allowed.');
    }
  };

  // Redirect to '/sell2' if not logged in
  if (!login) {
    navigate('/sell2');
  }


  const handleDepositNowClick = () => {
    if (isValid) {
      const networkData = {
        network: selectNetwork,
        // depositamount: usdt,
      };
      localStorage.setItem('networkDetails', JSON.stringify(networkData));
      const depositData = {
        // depositAmount: usdt,
        // symbol: selectedCurrency.Symbol,
        network: selectNetwork,
      };
      // localStorage.setItem('depositDetails', JSON.stringify(depositData));
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/deposit2', { state: depositData });
      } else {
        navigate('/Sell2');
      }
    }
  };


  const handleTrcClick = () => {
    setSelectNetwork('TRC20');
    setTimeout(() => {
      toast.success("Network changed to TRC20", {
        position: "top-left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          border: "1px solid #f0a500",
          borderRadius: "8px",
          backgroundColor: "#fffdf5",
          padding: "10px",
          width: "90vw", // Full width on mobile
          maxWidth: "300px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }, 1000); // 1-second delay
  };

  const handleBepClick = () => {
    setSelectNetwork('BEP20');
    setTimeout(() => {
      toast.success("Network changed to BEP20", {
        position: "top-left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          border: "1px solid #f0a500",
          borderRadius: "8px",
          backgroundColor: "#fffdf5",
          padding: "10px",
          width: "90vw",
          maxWidth: "300px", // Cap max width for larger screens
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <TradingEnvironment>
        <ExchangeCard>
          <Header>
            <BackButton onClick={handleBackClick}>
              <ChevronLeft />
            </BackButton>
            <TabWrapper>
            <Title>Withdraw USDT</Title>
            </TabWrapper>
            <RefreshButton>
            <AiOutlineHistory onClick={()=>navigate("/withdrawhistory")} style={{ color: '#FFA500', fontSize: '30px' }} />
            </RefreshButton>
          </Header>
          <FormGroup>
            <CurrencyRow>
              <InputLabel>Currency</InputLabel>
              <CurrencyButton className="active">
                <NetworkIcon src={usdtimg} alt="USDT" />
                USDT
              </CurrencyButton>
            </CurrencyRow>
          </FormGroup>
          <FormGroup>
            <NetworkRow>
              <InputLabel>Network</InputLabel>
              <NetworkWrapper>
  {selectNetwork === 'TRC20' ? (

    <ActiveButton onClick={handleTrcClick} style={{ position: "relative" }}>
  <Check strokeWidth={4}
    style={{ 
      position: "absolute",
      bottom: "2px",
      right: "2px",
      backgroundColor: "#FFF176",
      borderRadius: "50%",
      padding: "2px",
      // color: "black",
      color: "#000000",
      width: "16px",
      height: "14px" 
    }} 
  />
  <img src={trcimg} alt="TRC20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
  TRC20
</ActiveButton>

  ) : (
    <InactiveButton onClick={handleTrcClick}>
             <img src={trcimg} alt="TRC20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
      TRC20
    </InactiveButton>
  )}
  {selectNetwork === 'BEP20' ? (
    <ActiveButton onClick={handleBepClick} style={{ position: "relative" }}>
         <Check strokeWidth={3}
    style={{ 
      position: "absolute",
      bottom: "2px",
      right: "2px",
      backgroundColor: "#FFF176",
      borderRadius: "50%",
      padding: "2px",
      // color: "black",
      color: "#000000",
      width: "16px",
      height: "14px" 
    }} 
  />
  {/* <Check color="#f9f06b" strokeWidth={3} /> */}
      <img src={Bepimg} alt="BEP20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />

      BEP20
    </ActiveButton>
  ) : (
    <InactiveButton onClick={handleBepClick}>
          
          <img src={Bepimg} alt="BEP20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />

      BEP20
    </InactiveButton>
  )}
</NetworkWrapper>
            
            </NetworkRow>
          </FormGroup>
          <FormGroup>
            <InputLabel>Wallet address</InputLabel>
            <StyledInput
              type="text"
              placeholder="Please enter your address"
              value={walletAddress}
              onChange={handleAddressChange}
            />
            {addressError && <ErrorText>{addressError}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <InputLabel>Withdraw amount</InputLabel>
            <AmountInput>
              <StyledInput
                type="text"
                placeholder="Please enter the amount"
                value={withdrawAmount}
                onChange={handleAmountChange}
              />
              <CurrencyLabel>
                <MoneyIcon src={usdtimg} alt="USDT" />
                <BoldText>USDT</BoldText>
              </CurrencyLabel>
            </AmountInput>
            {amountError && <ErrorText>{amountError}</ErrorText>}
          </FormGroup>
          {/* <BalanceInfo> */}
            {/* <Available>Available: 0 
              
               <BoldText>USDT</BoldText>
         
            </Available> */}
            {/* <Fee>Refund Fee: 1 <BoldText>USDT</BoldText></Fee> */}
          {/* </BalanceInfo> */}
          <CurrencyRow>
              <InputLabel>Available</InputLabel>
              <CurrencyButton className="active">
                <NetworkIcon src={usdtimg} alt="USDT" />
                
                <span> 100 </span> USDT
              </CurrencyButton>
            </CurrencyRow>
          <ProceedButton disabled={!isFormValid}>Confirm</ProceedButton>
        </ExchangeCard>
      </TradingEnvironment>
      <HomeContact />
      <Footer />
    </>
  );
};

export default WithdrawUSDT;

// Styled components based on the provided CSS
const TradingEnvironment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  @media (max-width: 480px) {
    padding-top: 80px;
  }
`;

const ExchangeCard = styled.div`
  background-color: white;
  color: #333333;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 650px;
  max-width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: orange;
  font-weight: 700;
  align-items: center;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background: none;
  color: orange;
  border: none;
  cursor: pointer;
`;

const RefreshButton = styled(BackButton)``;

const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;  // Aligns tab content to the left
`;

const Title = styled.h2`
font-size: 1.5rem;
  font-weight: bold;
  color: orange;
  display: inline;  // Restrict border to text width
  text-align: left; // Aligns text to the left
  border-bottom: 2px solid orange;
  margin: 0
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CurrencyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NetworkRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 700;
  margin-right: 12px;

  @media (max-width: 1200px) { // Adjust for medium tablets
    font-size: 16px; // Slightly smaller font size
    margin-right: 12px;
 // Adjust margin
  font-weight: 700;

  }

  @media (max-width: 992px) { // Adjust for smaller tablets
    font-size: 16px; // Same size for consistency
     margin-right: 12px;
 // Reduce margin
  font-weight: 700;

  }

  @media (max-width: 768px) { // Adjust for mobile devices
    font-size: 14px; // Smaller font size for mobile
     margin-right: 12px;
; // Further reduce margin
  font-weight: 700;

  }

  @media (max-width: 576px) { // Adjust for extra small devices (e.g., phones)
    font-size: 16px; // Even smaller font size for phones
      margin-right: 12px;
// Minimal margin for extra small screens
  font-weight: 700;

  }
`;


const CurrencyButton = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;

  &.active {
    background-color: #e1dcdc;
    border-color: #007bff;
    font-weight: 700;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 16px;
     font-weight: 600;
  color: black;
  background-color: #f9f9f9;
`;

const AmountInput = styled.div`
  position: relative;
  
`;

const CurrencyLabel = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);  
  display: flex;
  align-items: center;
`;

const MoneyIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px; // Space between icon and text
`;

const BoldText = styled.span`
  font-weight: 700;
  color : black;
`;

const BalanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
  margin-top: 1rem;
`;

const Available = styled.span`
  font-size: 15px;
  font-weight: 700;
  color : black;
`;

const Fee = styled.span`
  font-size: 15px;
  font-weight: 700;
  color : black;
`;

const ProceedButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: orange;
  color: black;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-top: 1rem;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;

const NetworkIcon = styled.img`
  width: 22px;
  height: 22px;
  // margin-right: 0.5rem;
`;



const NetworkWrapper = styled.div`
  display: flex;
  flex-direction: row; // Keep buttons in a row
  align-items: center;
  width: 100%;
  height: auto; // Allow height to adjust based on content
  gap: 10px; // Space between buttons
  margin-top: 0.5rem;
  margin-left: 55px; // Margin for larger screens

  @media (max-width: 1200px) { // Adjust for medium tablets
    margin-left: 25px; // Move margin slightly to the left for medium screens
  }

  @media (max-width: 992px) { // Adjust for smaller tablets
    margin-left: 15px; // Move margin slightly to the left for smaller screens
    justify-content: center; // Center buttons on medium tablets
  }

  @media (max-width: 768px) { // Adjust for mobile devices
    margin-left: 55px; // Move buttons slightly to the left on mobile
    justify-content: flex-start; // Align buttons to the start
    flex-wrap: wrap; // Allow buttons to wrap on small screens
    gap: 15px; // Reduce gap between buttons

  }

  @media (max-width: 576px) { // Adjust for extra small devices (e.g., phones)
    margin-left: 0; // Remove margin for extra small devices
    gap: 15px; // Reduce gap between buttons
  }
`;

const Button = styled.button`
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  height: 50px; 

  width: 40%; // Set a default width that allows two buttons in a row for larger screens

  @media (max-width: 1200px) {
    width: 45%; // Adjust button width for medium tablets
    gap : 10px;
  }

  @media (max-width: 992px) {
    width: 45%; // Adjust button width for smaller tablets
  }

  @media (max-width: 768px) { // Adjust button styles for mobile
    width: 45%; // Adjust width for mobile, ensures two buttons fit
    margin: 0; // Remove margin to fit two buttons side by side
  }

  @media (max-width: 576px) { // Adjust for extra small devices
    width: 45%; // Width for extra small devices
    font-size: 12px; // Optional: Reduce font size for better fit
    padding: 10px; // Optional: Adjust padding for smaller buttons
    gap : 10px;

  }
`;

const ActiveButton = styled(Button)`
  color: black;
  font-weight: 700;
  border: 2px solid orange;
  border-radius: 0.5rem;
`;

const InactiveButton = styled(Button)`
  color: black;
  background-color: #e5e5e5;
`;
