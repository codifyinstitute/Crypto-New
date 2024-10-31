import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import { ChevronLeft, Menu } from "lucide-react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  padding-top: 140px;

  @media (max-width: 480px) {
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
  color: black;
  font-weight: 700;
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
  width: 100%;
  justify-content: space-between;
  @media (max-Width:480px){
    font-size: 14px;
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

const BankTransfer = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const navigate = useNavigate();
  const [form, setForm] = useState(true);
  const [accounts, setAccounts] = useState([]);

  // State for input fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bankName: "",
    accountNumber: "",
    city: "",
    state: "",
    address: "",
    zipCode: "",
    accountType: "",
    abaCode: "",
    swiftCode: "",
    sortCode: "",
    idType: "",
    idNumber: "",
    bankBranchCode: "",
    accountOpeningBranch: "",
    iban: "",
    ifsc: "",
  });

  useEffect(()=>{
    const email = localStorage.getItem("token");
    axios
      .get(`https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/${email}`)
      .then((response) => {
        console.log(response.data)
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Accounts:", error);
      });
  },[selectedCountry])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("token");

    // Construct submission object based on selected country
    const submissionData = {
      Email: email,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      BankName: formData.bankName,
      AccountNo: formData.accountNumber,
    };

    // Add country-specific fields
    if (selectedCountry === "USA") {
      submissionData.City = formData.city;
      submissionData.State = formData.state;
      submissionData.Address = formData.address;
      submissionData.ZipCode = formData.zipCode;
      submissionData.AccountType = formData.accountType;
    } else if (selectedCountry === "Brazil") {
      submissionData.AccountType = formData.accountType;
      submissionData.IDType = formData.idType;
      submissionData.IDNumber = formData.idNumber;
      submissionData.BranchCode = formData.bankBranchCode;
      submissionData.ABACode = formData.abaCode;
    } else if (selectedCountry === "UK") {
      submissionData.SortCode = formData.sortCode;
      submissionData.Address = formData.address;
    } else if (selectedCountry === "Euro") {
      submissionData.ABACode = formData.abaCode;
      submissionData.SwiftCode = formData.swiftCode;
    } else if (selectedCountry === "Dubai") {
      submissionData.OpeningBranch = formData.accountOpeningBranch;
      submissionData.IBAN = formData.iban;
    } else if (selectedCountry === "India") {
      submissionData.IFSC = formData.ifsc;
    }

    // API call to save data
    const url = `https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/add`;

    try {
      await axios.post(url, submissionData);
      toast.success("Data saved successfully!"); // Show success notification

      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        bankName: "",
        accountNumber: "",
        city: "",
        state: "",
        address: "",
        zipCode: "",
        accountType: "",
        abaCode: "",
        swiftCode: "",
        sortCode: "",
        idType: "",
        idNumber: "",
        bankBranchCode: "",
        accountOpeningBranch: "",
        iban: "",
        ifsc: "",
      });
    } catch (error) {
      toast.error("Failed to save data."); // Show error notification
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };


  const AddAccount = () => {
    setForm(!form);
  }

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
              {form ? (
                <Button onClick={AddAccount}>Choose Account</Button>
              ) : (
                <Button onClick={AddAccount}>Add Account +</Button>
              )}
            </TabContainer>
            {form ? <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
              <FormSection>
                <FormLabel>First Name</FormLabel>
                <FormInput name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Please enter your First name" />

                <FormLabel>Last Name</FormLabel>
                <FormInput name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Please enter your Last name" />

                <FormLabel>Bank Name</FormLabel>
                <FormInput name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Enter Your Bank Name" />

                <FormLabel>Account Number</FormLabel>
                <FormInput name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Enter Your Account Number" />

                {selectedCountry === "USA" && (
                  <>
                    <FormLabel>City</FormLabel>
                    <FormInput name="city" value={formData.city} onChange={handleChange} placeholder="Please enter City" />

                    <FormLabel>State</FormLabel>
                    <FormInput name="state" value={formData.state} onChange={handleChange} placeholder="Enter Your State" />
                  </>
                )}

                {(selectedCountry === "UK" || selectedCountry === "USA") && (
                  <>
                    <FormLabel>Address</FormLabel>
                    <FormInput name="address" value={formData.address} onChange={handleChange} placeholder="Enter Your Address" />
                  </>
                )}

                {selectedCountry === "USA" && (
                  <>
                    <FormLabel>Zip Code</FormLabel>
                    <FormInput name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Enter Your ZipCode" />
                  </>
                )}

                {(selectedCountry === "Brazil" || selectedCountry === "USA") && (
                  <>
                    <FormLabel>Account Type</FormLabel>
                    <Select name="accountType" value={formData.accountType} onChange={handleChange}>
                      <option value="">Select Account Type</option>
                      <option value="Savings">Savings</option>
                      <option value="checking">Checking</option>
                      <option value="deposit">Deposit</option>
                    </Select>
                  </>
                )}

                {(selectedCountry === "Euro" || selectedCountry === "USA") && (
                  <>
                    <FormLabel>ABA Code</FormLabel>
                    <FormInput name="abaCode" value={formData.abaCode} onChange={handleChange} placeholder="9 Digit" />
                  </>
                )}

                {selectedCountry === "Euro" && (
                  <>
                    <FormLabel>Swift Code</FormLabel>
                    <FormInput name="swiftCode" value={formData.swiftCode} onChange={handleChange} placeholder="Enter Your Swift Code" />
                  </>
                )}

                {selectedCountry === "UK" && (
                  <>
                    <FormLabel>Sort Code</FormLabel>
                    <FormInput name="sortCode" value={formData.sortCode} onChange={handleChange} placeholder="Enter Your Sort Code" />
                  </>
                )}

                {selectedCountry === "Brazil" && (
                  <>
                    <FormLabel>ID Type</FormLabel>
                    <FormInput name="idType" value={formData.idType} onChange={handleChange} placeholder="Enter Your Id Type" />

                    <FormLabel>Id Number</FormLabel>
                    <FormInput name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Enter Your Id Number" />

                    <FormLabel>Bank Branch Code</FormLabel>
                    <FormInput name="bankBranchCode" value={formData.bankBranchCode} onChange={handleChange} placeholder="Enter Your Code" />
                  </>
                )}

                {selectedCountry === "Dubai" && (
                  <>
                    <FormLabel>Account opening branch</FormLabel>
                    <FormInput name="accountOpeningBranch" value={formData.accountOpeningBranch} onChange={handleChange} placeholder="Enter Your Branch" />

                    <FormLabel>IBAN</FormLabel>
                    <FormInput name="iban" value={formData.iban} onChange={handleChange} placeholder="Enter Your IBAN" />
                  </>
                )}

                {selectedCountry === "India" && (
                  <>
                    <FormLabel>IFSC</FormLabel>
                    <FormInput name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="Enter Your IFSC" />
                  </>
                )}
              </FormSection>

              <div>
                <FormWarning>
                  Attention: Please ensure the bank account belongs to you and the
                  information is accurate.
                </FormWarning>

                <FormButton type="submit">
                  Confirm
                  <IoArrowForwardOutline />
                </FormButton>
              </div>
            </form> : <>
              <CardsSection>
                {accounts.map((account, index) => (
                  <Card
                    key={index}
                    onClick={() => handleCardClick(account)}
                  >
                    <CardTitle><span>Bank Name</span> <span>{account.BankName}</span></CardTitle>
                    <Crosss>
                      <strong>Account Number:</strong> {account.AccountNo}
                    </Crosss>
                    <Crosss>
                      <strong>IFSC:</strong> {account.IFSC}
                    </Crosss>
                  </Card>
                ))}
              </CardsSection>
            </>}
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      <HomeContact />
      <Footer />
    </>
  );
};

export default BankTransfer;
