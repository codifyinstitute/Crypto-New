
import React, { useEffect, useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import { ChevronLeft, Menu } from "lucide-react";
import { FaUniversity, FaCreditCard } from "react-icons/fa"; // For bank and card icons
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
import nobankdetails from "./../assets/no-bank-building-icon-with-textured-only-for-girls-vector-27765593-removebg-preview.png";


// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  background-color: black;
  padding-top: 80px;


`;

const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  color: black;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 380px) {
    padding: 1rem;
    margin: 0px 15px;
    width: 100%;
    height : 650px;
  }

  @media (max-width: 430px) {
    padding: 1rem;
    margin: 0px 15px;
    width: 90%;
    height : 670px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  color: #f7a600;
  font-size: 20px;
  font-weight: 700;

   @media (max-width: 320px) {
  font-size: 18px;
  
  }
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: #000;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #333;
  background-color: #f7a600;
  padding: 10px;
  display: flex;
  border-radius: 5px;
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const OptionDescription = styled.div`
  font-size: 12px;
  color: #888;
`;

const ProceedButton = styled.button`
  background-color: #f7a600;
  color: black;
  font-weight : 700;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: auto;
  width: 100%;
  text-align: center;
  &:disabled {
    background: gray;
  }
`;

const Button = styled.button`
  background-color: #f7a600;
  color: black;
  font-weight : 700;
  border: none;
  padding: 10px;
  font-size: .7rem;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: #e69500;
  }
