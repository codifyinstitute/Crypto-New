// UserWallet.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  font-family: 'Roboto', sans-serif;
`;

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
`;

const Balance = styled.div`
  font-size: 24px;
  color: black;
  font-weight: bold;
`;

const UserWallet = () => {
  const [balance, setBalance] = useState(0);

  const fetchUserBalance = async () => {
    try {
      // Simulating a fetch call to the backend
      // Uncomment the following lines to fetch from your backend
      // const response = await fetch('http://localhost:3001/user-balance');
      // if (!response.ok) throw new Error('Network response was not ok');
      // const data = await response.json();
      // setBalance(data.balance);

      // For now, set dummy balance data
      setBalance(1000); // Example balance
    } catch (error) {
      toast.error("Error fetching user balance");
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  return (
    <PageContainer>n
      <ToastContainer />
      <Card>
        <Title>Your Wallet Balance</Title>
        <Balance>${balance}</Balance>
      </Card>
    </PageContainer>
  );
};

export default UserWallet;
