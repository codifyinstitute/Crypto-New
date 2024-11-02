import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Styled Components
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  float: right;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const countryObject = {
  India: {
    urlName: "india",
    symbol: "₹",
    name: "India"
  },
  Brazil: {
    urlName: "brl",
    symbol: "R$",
    name: "Brazil"
  },
  UK: {
    urlName: "uk",
    symbol: "£",
    name: "United Kingdom"
  },
  Euro: {
    urlName: "euro",
    symbol: "€",
    name: "European Union"
  },
  Dubai: {
    urlName: "aed",
    symbol: "د.إ",
    name: "Dubai"
  },
  USA: {
    urlName: "usa",
    symbol: "$",
    name: "United States of America"
  }
}

// Main Component
const SellHistory = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? console.log() : navigate("/sell2");
  }, []);

  useEffect(() => {
    // console.log(selectedCountry)
    const fetchTransactions = async () => {
      const email = localStorage.getItem("token");
      if (email) {
        try {
          const response = await fetch(
            `https://crypto-backend-main.onrender.com/transactions/get/email/${email}`
          );
          if (!response.ok) throw new Error("Failed to fetch transactions");
          const data = await response.json();
          const filData = data.filter(val => val.Country === selectedCountry)
          // console.log(filData);
          setTransactions(filData.reverse());
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
  }, [selectedCountry]);

  const handleIconClick = (accountDetail) => {
    setAccountDetails(accountDetail);
    console.log(accountDetail)
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAccountDetails(null);
  };

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
            active={activeTab === "Successful"}
            onClick={() => setActiveTab("Successful")}
          >
            Completed
          </Tab>
          <Tab
            active={activeTab === "Failed"}
            onClick={() => setActiveTab("Failed")}
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
                    <Label>Account Detail</Label>
                    <Value>
                      <MdOutlineRemoveRedEye onClick={() => handleIconClick(transaction.AccountDetail)} />
                    </Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Country</Label>
                    <Value>{transaction.Country}</Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Amount</Label>
                    <Value>{countryObject[transaction.Country].symbol} {transaction.ReceivedAmount}</Value>
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
      {/* Modal for Account Details */}
      {modalVisible && (
        <ModalBackground onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            
            <Table>
              <thead>
                <tr>
                  <th colSpan="2">{Object.keys(accountDetails).includes("CardNumber")?"Card Details":"Bank Details"}</th>
                </tr>
              </thead>
              <tbody>
                {accountDetails && Object.entries(accountDetails).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalContent>
        </ModalBackground>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default SellHistory;
