// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Footer from './Footer';
// import Navbar from './Navbar';
// import axios from 'axios';
// import { ChevronLeft } from 'lucide-react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { X } from 'lucide-react';

// const Container = styled.div`
//   background-color: #121212;
//   min-height: 100vh;
//   padding: 20px;
//   color: white;
//   /* font-family: Arial, sans-serif; */
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   margin-top: 5%;

//   @media (max-width: 430px) {
//     margin-top: 7%;
//   }
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   margin: 0;
// `;

// const AddButton = styled.button`
//   background-color: #FFA500;
//   color: white;
//   border: none;
//   padding: 8px 9px;
//   border-radius: 20px;
//   cursor: pointer;
//   font-size: 18px;
//   font-weight: bold;
//   @media (max-width: 430px) {
//     font-size: 14px;
//   }
// `;
// const BackButton = styled.button`
//   /* background-color: #FFA500; */
//   background-color: transparent;
//   color: #FFA500;
//   border: none;
//   /* padding: 8px 16px; */
//   border-radius: 20px;
//   cursor: pointer;
//   font-size: 18px;
//   font-weight: bold;
//   margin: 1rem;
//   z-index: 1001;
//   /* display: none; */
//   width: fit-content;
//   margin: 0px 5px 0px 0px;

//   @media (max-width: 1024px) { // Show on tablet and mobile
//     display: block;
//   }

//   @media (max-width: 430px) {
//     font-size: 14px;
//     top: 10px;
//     left: 10px;
//   }
// `;

// const Card = styled.div`
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
//   margin-bottom: 20px;
//   width: 380px;
//   height: 580px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 1000;
//   @media (max-width: 375px) {
// width: 100%;
//   }
//   @media (max-width: 320px) {
//     width: 100%;
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 20px;
//   color: #333;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;F
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const FormTitle = styled.h2`
//   font-size: 18px;
//   margin-top: 0;
//   margin-bottom: 20px;
//   color: #FFA500;
// `;

// const FormSection = styled.div`
//   margin-bottom: 20px;
// `;

// const FormSectionTitle = styled.h3`
//   font-size: 16px;
//   margin-bottom: 10px;
//   color: black;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #333;
//   background-color: white;
//   color: black;
//   border-radius: 5px;
// `;

// const SubmitButton = styled.button`
//   background-color: #FFA500;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: bold;
//   width: 100%;
//   margin-top: 42%;
// `;

// const AccountCard = styled.div`
//   background-color: #1E1E1E;
//   border-radius: 10px;
//   padding: 15px;
//   margin-bottom: 15px;
//   width: 400px;
//   /* margin-left: 35%;
//   margin-right: 20%; */

//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: space-between;
//   /* width: fit-content; */
// `;

// const AccountInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;

//   @media (max-width: 1024px) {
//     width: 30%;
//   }
//   @media (max-width: 430px) {
//     width: 55%;
//   }
// `;

// const AccountName = styled.span`
//   font-weight: bold;
//   margin-bottom: 5px;
//   font-size: 18px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   @media (max-width: 430px) {
//     font-size: 14px;
//   }
// `;

// const AccountDetails = styled.span`
//   color: white;
//   font-size: 18px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   @media (max-width: 430px) {
//     font-size: 14px;
//   }
// `;

// const AccountNumberValue = styled.span`
//   font-weight: bold;
//   margin-bottom: 5px;
//   font-size: 18px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   @media (max-width: 430px) {
//     font-size: 14px;
//   }
// `;

// const AccountBalance = styled.span`
//   color: #4CAF50;
//   font-weight: bold;
//   font-size: 18px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   @media (max-width: 430px) {
//     font-size: 14px;
//   }
// `;

// const DeleteButton = styled.button`
//   background-color: #FF4C4C;
//   color: white;
//   border: none;
//   font-size: 18px;
//   padding: 5px 10px;
//   border-radius: 5px;

//   width: 4rem;
//   height: 2rem;
//   cursor: pointer;
//   font-weight: bold;
//   @media (max-width: 430px) {
//     font-size: 14px;
//     margin-top: 3%;
//   }
// `;

// const Label = styled.p`
//   color: white;
//   padding-bottom: 3%;
//   white-space: pre;
//   font-size: 14px;
//   font-weight: bold;
// `;

// const Bank = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`https://crypto-backend-main.onrender.com/users/get/${token}`);
//         setAccounts(response.data.Accounts);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   const handleDelete = async (accountNumber) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`https://crypto-backend-main.onrender.com/users/del/${token}/accounts/${accountNumber}`);

