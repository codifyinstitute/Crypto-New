import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import { ChevronLeft, Menu } from "lucide-react";
import { IoArrowForwardOutline } from "react-icons/io5";

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
  p{
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

const Select = styled.select`
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
`;

const FormButton = styled.button`
  background-color: #f7a600;
  color: white;
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

const CardTransfer = () => {
  const navigate = useNavigate();

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
                <Tab>Choose payment method</Tab>
              </Left>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <Menu />
              </button>
            </TabContainer>

            <form>
              <FormSection>
                <p>Card Information</p>
                <FormLabel>First Name</FormLabel>
                <FormInput placeholder="Please enter your First name" />

                <FormLabel>Last Name</FormLabel>
                <FormInput placeholder="Please enter your Last name" />
               
            
                <FormLabel>Card Number</FormLabel>
                <FormInput placeholder="Enter Your Card Number" />

                <FormLabel>Expiry Date</FormLabel>
                <FormInput type="date" />

                <FormLabel>CVV/CVC</FormLabel>
                <FormInput placeholder="Enter Your CVV/CVC" />

                <FormLabel>Phone Number</FormLabel>
                <FormInput placeholder="Enter Your Phone Number" />

        
              </FormSection>

              <FormWarning>
                Attention: Please ensure the bank account belongs to you and the
                information is accurate.
              </FormWarning>

              <FormButton type="button">
                Confirm
                <IoArrowForwardOutline />
              </FormButton>
            </form>
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      <HomeContact />
      <Footer />
    </>
  );
};

export default CardTransfer;
