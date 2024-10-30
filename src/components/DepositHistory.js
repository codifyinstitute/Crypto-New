


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Weight } from "lucide-react";
import HomeContact from "./HomeContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usdtIcon from '../assets/usdtt.png'; // Import your icon here

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 375px) {
    padding: 10px; // Reduce padding for smaller screens
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
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 375px) {
    font-size: 20px; // Reduce font size for smaller screens
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 100%; // Make card full width on smaller screens
    padding: 1rem; // Reduce padding
  }
`;

const ScrollableArea = styled.div`
  flex-grow: 1; // Allow this area to grow and take available space
  overflow-y: auto; // Enable vertical scrolling
  max-height: 650px; // Set a maximum height for scrolling (adjust as necessary)
  display: flex;
  flex-direction: column; // Ensure children stack vertically

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for Chrome, Safari, and Opera
  }
  scrollbar-width: none; // Hide scrollbar for Firefox

  @media (max-width: 375px) {
    max-height: 400px; // Reduce max height for smaller screens
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  background: white; // Ensure it covers the background while scrolling
  z-index: 1; // Ensure it appears above other content
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 375px) {
    font-size: 1.25rem; // Reduce font size for smaller screens
  }
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
    padding: 8px; // Reduce padding for smaller screens
  }
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

  @media (max-width: 375px) {
    font-size: 16px; // Reduce font size for smaller screens
    margin: 0.5rem; // Adjust margin
  }

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

// New styled component for the status value with dynamic color
const StatusValue = styled(Value)`
  color: ${({ status }) => {
    if (status === "Completed") return "green";
    if (status === "Pending") return "#b89c00";
    if (status === "Failed") return "red";
    return "black"; // Default color if status is not recognized
  }};
`;

const AmountContainer = styled.div`
   background-color: rgb(251,251,251);
  color: black;
  padding: 5px 13px;
  border-radius: 10px;
  border: none;
  font-size: 14px; /* Slightly smaller font for better scaling */
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* height : 40px; */
  gap: 2px; /* Reduce gap slightly */
 width: auto; /* Prevent the button from getting too narrow */
  transition: background-color 0.3s;

  img {
    width: 18px; // Adjust the width of the icon as needed
    height: 18px; // Adjust the height of the icon as needed
    margin-left: 5px; // Space between amount and icon
  }
`;

// const DepositHistory = () => {
//   const [depositHistory, setDepositHistory] = useState([]);

//   const fetchDepositHistory = async () => {
//     const email = localStorage.getItem("token");    
//     try {
//       const response = await fetch(`https://crypto-backend-main.onrender.com/deposit-transactions/get/email/${email}`);
//       // https://crypto-backend-main.onrender.com/deposit-transactions/get/email/
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       console.log(data);
//       // For now, set dummy data
//       setDepositHistory(data.reverse());

//     } catch (error) {
//       toast.error("Error fetching deposit history");
//     }
//   };

//   useEffect(() => {
//     fetchDepositHistory();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <PageContainer>
//         <ToastContainer />
//         <Card>
//           <ScrollableArea>
//             <StickyContainer>
//               <TabContainer>
//                 <BackButton onClick={() => window.history.back()}>
//                   <ChevronLeft />
//                 </BackButton>
//                 <Tab active>Deposit History</Tab>
//               </TabContainer>
//               {/* <Title>Your Deposit History</Title> */}
//             </StickyContainer>
//             {depositHistory.length === 0 ? (
//               <Value>No deposit history available.</Value>
//             ) : (
//               depositHistory.map((data, index) => (
//                 <DepositHistoryCard key={index}>
//                   <InfoRow>
//                     <Label>Transaction:</Label>
//                     <Value>{data.Transaction}</Value>
//                   </InfoRow>
//                   <InfoRow>
//                     <Label>Status:</Label>
//                     <StatusValue status={data.Status}>{data.Status}</StatusValue>
//                   </InfoRow>
//                   <InfoRow>
//                     <Label>Network:</Label>
//                     <Value>{data.Network}</Value>
//                   </InfoRow>
//                   <InfoRow>
//                     <Label>Created Time:</Label>
//                     <Value>{data.CreatedTime}</Value>
//                   </InfoRow>
//                   <InfoRow>
//                     <Label>Amount:</Label>
//                     <AmountContainer>
//                     <img src={usdtIcon} alt="USDT Icon" /> {/* Use your icon here */}

//                       <Value>{data.Amount}</Value>
//                     </AmountContainer>
//                   </InfoRow>
//                 </DepositHistoryCard>
//               ))
//             )}
//           </ScrollableArea>
//         </Card>
//       </PageContainer>
//       <HomeContact />
//       <Footer />
//     </>
//   );
// };

// export default DepositHistory;

const DepositHistory = () => {
  const [depositHistory, setDepositHistory] = useState([]);

  const fetchDepositHistory = async () => {
    const email = localStorage.getItem("token");
    try {
      const response = await fetch(`https://crypto-backend-main.onrender.com/deposit-transactions/get/email/${email}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data); // Log the entire data to check its structure
      setDepositHistory(data.reverse()); // Reverse the order if needed
    } catch (error) {
      toast.error("Error fetching deposit history");
    }
  };

  const StatusValue = ({ status, children }) => {
    let style;

    if (status === 'Pending') {
      style = { color: 'red', fontWeight:"bold" };
    } else if (status === 'Successful') {
      style = { color: 'green', fontWeight:"bold" };
    } else {
      style = { color: 'black', fontWeight:"bold" }; // Default color
    }

    return <span style={style}>{children}</span>;
  };

  useEffect(() => {
    fetchDepositHistory();
  }, []);

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
                <Tab active>Deposit History</Tab>
              </TabContainer>
              {/* <Title>Your Deposit History</Title> */}
            </StickyContainer>
            {depositHistory.length === 0 ? (
              <Value>No deposit history available.</Value>
            ) : (
              depositHistory.map((data, index) => (
                <DepositHistoryCard key={index}>
                  <InfoRow>
                    <Label>Transaction:</Label>
                    <Value>{data.OrderId}</Value> {/* Accessing OrderId from the backend */}
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
                    <Label>Created Time:</Label>
                    <Value>{data.Date} {data.Time}</Value> {/* Combine Date and Time */}
                  </InfoRow>
                  <InfoRow>
                    <Label>Amount:</Label>
                    <AmountContainer>
                      <img src={usdtIcon} alt="USDT Icon" />
                      <Value>{data.Amount} USDT</Value> {/* Display amount with currency */}
                    </AmountContainer>
                  </InfoRow>
                </DepositHistoryCard>
              ))
            )}
          </ScrollableArea>
        </Card>
      </PageContainer>
      <HomeContact />
      <Footer />
    </>
  );
};

export default DepositHistory;