//       setAccounts((prevAccounts) =>
//         prevAccounts.filter((account) => account.AccountNumber !== accountNumber)
//       );

//       toast.success('Account deleted successfully!');

//     } catch (error) {
//       console.error('Error deleting account:', error);
//       toast.error('Failed to delete account.');
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <Container>
//         <Header>


//         <BackButton onClick={() => window.history.back()}> <ChevronLeft></ChevronLeft> </BackButton><Title>Payment Methods</Title>
//           <AddButton onClick={() => setShowForm(true)}>Add new </AddButton>
//         </Header>

//         {showForm && (
//           <>
//             <Overlay onClick={() => setShowForm(false)} />
//             <Card>
//               <CloseButton onClick={() => setShowForm(false)}>
//                 <X size={24} />
//               </CloseButton>
//               <Form>
//                 <FormTitle>Add Payment Method</FormTitle>
//                 <FormSection>
//                   <FormSectionTitle>Personal Information</FormSectionTitle>
//                   <Input placeholder="Please enter your full name" />
//                   <Input placeholder="Choose your country" />
//                 </FormSection>
//                 <FormSection>
//                   <FormSectionTitle>Account Information</FormSectionTitle>
//                   <Input placeholder="Please enter your full name" />
//                   <Input placeholder="Please enter your full name" />
//                   <Input placeholder="Choose your country" />
//                 </FormSection>
//                 <SubmitButton>Submit</SubmitButton>
//               </Form>
//             </Card>
//           </>
//         )}

//         {accounts.map((account) => (
//           <AccountCard key={account.AccountNumber}>
//             <AccountInfo>
//               <AccountName><Label>Bank Name:{account.BankName}</Label> </AccountName>
//               <AccountDetails><Label>Account Name: {account.Name}</Label></AccountDetails>
//               <AccountDetails><Label>Country:{account.Country}</Label> </AccountDetails>
//               <AccountNumberValue><Label>Account No:{account.AccountNumber}</Label> </AccountNumberValue>
//               <AccountDetails><Label>IFSC:{account.IFSC}</Label> </AccountDetails>


//             </AccountInfo>
//                    <DeleteButton onClick={() => handleDelete(account.AccountNumber)}>
//               Delete
//             </DeleteButton>
//           </AccountCard>
//         ))}
//       </Container>
//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default Bank;




import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ChevronLeft } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import empty from "./../assets/empty.png";
import nobankdetails from "./../assets/no-bank-building-icon-with-textured-only-for-girls-vector-27765593-removebg-preview.png";





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
  // justify-content: space-between;
  overflow-y: hidden;
  height : auto;


  @media (max-width: 440px) {
    padding: 1rem;
    // padding-top : 2rem;
    margin: 0px 15px;
    width: 380px;
    height : auto;
  }

  @media (max-width: 400px) {
    padding: 1rem;
    // padding-top : 2rem;
    margin: 0px 15px;
    width: 360px;
    // height : 1000px;
  }

  @media (max-width: 380px) {
    padding: 1rem;
    // padding-top : 2rem;
    margin: 0px 15px;
    width: 330px;
    // height : 1000px;
  }
     @media (max-width: 320px) {
    padding: 0.75rem;
    margin: 0px 5px;
    width: 300px;

  }
     @media (max-width: 300px) {
    padding: 0.75rem;
    margin: 0px 5px;
    width: 270px;
  }
