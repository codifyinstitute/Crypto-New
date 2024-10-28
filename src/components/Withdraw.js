

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, RefreshCcw } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomeContact from './HomeContact';
import moneyIcon from '../assets/usdtt.png';
import trc20 from '../assets/trc20.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';

const WithdrawUSDT = () => {
  const [login, setLogin] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');

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
            <Title>Withdraw USDT</Title>
            <RefreshButton>
              <RefreshCcw />
            </RefreshButton>
          </Header>
          <FormGroup>
            <CurrencyRow>
              <InputLabel>Currency</InputLabel>
              <CurrencyButton className="active">
                <NetworkIcon src={moneyIcon} alt="USDT" />
                USDT
              </CurrencyButton>
            </CurrencyRow>
          </FormGroup>
          <FormGroup>
            <NetworkRow>
              <InputLabel>Network</InputLabel>
              <CurrencyButton className="active">
                <NetworkIcon src={trc20} alt="TRC20" />
                TRC20
              </CurrencyButton>
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
                <MoneyIcon src={moneyIcon} alt="USDT" />
                <BoldText>USDT</BoldText>
              </CurrencyLabel>
            </AmountInput>
            {amountError && <ErrorText>{amountError}</ErrorText>}
          </FormGroup>
          <BalanceInfo>
            <Available>Available: 0 <BoldText>USDT</BoldText></Available>
            <Fee>Refund Fee: 1 <BoldText>USDT</BoldText></Fee>
          </BalanceInfo>
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

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  flex: 1;
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
  font-size: 1rem;
  color: #333;
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
  width: 18px;
  height: 18px;
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
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
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
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
`;