`;

const CardsSection = styled.div`
  width: 100%;
  border-radius: 1rem;
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 2%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 100%;
  background-color: ${({ selected }) => (selected ? "#f7a600" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border: 2px solid ${({ selected }) => (selected ? "#f7a600" : "#ccc")};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  font-family: Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#e69500" : "#f7a600")};
    color: ${({ selected }) => (selected ? "white" : "#fff")};
    border-color: ${({ selected }) => (selected ? "#e69500" : "#e69500")};
  }
`;

const CardTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
  padding: 0.3rem 0;
  border-bottom: 2px solid inherit;
  font-weight: 500;
  margin-bottom: 1%;
  @media (max-Width:480px){
    font-size: 16px;
  }
`;

const Crosss = styled.p`
  display: flex;
  padding : 1.5px;
  width: 100%;
  justify-content: space-between;
  @media (max-Width:480px){
    font-size: 14px;
  }
`;


const NoHistoryContainer = styled.div`
  display: flex;
  margin-top : 85px;
  flex-direction: column;
  align-items: center;
  justify-content: center; // Center the entire container
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center; // Center the icon horizontally
  align-items: center; // Center the icon vertically
  height: 20%; // Full height to center vertically in the viewport
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
  margin-top: 55px; // Additional margin for consistency
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #ffa500;
  font-weight: bold;
  margin-top: 20px;
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

const PaymentMethod = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null); // State to track the selected payment option
  const [loading, setLoading] = useState(true); 

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set the selected option
  };

  const handleProceedClick = () => {
    if (selectedOption === "bank") {
      navigate('/bank-transfer'); // Navigate to bank transfer route
    } else if (selectedOption === "card") {
      navigate('/card-transfer'); // Navigate to card transfer route
    } else {
      toast.error("Please select a payment option."); // Show an error if no option is selected
    }
  };

  const handleCardClick = (account) => {
    const existingTransactionDetails =
      JSON.parse(localStorage.getItem("transactionDetails")) || {};

    const { _id, __v, ...filteredAccount } = account;

    const updatedTransactionDetails = {
      ...existingTransactionDetails,
      AccountDetail: { ...filteredAccount }
    };

    localStorage.setItem(
      "transactionDetails",
      JSON.stringify(updatedTransactionDetails)
    );
    navigate("/sell4");
  };

  useEffect(() => {
    setLoading(true);
    const email = localStorage.getItem("token");
    axios
      .get(`https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/${email}`)
      .then((response) => {
        console.log(response.data)
        setAccounts(response.data);
      setLoading(false); // Stop loading

      })
      .catch((error) => {
        console.error("Error fetching Accounts:", error);
      setLoading(false); // Stop loading on error

      });
  }, [selectedCountry])

  const AddAccount = () => {
    setForm(!form);
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <ToastContainer />
        <FormWrapper>
          <FormContainer>
            <TabContainer>
              <Left>
                <button
                  onClick={() => window.history.back()}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#f7a600",
                  }}
                >
                  <ChevronLeft />
                </button>
                <Tab>Payment Method</Tab>
              </Left>
              {/* <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <Menu />
              </button> */}
              {form ? (
                <Button onClick={AddAccount}>My Accounts</Button>
              ) : (
                <Button onClick={AddAccount}>My Accounts</Button>
              )}
            </TabContainer>
            {form ? (<>
              <PaymentOption
                onClick={() => handleOptionClick("bank")}
                style={{ border: selectedOption === "bank" ? "2px solid #f7a600" : "1px solid #ddd" }}
              >
                <IconWrapper>
                  <FaUniversity />
                </IconWrapper>
                <OptionText>
                  <OptionTitle>Bank Transfer</OptionTitle>
                  <OptionDescription>
                    Processing time can take up to 2 hours
                  </OptionDescription>
                </OptionText>
              </PaymentOption>

              {selectedCountry === "Euro" || selectedCountry === "USA" ? (
                <PaymentOption
                  onClick={() => handleOptionClick("card")}
                  style={{ border: selectedOption === "card" ? "2px solid #f7a600" : "1px solid #ddd" }}
                >
                  <IconWrapper>
                    <FaCreditCard />
                  </IconWrapper>
                  <OptionText>
                    <OptionTitle>Card</OptionTitle>
                    <OptionDescription>
                      Processing time can take up to 15 min
                    </OptionDescription>
                  </OptionText>
                </PaymentOption>
              ) : null}

              <ProceedButton onClick={handleProceedClick} disabled={!selectedOption}>
                Proceed
              </ProceedButton>
            </>) : 
              loading ? (
              <LoadingText>Loading...</LoadingText>
            ) 
            :
            (<>
              <CardsSection>
                {accounts.length > 0 ? accounts.map((account, index) => (
                  <Card
                    key={index}
                    onClick={() => handleCardClick(account)}
                  >
                    <Crosss><strong>Bank Name</strong> <span>{account.BankName}</span></Crosss>
                    <Crosss>
                      <strong>Account Number:</strong> {account.AccountNo}
                    </Crosss>
                     {/* <Crosss>
                      <strong>IFSC:</strong> {account.IFSC}
                    </Crosss>  */}

{selectedCountry === "USA" && (
                    <>
                          <Crosss><strong>ABA Code:</strong>{account.ABACode}</Crosss>
                    </>
                  )}


                  {selectedCountry === "Brazil" && (
                    <>
                          <Crosss><strong>Bank Branch Code:</strong>{account.BranchCode}</Crosss>
                    </>
                  )}

                  {selectedCountry === "UK" && (
                        <>
                          <Crosss><strong>Sort Code:</strong>{account.SortCode}</Crosss>
                        </>
                  )}

                  {selectedCountry === "Euro" && (
                    <>
                          <Crosss><strong>ABA Code:</strong>{account.ABACode}</Crosss>
                    </>
                  )}

                  {selectedCountry === "Dubai" && (
                    <>
                          <Crosss><strong>IBAN:</strong>{account.IBAN}</Crosss>
                    </>
                  )}

                  {selectedCountry === "India" && (
                    <>
                          <Crosss><strong>IFSC:</strong>{account.IFSC}</Crosss>                       
                    </>
                  )}

                  </Card>
                )) :   (
                  <NoHistoryContainer>
                    <IconContainer>
                      <img
                        src={nobankdetails}
                        alt="Empty Icon"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundColor: "#f0f0f0",
                          padding: "10px",
                          borderRadius: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </IconContainer>
                    <CenteredValueContainer>
                      <TextValue>No Bank Details Available.</TextValue>
                    </CenteredValueContainer>
                    <ProceedButton style={{ width: "fit-content" }} onClick={() => navigate('/bank-transfer')}>
  Add Bank Details
</ProceedButton>
                  </NoHistoryContainer>
                )}
              </CardsSection>
            </>
            )}

          </FormContainer>
        </FormWrapper>
      </PageContainer>
      {/* <HomeContact /> */}
      <Footer />
    </>
  );
};

export default PaymentMethod;




// :   (
//   <NoHistoryContainer>
//     <IconContainer>
//       <img
//         src={nobankdetails}
//         alt="Empty Icon"
//         style={{
//           height: "100px",
//           width: "100px",
//           backgroundColor: "#f0f0f0",
//           padding: "10px",
//           borderRadius: "20px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//         }}
//       />
//     </IconContainer>
//     <CenteredValueContainer>
//       <TextValue>No Card Details Available.</TextValue>
//     </CenteredValueContainer>
//     <ProceedButton style={{ width: "fit-content" }} onClick={AddAccount}>
//   Add Bank Details
// </ProceedButton>
//   </NoHistoryContainer>
// )}



{/* <>
<OptionTitle>No Bank Details is Added</OptionTitle>
<ProceedButton style={{ width: "fit-content" }} onClick={() => navigate('/bank-transfer')}>
  Add Bank Details
</ProceedButton>
</>}
</CardsSection> */}