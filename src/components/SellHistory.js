import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import view from "../assets/Add_a_little_bit_of_body_text__43_-removebg-preview.png";
import countryImage from "../assets/country.png";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
`;

// Styled Components
const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 100px 20px 20px 20px; // Top padding for larger screens
  overflow: auto;
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  scrollbar-width: none; // Hide scrollbar on Firefox
  -ms-overflow-style: none; // Hide scrollbar on IE and Edge
  
  // Webkit-based browsers (Chrome, Safari)
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar on Webkit browsers
  }
  
  @media (max-width: 760px) {
    padding-top: 80px; // Adjusted top padding for medium screens
  }
  
  @media (max-width: 430px) {
    padding-top: 70px; // Adjusted top padding for smaller screens
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
  padding-bottom: 25px;
  width: 100%;
  max-width: 600px;
  max-height: 60vh; // Limit height to ensure it doesn’t overflow
  min-height: 100vh;
  overflow-y: auto; // Enable scrolling
  background-color: #222; // Set dark background
  
  scrollbar-width: thin; // Firefox: Thin scrollbar width
  scrollbar-color: #333 transparent; // Firefox: Dark scrollbar on transparent track
  
  -ms-overflow-style: none; // IE and Edge scrollbar hiding
  
  // Webkit-based browsers (Chrome, Safari)
  &::-webkit-scrollbar {
    width: 8px; // Show a thin scrollbar
  }
  &::-webkit-scrollbar-track {
    background: #222; // Dark track background
  }
  &::-webkit-scrollbar-thumb {
    background-color: #555; // Dark scrollbar color
    border-radius: 10px;
    border: 2px solid #222; // Border to blend with track
  }
  
  @media (max-width: 768px) { // Hide scrollbar on mobile
    &::-webkit-scrollbar {
      display: none;
    }
  }
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
  text-align: left;
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
  width: 340px;
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
  UAE: {
    urlName: "aed",
    symbol: "د.إ",
    name: "UAE"
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
            `http://147.93.20.176:8000/transactions/get/email/${email}`
          );
          if (!response.ok) throw new Error("Failed to fetch transactions");
          const data = await response.json();
          const filData = data.filter(val => val.Country === selectedCountry)
          console.log( "data",data);
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

    console.log("tsx data",transactions);
  const handleIconClick = (accountDetail) => {
    setAccountDetails(accountDetail);
    console.log("accountdetails" ,accountDetail)
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAccountDetails(null);
  };

  // Sorting for arrangement
  const getOrderedAccountDetails = (accountDetails) => {
    const orderedFields = ["FirstName", "LastName", "Email"];
    const excludedFields = ["Address", "IDType", "IDNumber", "Email", "PhoneNumber", "City", "State", "ZipCode"];

    const orderedEntries = Object.entries(accountDetails)
    .filter(([key]) => !excludedFields.includes(key))
      .sort((a, b) => {
        const indexA = orderedFields.indexOf(a[0]);
        const indexB = orderedFields.indexOf(b[0]);
        return (indexA !== -1 ? indexA : orderedFields.length) - (indexB !== -1 ? indexB : orderedFields.length);
      });
    return orderedEntries;
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
      <Wrapper>
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
                  <Value> Order ID : {transaction.OrderId}</Value>
                  <Value> Date : {transaction.Date}</Value>
                </TransactionHeader>
                <TransactionDetails>
                  <TransactionColumn>
                    <Label>Account Detail</Label>
                    <Value>
                      {/* <MdOutlineRemoveRedEye size={24}  onClick={() => handleIconClick(transaction.AccountDetail)} />
                      <img 
                      src={view} 
                      alt="view icon" 
                      width={60} 
                      height={60} 
                      onClick={() => handleIconClick(transaction.AccountDetail)} 
                    /> */}
 <span 
  style={{ 
    marginLeft : "25px",
    cursor: "pointer", 
    fontSize: "12px", 
    border: "1px solid black", 
    borderRadius: "12px", 
    padding: "2px 7px" 
  }} 
  onClick={() => handleIconClick(transaction.AccountDetail)}
>
  view
</span>
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
      </Wrapper>
      {/* Modal for Account Details */}
      {modalVisible && (
  <ModalBackground onClick={closeModal}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={closeModal}>&times;</CloseButton>
      
      <Table>
        <thead>
          <tr>
            <th colSpan="2">
              {Object.keys(accountDetails).includes("CardNumber") ? "Card Details" : "Bank Details"}
            </th>
          </tr>
        </thead>
        <tbody>
          {accountDetails && getOrderedAccountDetails(accountDetails).map(([key, value]) => (
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