`;




const FormLabel = styled.label`
  
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  margin-top : 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 14px;
  border: 0.5px solid #ddd;
  border-radius: 1px;
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
  margin-top: 1rem;
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
   margin-top : 100px;  

  //  @media (max-width: 380px) {
  //   padding: 1rem;
  //   margin-top : 100px;
  // }
  //    @media (max-width: 320px) {
  //   padding: 0.75rem;
  //   margin-top : 30px;
  //   margin-top : 100px;

  // }

  //   @media (max-width: 360px) {
  //   padding: 0.75rem;
  //   margin-top : 180px;
  // }
  //    @media (max-width: 300px) {
  //   padding: 0.75rem;
  //   margin-top : 100px;
  // }

  // @media (max-width: 400px) {
  //   padding: 0.75rem;
  //   margin-top : 100px;
  // }

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

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  color: white;
  padding-top: 100px;
  @media (max-width: 760px) {
    padding-top: 80px;
  }
  @media (max-width: 430px) {
    padding-top: 70px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  a{
    text-decoration: none;
  }

  
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  @media (max-width: 480px) {
  width: 100%;
  font-size: 20px;
  }
`;

const AddButton = styled.a`
  background-color: #FFA500;
  color: black;
  text-decoration: none;
  border: none;
  padding: 8px ;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 430px) {
    font-size: 14px;
    display: flex;
    width: 90px;
    padding-left : 0.7rem;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #FFA500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 0 5px 0 0;
  width: fit-content;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
`;
const Maindiv = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;




const FormSection = styled.div`
  margin-bottom: 1rem;
   overflow: hidden; /* Prevents scrolling */
`;



const AccountCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  color : black;
  margin-bottom: 20px;
  /* margin-left: 30%; */
  margin-top: 3%;
 
  /* padding-right: 30%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 3%;
    margin-right: 3%;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1;

  @media (max-width: 430px) {
    margin-top: -35px;
  }
`;

const AccountName = styled.span`
  font-weight: 400;
  /* margin-bottom: 5px; */
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color : black;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountDetails = styled.span`
  color: black;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountNumberValue = styled.span`
  font-weight: 400  ;
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;



const DeleteButton = styled.button`
  background-color: #FF4C4C;
  color: white;
  border: none;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;

  &:hover {
    background-color: #e03a3a;
  }

  @media (max-width: 430px) {
    position: static;
    margin-top: 15px;
    width: 100%;
  }
`;

const Label = styled.p`
  color: black;
  /* white-space: pre; */
  font-size: 14px;
  font-weight: bold;
`;
const Col1 = styled.div`
width: 150px;
`;
const Col2 = styled.div`
width: max-content;
`;
const Maincol = styled.div`
/* width: 100%;y */
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
width: 100%;
margin-top: 2%;
/* gap: 10%; */
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
  color: white; // Text color
  font-weight : 600;
  text-align: center; // Center align the text
  margin-top: 35px; // Additional margin for consistency
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #ffa500;
  font-weight: bold;
  margin-top: 20px;
`;

// Base schema for common fields
const baseSchema = {
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters")
    .required("First name is required"),

  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters")
    .required("Last name is required"),

  bankName: Yup.string()
    .required("Bank name is required"),

  accountNumber: Yup.string()
    .matches(/^\d+$/, "Account number must be a number")
    .required("Account number is required"),
};

// Country-specific schemas
const countrySchemas = {
  USA: Yup.object().shape({
    ...baseSchema,
    city: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "City can only contain letters")
      .required("City is required"),
    state: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "State can only contain letters")
      .required("State is required"),
    zipCode: Yup.string()
      .matches(/^\d+$/, "Zip code must be a number")
      .required("Zip code is required"),
    address: Yup.string().required("Address is required"),
    accountType: Yup.string().required("Account type is required"),
    abaCode: Yup.string()
      .matches(/^\d{9}$/, "ABA code must be a 9-digit number")
      .required("ABA code is required"),
  }),

  Brazil: Yup.object().shape({
    ...baseSchema,
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string()
      .matches(/^\d+$/, "ID number must be a number")
      .required("ID number is required"),
    bankBranchCode: Yup.string().required("Bank branch code is required"),
    accountType: Yup.string().required("Account type is required"),
  }),

  UK: Yup.object().shape({
    ...baseSchema,
    sortCode: Yup.string()
      .matches(/^\d{6}$/, "Sort code must be a 6-digit number")
      .required("Sort code is required"),
  }),

  UAE: Yup.object().shape({
    ...baseSchema,
    accountOpeningBranch: Yup.string().required("Account opening branch is required"),
    iban: Yup.string().required("IBAN is required"),
  }),

  India: Yup.object().shape({
    ...baseSchema,
    ifsc: Yup.string().required("IFSC is required"),
  }),

  // Add more countries as needed...
};

// Function to get the validation schema based on the selected country
const getValidationSchema = (selectedCountry) => {
  return countrySchemas[selectedCountry] || Yup.object().shape(baseSchema);
};

const Bank = () => {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const selectedCountry = useSelector((state) => state.country.value);
  const [loading, setLoading] = useState(true); // Add loading state

 
useEffect(() => {
  const fetchAccounts = async () => {
    setLoading(true); // Start loading
    const email = localStorage.getItem("token");
    try {
      const response = await axios.get(`https://crypto-backend-main.onrender.com/account-details/bank/all/${email}`);
      const filteredData = response.data.filter(val => val.Country === countryObject[selectedCountry].name);
      setAccounts(filteredData.reverse());
    } catch (error) {
      console.error("Error fetching Accounts:", error);
    } finally {
      setLoading(false); // Always set loading to false after fetching
    }
  };

  fetchAccounts();
}, [selectedCountry]);

