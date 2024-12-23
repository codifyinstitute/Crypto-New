

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import HomeContact from "./HomeContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usdtIcon from '../assets/usdtt.png';
import usdtimg from "./../assets/usdt1-removebg-preview(2).png";
import { TbLockPlus } from "react-icons/tb";
import empty from "./../assets/empty.png";

const PageContainer = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color:black;
  font-family: 'Roboto', sans-serif;
  /* padding-top: 140 px; */
  @media (max-width: 480px) {
  padding-top: 80px;

  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  
`;

const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 25px;
  font-weight: 700;
    display: inline-block;
  text-align: left;

   @media (max-width: 480px) {
    font-size: 22px; // Adjust font size for smaller screens
  }

  @media (max-width: 320px) {
    font-size: 22px; // Further adjust for very small screens
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 650px;
  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 100%;
    padding: 1rem;
  }
`;

const ScrollableArea = styled.div`
  // flex-grow: 1;
  // overflow-y: auto;
  // max-height: 650px;
  // display: flex;
  // flex-direction: column;

  // &::-webkit-scrollbar {
  //   display: none;
  // }
  // scrollbar-width: none;

  // @media (max-width: 375px) {
  //   max-height: 400px;
  // }
   flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 150px); /* Adjust this value based on the total height of the header and footer */
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  @media (max-width: 375px) {
    max-height: calc(100vh - 120px); /* Adjust for smaller devices */
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.span`
  color: black;
  font-weight: bolder;
`;

const Value = styled.span`
  color: black;
  font-weight: bold;
`;

const DepositHistoryCard = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 375px) {
    padding: 8px;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #ffa500;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 375px) {
    font-size: 16px;
    margin: 0.1rem;
  }
`;

const AmountContainer = styled.div`
  background-color: rgb(251,251,251);
  color: black;
  padding: 5px 13px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2px;
  width: auto;
  transition: background-color 0.3s;

  img {
    width: 18px;
    height: 18px;
    margin-left: 5px;
  }
`;

const MakeDepositButton = styled.button`
  background-color: #ffa500;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ff8c00;
  }
`;
//   const fetchDepositHistory = async () => {
//     const email = localStorage.getItem("token");    
//     try {
//       const response = await fetch(`http://147.93.20.176:8000/deposit-transactions/get/email/${email}`);
//       // http://147.93.20.176:8000/deposit-transactions/get/email/
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       console.log(data);
//       // For now, set dummy data
//       setDepositHistory(data.reverse());

// for lock-plus icon
const IconContainer = styled.div`
  display: flex;
  justify-content: center; // Center the icon horizontally
  align-items: center; // Center the icon vertically
  height: 20%; // Full height to center vertically in the viewport
`;

// const StyledLockIcon = styled(empty)`
//   height: 70px; // Desired height
//   width: 70px; // Desired width
//   background-color: #f0f0f0; // Gray background color
//   padding: 10px; // Padding for better appearance
//   border-radius: 20px; // More rounded corners
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Shadow for depth
// `;
const NoHistoryContainer = styled.div`
  display: flex;
  margin-top : 55px;
  flex-direction: column;
  align-items: center;
  justify-content: center; // Center the entire container
`;


const CenteredValueContainer = styled.div`
  display: flex;
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
   margin-top: 10px; 
`;

const TextValue = styled.div`
  font-size: 16px; // Font size for the text
  color: black; // Text color
  font-weight : 600;
  text-align: center; // Center align the text
  margin-top: 35px; // Additional margin for consistency
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #ffa500;
  font-weight: bold;
  margin-top: 20px;
`;

// Component for status with dynamic color styling
const StatusValue = ({ status, children }) => {
  const color = status === "successful" ? "green" : status === "Pending" ? "#b89c00" : "red";
  return <span style={{ color, fontWeight: "bold" }}>{children}</span>;
};

const DepositHistory = () => {
  const [depositHistory, setDepositHistory] = useState([]);
  const navigate = useNavigate();

  const fetchDepositHistory = async () => {
    setLoading(true);
    const email = localStorage.getItem("token");
    try {
      const response = await fetch(`http://147.93.20.176:8000/deposit-transactions/get/email/${email}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setDepositHistory(data.reverse());
    } catch (error) {
      toast.error("Error fetching deposit history");
    }
    finally {
      setLoading(false); 
    }
  };

  const handleMakeDeposit = () => {
    navigate("/deposit");  // Update this route as needed
  };

  useEffect(() => {
    fetchDepositHistory();
  }, []);

  const [loading, setLoading] = useState(true); // Add loading state

  return (
    <>
      <Navbar />
      <PageContainer>
        <ToastContainer />
        <Card>
          <ScrollableArea>
            <StickyContainer>
              <TabContainer>
                <BackButton onClick={() => window.history.back()}>
                  <ChevronLeft />
                </BackButton>
                <TabWrapper>
                  <Tab active>Deposit History</Tab>
                </TabWrapper>
              </TabContainer>
            </StickyContainer>
            { loading ? (
              <LoadingText>Loading...</LoadingText>
            ) : depositHistory.length === 0 ? (
 <NoHistoryContainer>                                    
    <IconContainer>
      <img
        src={empty}
        alt="Empty Icon"
        style={{
          height: "70px",
          width: "70px",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />
    </IconContainer>
    <CenteredValueContainer>
      <TextValue>No deposit history available.</TextValue>
    </CenteredValueContainer>
    <MakeDepositButton onClick={handleMakeDeposit}>Make Deposit</MakeDepositButton>
    </NoHistoryContainer>
): (
              depositHistory.map((data, index) => (
                <DepositHistoryCard key={index}>
                  <InfoRow>
                    <Label>Order ID:</Label>
                    <Value>{data.OrderId}</Value>
                  </InfoRow>
                  <InfoRow>
                    <Label>Status:</Label>
                    <StatusValue status={data.Status}>{data.Status}</StatusValue>
                  </InfoRow>
                  <InfoRow>
                    <Label>Network:</Label>
                    <Value>{data.Network}</Value>
                  </InfoRow>
                  <InfoRow>
                    <Label>Date & Time:</Label>
                    <Value style={{ fontSize: '0.85em' }}>{data.Date} {data.Time}</Value>
                  </InfoRow>
                  <InfoRow>
                    <Label>Amount:</Label>
                    <AmountContainer>
                      <img src={usdtimg} alt="USDT Icon" />
                      <Value>{data.Amount} USDT</Value>
                    </AmountContainer>
                  </InfoRow>
                </DepositHistoryCard>
              ))
            )}
          </ScrollableArea>
        </Card>
      </PageContainer>
       {/* <HomeContact /> */}
      <Footer /> 
    </>
  );
};

export default DepositHistory;
