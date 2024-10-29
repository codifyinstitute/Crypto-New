import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  @media (max-width: 760px) {
    padding-top: 80px;
  }
  @media (max-width: 430px) {
    padding-top: 70px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  @media (max-width: 375px) {
    width: 97%;
  }
`;

const Tab = styled.button`
  background-color: ${(props) => (props.active ? "#121212" : "transparent")};
  color: ${(props) => (props.active ? "#FFA500" : "white")};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  border-right: 1px grey solid;
  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${(props) => (props.active ? "#121212" : "#2A2A2A")};
  }
  @media (max-width: 375px) {
    font-size: 9px;
  }
  @media (max-width: 320px) {
    font-size: 12px;
    padding: 5px 10px;
  }
`;

const TransactionList = styled.div`
  width: 100%;
  max-width: 600px;
`;

const TransactionCard = styled.div`
  background-color: white;
  color: black;
  border: 1px solid #ffa500;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TransactionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #ffa500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Label = styled.span`
  color: #ffa500;
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 320px) {
    font-size: 12px;
    top: 10px;
    left: 10px;
  }
`;

const Para = styled.p`
  width: 100%;
  text-align: center;
  @media (max-width: 480px) {
    text-align: left;
  }
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const StatusValue = styled(Value)`
  color: ${(props) => {
    switch (props.status) {
      case "Completed":
        return "#4CAF50"; // Green
      case "Pending":
        return "#FF6347"; // Red
      case "In Transit":
        return "#FF6347";
      case "Decline":
        return "#FF6347"; // Orange for "In Transit"
      default:
        return "inherit"; // Default color for other statuses
    }
  }};
`;

const SellHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? console.log() : navigate("/sell2");
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const email = localStorage.getItem("token");
      if (email) {
        try {
          const response = await fetch(
            `https://crypto-tusv.onrender.com/transactions/get/email/${email}`
          );
          if (!response.ok) throw new Error("Failed to fetch transactions");
          const data = await response.json();
          setTransactions(data.reverse());
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("No email found in local storage");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading)
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );

  return (
    <>
      <Navbar />
      <Container>
        <Title>
          <BackButton onClick={() => window.history.back()}>
            <ChevronLeft />
          </BackButton>
          <Para>Sell History</Para>
        </Title>
        <TabContainer>
          <Tab
            active={activeTab === "Pending"}
            onClick={() => setActiveTab("Pending")}
          >
            Pending
          </Tab>
          <Tab
            active={activeTab === "In Transit"}
            onClick={() => setActiveTab("In Transit")}
          >
            In Transit
          </Tab>
          <Tab
            active={activeTab === "Completed"}
            onClick={() => setActiveTab("Completed")}
          >
            Completed
          </Tab>
          <Tab
            active={activeTab === "Decline"}
            onClick={() => setActiveTab("Decline")}
          >
            Declined
          </Tab>
        </TabContainer>
        <TransactionList>
          {transactions
            .filter((transaction) => transaction.Status === activeTab)
            .map((transaction, index) => (
              <TransactionCard key={index}>
                <TransactionHeader>
                  <Value> Order Id : {transaction.OrderId}</Value>
                  <Value> Date : {transaction.Date}</Value>
                </TransactionHeader>
                <TransactionDetails>
                  <TransactionColumn>
                    <Label>Bank Name</Label>
                    <Value>{transaction.BankName}</Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>A/C Number</Label>
                    <Value>{transaction.AccountNumber}</Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Amount</Label>
                    <Value>₹{transaction.ReceivedAmount}</Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Status</Label>
                    <StatusValue status={transaction.Status}>
                      {transaction.Status}
                    </StatusValue>
                  </TransactionColumn>
                </TransactionDetails>
              </TransactionCard>
            ))}
        </TransactionList>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default SellHistory;