console.log("bank",accounts);
const handleDelete = async (id) => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/${id}`);
    toast.success('Account deleted successfully!');
    const response = await axios.get(`https://crypto-backend-main.onrender.com/account-details/bank/all/${token}`);
    const filteredData = response.data.filter(val => val.Country === countryObject[selectedCountry].name);
    setAccounts(filteredData.reverse());
  } catch (error) {
    console.error('Error deleting account:', error);
    toast.error('Failed to delete account.');
  } finally {
    setLoading(false); // Always set loading to false after the operation
  }
};
  return (
    <>
      <Navbar />
      <Container>
        <Header>
          <div style={{ display: "flex" }}>
            <BackButton onClick={() => window.history.back()}><ChevronLeft /></BackButton>
            <Title>Bank Accounts</Title>
          </div>
          {showForm ? <AddButton onClick={() => setShowForm(false)}>View Bank</AddButton> : <AddButton onClick={() => setShowForm(true)}>Add Bank</AddButton>}
          
        </Header>

        <Maindiv>
          {
            loading ? (
              <LoadingText>Loading...</LoadingText>
            ) : 
          accounts.length === 0  && !showForm  ? (
            // Fallback view when there are no bank details
            <NoHistoryContainer>                                    
            <IconContainer>
              <img
                src={nobankdetails}
                alt="Empty Icon"
                style={{
                  height: "120px",
                  width: "120px",
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
            </NoHistoryContainer>
          )  : (showForm ? (

            <Formik
              initialValues={{
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
              }}
              validationSchema={getValidationSchema(selectedCountry)} // Use the function here
              onSubmit={async (values, { setSubmitting, resetForm }) => {
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
                } else if (selectedCountry === "UAE") {
                  submissionData.OpeningBranch = values.accountOpeningBranch;
                  submissionData.IBAN = values.iban;
                } else if (selectedCountry === "India") {
                  submissionData.IFSC = values.ifsc;
                }

                const url = `https://crypto-backend-main.onrender.com/account-details/${countryObject[selectedCountry].urlName}/add`;

                try {
                  await axios.post(url, submissionData);
                  toast.success("Data saved successfully!");
                  resetForm(); // Reset the form fields after successful submission
                  setShowForm(false);
                } catch (error) {
                  toast.error("Failed to save data.");
                  console.error("Error:", error.response ? error.response.data : error.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <FormWrapper>
                  <FormContainer>
                  <CloseButton onClick={() => setShowForm(false)}>
    <X size={24} /> {/* Replace <X /> with an icon of your choice */}
  </CloseButton>
                    <form onSubmit={handleSubmit}>
                      <FormSection>
                        <FormLabel>First Name</FormLabel>
                        <FormInput
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Please enter your First name"
                        />
                        {errors.firstName && touched.firstName && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.firstName}</div>}

                        <FormLabel>Last Name</FormLabel>
                        <FormInput
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Please enter your Last name"
                        />
                        {errors.lastName && touched.lastName && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.lastName}</div>}

                        <FormLabel>Bank Name</FormLabel>
                        <FormInput
                          name="bankName"
                          value={values.bankName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Your Bank Name"
                        />
                        {errors.bankName && touched.bankName && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.bankName}</div>}

                        <FormLabel>Account Number</FormLabel>
                        <FormInput
                          name="accountNumber"
                          value={values.accountNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Your Account Number"
                        />
                        {errors.accountNumber && touched.accountNumber && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.accountNumber}</div>}

                        {/* Conditional Fields Based on Selected Country */}
                        {selectedCountry === "USA" && (
                          <>
                            <FormLabel>City</FormLabel>
                            <FormInput
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter City"
                            />
                            {errors.city && touched.city && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.city}</div>}

                            <FormLabel>State</FormLabel>
                            <FormInput
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your State"
                            />
                            {errors.state && touched.state && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.state}</div>}

                            <FormLabel>Address</FormLabel>
                            <FormInput
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter address"
                            />
                            {errors.address && touched.address && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.address}</div>}

                            <FormLabel>Zip Code</FormLabel>
                            <FormInput
                              name="zipCode"
                              value={values.zipCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter zipCode"
                            />
                            {errors.zipCode && touched.zipCode && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.zipCode}</div>}

                            <FormLabel>Account Type</FormLabel>
                            <Select
                              name="accountType"
                              value={values.accountType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter accountType"
                            >
                              <option value="">Select Account Type</option>
                              <option value="Saving">Saving</option>
                              <option value="Checking">Checking</option>
                            </Select>
                            {errors.accountType && touched.accountType && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.accountType}</div>}

                            <FormLabel>ABA Code</FormLabel>
                            <FormInput
                              name="abaCode"
                              value={values.abaCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter abaCode"
                            />
                            {errors.abaCode && touched.abaCode && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.abaCode}</div>}

                          </>
                        )}

                        {selectedCountry === "Brazil" && (
                          <>
                            <FormLabel>Account Type</FormLabel>
                            <Select
                              name="accountType"
                              value={values.accountType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter accountType"
                            >
                              <option value="">Select Account Type</option>
                              <option value="Saving">Saving</option>
                              <option value="Checking">Checking</option>
                            </Select>
                            {errors.accountType && touched.accountType && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.accountType}</div>}

                            <FormLabel>ID Type</FormLabel>
                            <Select
                              name="idType"
                              value={values.idType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Id Type"
                            >
                              <option value="">Select ID Type</option>
                              <option value="Passport">Passport</option>
                              <option value="ID Card">ID Card</option>
                            </Select>
                            {errors.idType && touched.idType && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.idType}</div>}

                            <FormLabel>ID Number</FormLabel>
                            <FormInput
                              name="idNumber"
                              value={values.idNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Id Number"
                            />
                            {errors.idNumber && touched.idNumber && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.idNumber}</div>}

                            <FormLabel>Bank Branch Code</FormLabel>
                            <FormInput
                              name="bankBranchCode"
                              value={values.bankBranchCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Code"
                            />
                            {errors.bankBranchCode && touched.bankBranchCode && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.bankBranchCode}</div>}
                          </>
                        )}

                        {selectedCountry === "UK" && (
                          <>
                            <FormLabel>Sort Code</FormLabel>
                            <FormInput
                              name="sortCode"
                              value={values.sortCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Sort Code"
                            />
                            {errors.sortCode && touched.sortCode && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.sortCode}</div>}

                            <FormLabel>Address</FormLabel>
                            <FormInput
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Please enter address"
                            />
                            {errors.address && touched.address && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.address}</div>}

                          </>
                        )}

                        {selectedCountry === "Euro" && (
                          <>
                            <FormLabel>ABA Code</FormLabel>
                            <FormInput
                              name="abaCode"
                              value={values.abaCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Branch"
                            />
                            {errors.abaCode && touched.abaCode && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.abaCode}</div>}

                            <FormLabel>Swift Code</FormLabel>
                            <FormInput
                              name="swiftCode"
                              value={values.swiftCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your swiftCode"
                            />
                            {errors.swiftCode && touched.swiftCode && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.swiftCode}</div>}
                          </>
                        )}

                        {selectedCountry === "UAE" && (
                          <>
                            <FormLabel>Account Opening Branch</FormLabel>
                            <FormInput
                              name="accountOpeningBranch"
                              value={values.accountOpeningBranch}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Branch"
                            />
                            {errors.accountOpeningBranch && touched.accountOpeningBranch && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.accountOpeningBranch}</div>}

                            <FormLabel>IBAN</FormLabel>
                            <FormInput
                              name="iban"
                              value={values.iban}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your IBAN"
                            />
                            {errors.iban && touched.iban && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.iban}</div>}
                          </>
                        )}

                        {selectedCountry === "India" && (
                          <>
                            <FormLabel>IFSC</FormLabel>
                            <FormInput
                              name="ifsc"
                              value={values.ifsc}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your IFSC"
                            />
                            {errors.ifsc && touched.ifsc && <div style={{ color: "red", marginBottom: "1rem" }}>{errors.ifsc}</div>}
                          </>
                        )}

                        <FormWarning>
                          Attention: Please ensure the bank account belongs to you and
                          the information is accurate.
                        </FormWarning>

                        <FormButton type="submit" disabled={isSubmitting}>
                          Add Bank Account
                        </FormButton>
                      </FormSection>
                    </form>
                  </FormContainer>
                </FormWrapper>
              )}
            </Formik>
          )  : (
            accounts.map((account) => (
              <AccountCard key={account.AccountNumber}>
                <AccountInfo>
                  <br /><br />
                  <AccountName>
                    <Maincol>
                      <Col1><Label>Bank Name:</Label></Col1>
                      <Col2>{account.BankName}</Col2>
                    </Maincol>
                  </AccountName>
                  <AccountDetails>
                    <Maincol>
                      <Col1><Label> A/C Holder Name:</Label></Col1>
                      <Col2>{account.FirstName} {account.LastName}</Col2>
                    </Maincol>
                  </AccountDetails>
                  <AccountNumberValue>
                    <Maincol>
                      <Col1><Label>Account No:</Label></Col1>
                      <Col2>{account.AccountNo}</Col2>
                    </Maincol>
                  </AccountNumberValue>

                  {/* Conditional rendering based on country */}
                  {selectedCountry === "USA" && (
                    <>
                      {/* <AccountDetails>
                        <Maincol>
                          <Col1><Label>City:</Label></Col1>
                          <Col2>{account.City}</Col2>
                        </Maincol>
                      </AccountDetails> */}
                      {/* <AccountDetails>
                        <Maincol>
                          <Col1><Label>State:</Label></Col1>
                          <Col2>{account.State}</Col2>
                        </Maincol>
                      </AccountDetails> */}
                      {/* <AccountDetails>
                        <Maincol>
                          <Col1><Label>Zip Code:</Label></Col1>
                          <Col2>{account.ZipCode}</Col2>
                        </Maincol>
                      </AccountDetails> */}
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>Account Type:</Label></Col1>
                          <Col2>{account.AccountType}</Col2>
                        </Maincol>
                      </AccountDetails>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>ABA Code:</Label></Col1>
                          <Col2>{account.ABACode}</Col2>
                        </Maincol>
                      </AccountDetails>
                    </>
                  )}

                  {selectedCountry === "Brazil" && (
                    <>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>Account Type:</Label></Col1>
                          <Col2>{account.AccountType}</Col2>
                        </Maincol>
                      </AccountDetails>
                      {/* <AccountDetails>
                        <Maincol>
                          <Col1><Label>ID Type:</Label></Col1>
                          <Col2>{account.IDType}</Col2>
                        </Maincol>
                      </AccountDetails> */}
                      {/* <AccountDetails>
                        <Maincol>
                          <Col1><Label>ID Number:</Label></Col1>
                          <Col2>{account.IDNumber}</Col2>
                        </Maincol>
                      </AccountDetails> */}
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>Bank Branch Code:</Label></Col1>
                          <Col2>{account.BranchCode}</Col2>
                        </Maincol>
                      </AccountDetails>
                    </>
                  )}

                  {selectedCountry === "UK" && (
                    <>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>Sort Code:</Label></Col1>
                          <Col2>{account.SortCode}</Col2>
                        </Maincol>
                      </AccountDetails>
                      {/* <AccountDetails>
                        <Maincol>
                          <Col1><Label>Address:</Label></Col1>
                          <Col2>{account.Address}</Col2>
                        </Maincol>
                      </AccountDetails> */}
                    </>
                  )}

                  {selectedCountry === "Euro" && (
                    <>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>ABA Code:</Label></Col1>
                          <Col2>{account.ABACode}</Col2>
                        </Maincol>
                      </AccountDetails>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>Swift Code:</Label></Col1>
                          <Col2>{account.SwiftCode}</Col2>
                        </Maincol>
                      </AccountDetails>
                    </>
                  )}

                  {selectedCountry === "Dubai" && (
                    <>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>Account Opening Branch:</Label></Col1>
                          <Col2>{account.OpeningBranch}</Col2>
                        </Maincol>
                      </AccountDetails>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>IBAN:</Label></Col1>
                          <Col2>{account.IBAN}</Col2>
                        </Maincol>
                      </AccountDetails>
                    </>
                  )}

                  {selectedCountry === "India" && (
                    <>
                      <AccountDetails>
                        <Maincol>
                          <Col1><Label>IFSC:</Label></Col1>
                          <Col2>{account.IFSC}</Col2>
                        </Maincol>
                      </AccountDetails>
                    </>
                  )}
                </AccountInfo>
                <DeleteButton onClick={() => handleDelete(account._id)}>
                  Delete
                </DeleteButton>
              </AccountCard>
            ))
          )
          )}
        </Maindiv>
      </Container>
      {/* <Footer/> */}
      <ToastContainer />
    </>
  );
};

export default Bank;