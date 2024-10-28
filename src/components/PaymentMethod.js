import React from "react";
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
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: auto;
  width: 100%;
  text-align: center;
`;

const PaymentMethod = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const navigate = useNavigate();

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
                <Tab>Choose Payment Method</Tab>
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

            <PaymentOption onClick={() => navigate('/bank-transfer')}>
              <IconWrapper>
                <FaUniversity />
              </IconWrapper>
              <OptionText>
                <OptionTitle>Bank Transfer</OptionTitle>
                <OptionDescription>
                  Processing time can take up to 1 day
                </OptionDescription>
              </OptionText>
            </PaymentOption>
            {selectedCountry === "Euro" || selectedCountry === "USA" ?
              <PaymentOption onClick={() => navigate('/card-transfer')}>
                <IconWrapper>
                  <FaCreditCard />
                </IconWrapper>
                <OptionText>
                  <OptionTitle>Card</OptionTitle>
                  <OptionDescription>
                    Processing time can take up to 15 min
                  </OptionDescription>
                </OptionText>
              </PaymentOption> : null}
            <ProceedButton>Proceed</ProceedButton>
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      <HomeContact />
      <Footer />
    </>
  );
};

export default PaymentMethod;
