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
  padding: 0.75rem 7px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  color: #333;
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

const BankTransfer = () => {
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
                <Tab>Fill in the Information</Tab>
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
                <FormLabel>First Name</FormLabel>
                <FormInput placeholder="Please enter your First name" />

                <FormLabel>Last Name</FormLabel>
                <FormInput placeholder="Please enter your Last name" readOnly />
                <FormLabel>City</FormLabel>
                <FormInput placeholder="Please enter City" readOnly />

                <FormLabel>State</FormLabel>
                <FormInput placeholder="Enter Your State" />

                <FormLabel>Address</FormLabel>
                <FormInput placeholder="Enter Your Address" />

                <FormLabel>Zip Code</FormLabel>
                <FormInput placeholder="Enter Your ZipCode" />

                <FormLabel>Bank Name</FormLabel>
                <FormInput placeholder="Enter Your Bank Name" readOnly />

                <FormLabel>Account Type</FormLabel>
                <Select>
                  <option value="">Select Account Type</option>
                  <option value="Savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="deposit">Deposit</option>
                </Select>
                <FormLabel>Account Number</FormLabel>
                <FormInput placeholder="Enter Your Account Number" readOnly />

                <FormLabel>ABA Code</FormLabel>
                <FormInput placeholder="9 Digit" />

                <FormLabel>Swift Code</FormLabel>
                <FormInput placeholder="Enter Your Swift Code" />

                <FormLabel>Sort Code</FormLabel>
                <FormInput placeholder="Enter Your IFSC" />

                <FormLabel>ID Type</FormLabel>
                <FormInput placeholder="Enter Your Id Type" />

                <FormLabel>Id Number</FormLabel>
                <FormInput placeholder="Enter Your Id Number" />

                <FormLabel>Bank Branch Code</FormLabel>
                <FormInput placeholder="Enter Your Code" />

                <FormLabel>Account opening branch</FormLabel>
                <FormInput placeholder="Enter Your Branch" />
                <FormLabel>IBAN</FormLabel>
                <FormInput placeholder="Enter Your IBAN" />
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

export default BankTransfer;
