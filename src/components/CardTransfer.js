import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import { ChevronLeft, Menu } from "lucide-react";
import { IoArrowForwardOutline } from "react-icons/io5";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import nocard from "./../assets/no-credit-card-no-bank-card-icon-cash-only-no-credit-cards-accepted-vector-removebg-preview.png";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  padding-top: 140px;

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
  }
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
`;

const FormSection = styled.div`
  margin-bottom: 1rem;
  p {
    font-weight: 700;
    margin-bottom: 0.6rem;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const FormWarning = styled.p`
  font-size: 12px;
  margin-bottom: 1rem;
  color: red; /* Set the text color to red for error messages */
`;

const FormButton = styled.button`
  background-color: #f7a600;
  color: black;
  font-weight : 700;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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
`;

const OptionTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
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
  width: 100%;
  justify-content: space-between;
  @media (max-Width:480px){
    font-size: 14px;
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

const CardTransfer = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const navigate = useNavigate();
  const [form, setForm] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    const email = localStorage.getItem("token");
    axios
      .get(`https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/card/${email}`)
      .then((response) => {
        setAccounts(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching Accounts:", error);
        setLoading(false);  
      });
  }, [selectedCountry]);

  const handleCardClick = (account) => {
    const existingTransactionDetails = JSON.parse(localStorage.getItem("transactionDetails")) || {};
    const { _id, __v, ...filteredAccount } = account;

    const updatedTransactionDetails = {
      ...existingTransactionDetails,
      AccountDetail: { ...filteredAccount }
    };

    localStorage.setItem("transactionDetails", JSON.stringify(updatedTransactionDetails));
    navigate("/sell4");
  };

  const validationSchema = Yup.object({
    FirstName: Yup.string().required("First name is required"),
    LastName: Yup.string().required("Last name is required"),
    CardNumber: Yup.string().required("Card number is required").matches(/^\d{16}$/, "Card number must be 16 digits"),
    ExpiryDate: Yup.date().required("Expiry date is required").nullable(),
    CVV: Yup.string().required("CVV is required").matches(/^\d{3}$/, "CVV must be 3 digits"),
    PhoneNumber: Yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const email = localStorage.getItem("token");
    const submissionData = {
      Email: email,
      ...values,
    };

    const url = `https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/card/add`;

    try {
      await axios.post(url, submissionData);
      toast.success("Card information saved successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to save card information.");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const AddAccount = () => {
    setForm(!form);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
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
        <Button onClick={AddAccount}>{form ? "My Cards" : "Add Card +"}</Button>
      </TabContainer>

      {form ? (
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            CardNumber: "",
            ExpiryDate: "",
            CVV: "",
            PhoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormSection>
                <p>Card Information</p>
                <FormLabel>First Name</FormLabel>
                <Field name="FirstName" as={FormInput} placeholder="Please enter your First name" />
                <ErrorMessage name="FirstName" component={FormWarning} />

                <FormLabel>Last Name</FormLabel>
                <Field name="LastName" as={FormInput} placeholder="Please enter your Last name" />
                <ErrorMessage name="LastName" component={FormWarning} />

                <FormLabel>Card Number</FormLabel>
                <Field name="CardNumber" as={FormInput} placeholder="Enter Your Card Number" />
                <ErrorMessage name="CardNumber" component={FormWarning} />

                <FormLabel>Expiry Date</FormLabel>
                <Field name="ExpiryDate" type="month" as={FormInput} />
                <ErrorMessage name="ExpiryDate" component={FormWarning} />

                <FormLabel>CVV/CVC</FormLabel>
                <Field name="CVV" as={FormInput} placeholder="Enter Your CVV/CVC" />
                <ErrorMessage name="CVV" component={FormWarning} />

                <FormLabel>Phone Number</FormLabel>
                <Field name="PhoneNumber" as={FormInput} placeholder="Enter Your Phone Number" />
                <ErrorMessage name="PhoneNumber" component={FormWarning} />
              </FormSection>

              <FormWarning>
                Attention: Please ensure the card information is accurate.
              </FormWarning>

              <FormButton type="submit" disabled={isSubmitting}>
                Confirm
                <IoArrowForwardOutline />
              </FormButton>
            </Form>
          )}
        </Formik>
      ) : loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <CardsSection>
          {accounts.length > 0 ? accounts.map((account, index) => (
            <Card key={index} onClick={() => handleCardClick(account)}>
              <CardTitle>
                <span>Card Number</span> <span>{account.CardNumber}</span>
              </CardTitle>
              <Crosss>
                <strong>Expiry Date:</strong> {account.ExpiryDate}
              </Crosss>
              <Crosss>
                <strong>CVV:</strong> {account.CVV}
              </Crosss>
            </Card>
          )) : (
            <NoHistoryContainer>
              <IconContainer>
                <img
                  src={nocard}
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
                <TextValue>No Card Details Available.</TextValue>
              </CenteredValueContainer>
              <ProceedButton style={{ width: "fit-content" }} onClick={AddAccount}>
            Add Card Details
          </ProceedButton>
            </NoHistoryContainer>
          )}
        
        </CardsSection>
      )}
    </FormContainer>
        </FormWrapper>
      </PageContainer>
      <Footer></Footer>
      <ToastContainer />
    </>
  );
};

export default CardTransfer;
