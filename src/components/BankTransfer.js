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
import * as Yup from 'yup'; // Import Yup
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik

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
  /* margin-bottom: 1rem; */
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

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", bankName: "", accountNumber: "",
    city: "", state: "", address: "", zipCode: "", accountType: "",
    abaCode: "", swiftCode: "", sortCode: "", idType: "", idNumber: "",
    bankBranchCode: "", accountOpeningBranch: "", iban: "", ifsc: ""
  });

  useEffect(() => {
    const email = localStorage.getItem("token");
    axios.get(`http://localhost:8000/account-details/${countryObject[selectedCountry].urlName}/${email}`)
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error("Error fetching Accounts:", error));
  }, [selectedCountry]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().matches(/^[A-Za-z\s]+$/, "First name can only contain letters").required("First name is required"),
    lastName: Yup.string().matches(/^[A-Za-z\s]+$/, "Last name can only contain letters").required("Last name is required"),
    bankName: Yup.string().required("Bank name is required"),
    accountNumber: Yup.string().matches(/^\d+$/, "Account number must be a number").required("Account number is required"),
    city: selectedCountry === "USA" ? Yup.string().matches(/^[A-Za-z\s]+$/, "City can only contain letters").required("City is required") : Yup.string(),
    state: selectedCountry === "USA" ? Yup.string().matches(/^[A-Za-z\s]+$/, "State can only contain letters").required("State is required") : Yup.string(),
    address: ["UK", "USA"].includes(selectedCountry) ? Yup.string().required("Address is required") : Yup.string(),
    zipCode: selectedCountry === "USA" ? Yup.string().matches(/^\d+$/, "Zip code must be a number").required("Zip code is required") : Yup.string(),
    accountType: ["Brazil", "USA"].includes(selectedCountry) ? Yup.string().required("Account type is required") : Yup.string(),
    abaCode: ["Euro", "USA"].includes(selectedCountry) ? Yup.string().matches(/^\d{9}$/, "ABA code must be a 9-digit number").required("ABA code is required") : Yup.string(),
    swiftCode: selectedCountry === "Euro" ? Yup.string().required("Swift code is required") : Yup.string(),
    sortCode: selectedCountry === "UK" ? Yup.string().matches(/^\d{6}$/, "Sort code must be a 6-digit number").required("Sort code is required") : Yup.string(),
    idType: selectedCountry === "Brazil" ? Yup.string().required("ID type is required") : Yup.string(),
    idNumber: selectedCountry === "Brazil" ? Yup.string().matches(/^\d+$/, "ID number must be a number").required("ID number is required") : Yup.string(),
    bankBranchCode: selectedCountry === "Brazil" ? Yup.string().required("Bank branch code is required") : Yup.string(),
    accountOpeningBranch: selectedCountry === "Dubai" ? Yup.string().required("Account opening branch is required") : Yup.string(),
    iban: selectedCountry === "Dubai" ? Yup.string().required("IBAN is required") : Yup.string(),
    ifsc: selectedCountry === "India" ? Yup.string().required("IFSC is required") : Yup.string(),
  });

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

  const handleSubmit = async (values) => {
    const email = localStorage.getItem("token");
    const submissionData = {
      Email: email,
      FirstName: values.firstName,
      LastName: values.lastName,
      BankName: values.bankName,
      AccountNo: values.accountNumber,
    };

    if (selectedCountry === "USA") {
      submissionData.City = values.city;
      submissionData.State = values.state;
      submissionData.Address = values.address;
      submissionData.ZipCode = values.zipCode;
      submissionData.AccountType = values.accountType;
      submissionData.ABACode = values.abaCode;
    } else if (selectedCountry === "Brazil") {
      submissionData.AccountType = values.accountType;
      submissionData.IDType = values.idType;
      submissionData.IDNumber = values.idNumber;
      submissionData.BranchCode = values.bankBranchCode;
    } else if (selectedCountry === "UK") {
      submissionData.SortCode = values.sortCode;
      submissionData.Address = values.address;
    } else if (selectedCountry === "Euro") {
      submissionData.ABACode = values.abaCode;
      submissionData.SwiftCode = values.swiftCode;
    } else if (selectedCountry === "Dubai") {
      submissionData.OpeningBranch = values.accountOpeningBranch;
      submissionData.IBAN = values.iban;
    } else if (selectedCountry === "India") {
      submissionData.IFSC = values.ifsc;
    }

    const url = `http://localhost:8000/account-details/${countryObject[selectedCountry].urlName}/add`;

    try {
      await axios.post(url, submissionData);
      toast.success("Data saved successfully!");
      setForm(!form);

      setFormData({
        firstName: "", lastName: "", bankName: "", accountNumber: "",
        city: "", state: "", address: "", zipCode: "", accountType: "",
        abaCode: "", swiftCode: "", sortCode: "", idType: "", idNumber: "",
        bankBranchCode: "", accountOpeningBranch: "", iban: "", ifsc: ""
      });
    } catch (error) {
      toast.error("Failed to save data.");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const toggleForm = () => {
    setForm(!form);
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
                  style={{ border: "none", background: "transparent", cursor: "pointer", color: "#f7a600" }}
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
            {form ? (
              <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <FormSection>
                      <FormLabel>First Name</FormLabel>
                      <Field name="firstName" as={FormInput} placeholder="Please enter your First name" />
                      <ErrorMessage name="firstName" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                      <FormLabel>Last Name</FormLabel>
                      <Field name="lastName" as={FormInput} placeholder="Please enter your Last name" />
                      <ErrorMessage name="lastName" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                      <FormLabel>Bank Name</FormLabel>
                      <Field name="bankName" as={FormInput} placeholder="Enter Your Bank Name" />
                      <ErrorMessage name="bankName" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                      <FormLabel>Account Number</FormLabel>
                      <Field name="accountNumber" as={FormInput} placeholder="Enter Your Account Number" />
                      <ErrorMessage name="accountNumber" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                      {selectedCountry === "USA" && (
                        <>
                          <FormLabel>City</FormLabel>
                          <Field name="city" as={FormInput} placeholder="Enter Your City" />
                          <ErrorMessage name="city" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>State</FormLabel>
                          <Field name="state" as={FormInput} placeholder="Enter Your State" />
                          <ErrorMessage name="state" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>Address</FormLabel>
                          <Field name="address" as={FormInput} placeholder="Enter Your Address" />
                          <ErrorMessage name="address" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>Zip Code</FormLabel>
                          <Field name="zipCode" as={FormInput} placeholder="Enter Your Zip Code" />
                          <ErrorMessage name="zipCode" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>Account Type</FormLabel>
                          <Field name="accountType" as={Select}>
                            <option value="">Select Account Type</option>
                            <option value="Saving">Saving</option>
                            <option value="Checking">Checking</option>
                          </Field>
                          <ErrorMessage name="accountType" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>ABA Code</FormLabel>
                          <Field name="abaCode" as={FormInput} placeholder="Enter Your ABA Code" />
                          <ErrorMessage name="abaCode" component="div" style={{ color: "red", marginBottom: "1rem" }} />
                        </>
                      )}

                      {selectedCountry === "Brazil" && (
                        <>
                          <FormLabel>Account Type</FormLabel>
                          <Field name="accountType" as={Select}>
                            <option value="">Select Account Type</option>
                            <option value="Saving">Saving</option>
                            <option value="Checking">Checking</option>
                          </Field>
                          <ErrorMessage name="accountType" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>ID Type</FormLabel>
                          <Field name="idType" as={Select}>
                            <option value="">Select ID Type</option>
                            <option value="Passport">Passport</option>
                            <option value="ID Card">ID Card</option>
                          </Field>
                          <ErrorMessage name="idType" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>ID Number</FormLabel>
                          <Field name="idNumber" as={FormInput} placeholder="Enter Your ID Number" />
                          <ErrorMessage name="idNumber" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>Branch Code</FormLabel>
                          <Field name="bankBranchCode" as={FormInput} placeholder="Enter Your Branch Code" />
                          <ErrorMessage name="bankBranchCode" component="div" style={{ color: "red", marginBottom: "1rem" }} />
                        </>
                      )}

                      {selectedCountry === "UK" && (
                        <>
                          <FormLabel>Sort Code</FormLabel>
                          <Field name="sortCode" as={FormInput} placeholder="Enter Your Sort Code" />
                          <ErrorMessage name="sortCode" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>Address</FormLabel>
                          <Field name="address" as={FormInput} placeholder="Enter Your Address" />
                          <ErrorMessage name="address" component="div" style={{ color: "red", marginBottom: "1rem" }} />
                        </>
                      )}

                      {selectedCountry === "Euro" && (
                        <>
                          <FormLabel>ABA Code</FormLabel>
                          <Field name="abaCode" as={FormInput} placeholder="Enter Your ABA Code" />
                          <ErrorMessage name="abaCode" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>Swift Code</FormLabel>
                          <Field name="swiftCode" as={FormInput} placeholder="Enter Your Swift Code" />
                          <ErrorMessage name="swiftCode" component="div" style={{ color: "red", marginBottom: "1rem" }} />
                        </>
                      )}

                      {selectedCountry === "Dubai" && (
                        <>
                          <FormLabel>Account Opening Branch</FormLabel>
                          <Field name="accountOpeningBranch" as={FormInput} placeholder="Enter Your Account Opening Branch" />
                          <ErrorMessage name="accountOpeningBranch" component="div" style={{ color: "red", marginBottom: "1rem" }} />

                          <FormLabel>IBAN</FormLabel>
                          <Field name="iban" as={FormInput} placeholder="Enter Your IBAN" />
                          <ErrorMessage name="iban" component="div" style={{ color: "red", marginBottom: "1rem" }} />
                        </>
                      )}

                      {selectedCountry === "India" && (
                        <>
                          <FormLabel>IFSC</FormLabel>
                          <Field name="ifsc" as={FormInput} placeholder="Enter Your IFSC" />
                          <ErrorMessage name="ifsc" component="div" style={{ color: "red", marginBottom: "1rem" }} />
                        </>
                      )}
                    </FormSection>
                    <FormButton type="submit" disabled={isSubmitting}>
                      Submit
                    </FormButton>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
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
                      {/* <Crosss>
                      <strong>IFSC:</strong> {account.IFSC}
                    </Crosss> */}
                    </Card>
                  ))}
                </CardsSection>
              </>
            )}
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default BankTransfer;