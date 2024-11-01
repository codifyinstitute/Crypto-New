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
//   top: 0;
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
  justify-content: space-between;
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
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 430px) {
    font-size: 14px;
    display: flex;
    width: 93px;
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

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 380px;
  height: fit-content;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed; /* Changed to fixed to keep it on top */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  overflow: hidden; /* Hide the scrollbar */

  /* Custom scrollbar styling for WebKit browsers */
  &::-webkit-scrollbar {
    width: 0; /* Hide scrollbar */
    background: transparent; /* Optional: make background transparent */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent; /* Optional: style the scrollbar thumb */
  }

  /* Ensuring scroll functionality remains */
  &:hover {
    overflow-y: auto; /* Show scrollbar on hover */
  }

  @media (max-width: 430px) {
    padding: 15px;
  }
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Ensure this is lower than Card's z-index */
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2000;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #FFA500;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormSectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #333;
  background-color: white;
  color: black;
  border-radius: 5px;

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountCard = styled.div`
  background-color: #1E1E1E;
  border-radius: 10px;
  padding: 20px;
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
`;

const AccountName = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountDetails = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountNumberValue = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountBalance = styled.span`
  color: #4CAF50;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* justify-content: space-between; */

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
  color: white;
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
    accountType: Yup.string().required("Account type is required"),
  }),

  Brazil: Yup.object().shape({
    ...baseSchema,
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string()
      .matches(/^\d+$/, "ID number must be a number")
      .required("ID number is required"),
    bankBranchCode: Yup.string().required("Bank branch code is required"),
    abaCode: Yup.string()
      .matches(/^\d{9}$/, "ABA code must be a 9-digit number")
      .required("ABA code is required"),
  }),

  UK: Yup.object().shape({
    ...baseSchema,
    sortCode: Yup.string()
      .matches(/^\d{6}$/, "Sort code must be a 6-digit number")
      .required("Sort code is required"),
  }),

  Dubai: Yup.object().shape({
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

  useEffect(() => {
    const email = localStorage.getItem("token");
    axios
      .get(`https://crypto-backend-main.onrender.com/account-details/bank/all/${email}`)
      .then((response) => {
        const filData = response.data.filter(val => val.Country === countryObject[selectedCountry].name);
        setAccounts(filData.reverse());
      })
      .catch((error) => {
        console.error("Error fetching Accounts:", error);
      });
  }, [selectedCountry]);

  const handleDelete = async (accountNumber) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://crypto-backend-main.onrender.com/users/del/${token}/accounts/${accountNumber}`);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.AccountNumber !== accountNumber)
      );
      toast.success('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Header>
          <div style={{ display: "flex", gap: "20px" }}>
            <BackButton onClick={() => window.history.back()}><ChevronLeft /></BackButton>
            <Title>Bank Accounts</Title>
          </div>
          {showForm?<AddButton onClick={() => setShowForm(false)}>View Bank</AddButton>:<AddButton onClick={() => setShowForm(true)}>Add Bank</AddButton>}
          
        </Header>

        <Maindiv>
          {showForm ? (
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
              
                // Add country-specific fields
                if (selectedCountry === "USA") {
                  submissionData.City = values.city;
                  submissionData.State = values.state;
                  submissionData.Address = values.address;
                  submissionData.ZipCode = values.zipCode;
                  submissionData.AccountType = values.accountType;
                } else if (selectedCountry === "Brazil") {
                  submissionData.AccountType = values.accountType;
                  submissionData.IDType = values.idType;
                  submissionData.IDNumber = values.idNumber;
                  submissionData.BranchCode = values.bankBranchCode;
                  submissionData.ABACode = values.abaCode;
                } else if (selectedCountry === "UK") {
                  submissionData.SortCode = values.sortCode;
                  submissionData.Address = values.address;
                } else if (selectedCountry === "Dubai") {
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
                        {errors.firstName && touched.firstName && <div style={{color:"red",marginBottom:"1rem"}}>{errors.firstName}</div>}

                        <FormLabel>Last Name</FormLabel>
                        <FormInput
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Please enter your Last name"
                        />
                        {errors.lastName && touched.lastName && <div style={{color:"red",marginBottom:"1rem"}}>{errors.lastName}</div>}

                        <FormLabel>Bank Name</FormLabel>
                        <FormInput
                          name="bankName"
                          value={values.bankName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Your Bank Name"
                        />
                        {errors.bankName && touched.bankName && <div style={{color:"red",marginBottom:"1rem"}}>{errors.bankName}</div>}

                        <FormLabel>Account Number</FormLabel>
                        <FormInput
                          name="accountNumber"
                          value={values.accountNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Your Account Number"
                        />
                        {errors.accountNumber && touched.accountNumber && <div style={{color:"red",marginBottom:"1rem"}}>{errors.accountNumber}</div>}

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
                            {errors.city && touched.city && <div style={{color:"red",marginBottom:"1rem"}}>{errors.city}</div>}

                            <FormLabel>State</FormLabel>
                            <FormInput
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your State"
                            />
                            {errors.state && touched.state && <div style={{color:"red",marginBottom:"1rem"}}>{errors.state}</div>}
                          </>
                        )}

                        {selectedCountry === "Brazil" && (
                          <>
                            <FormLabel>ID Type</FormLabel>
                            <FormInput
                              name="idType"
                              value={values.idType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Id Type"
                            />
                            {errors.idType && touched.idType && <div style={{color:"red",marginBottom:"1rem"}}>{errors.idType}</div>}

                            <FormLabel>ID Number</FormLabel>
                            <FormInput
                              name="idNumber"
                              value={values.idNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Id Number"
                            />
                            {errors.idNumber && touched.idNumber && <div style={{color:"red",marginBottom:"1rem"}}>{errors.idNumber}</div>}

                            <FormLabel>Bank Branch Code</FormLabel>
                            <FormInput
                              name="bankBranchCode"
                              value={values.bankBranchCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Code"
                            />
                            {errors.bankBranchCode && touched.bankBranchCode && <div style={{color:"red",marginBottom:"1rem"}}>{errors.bankBranchCode}</div>}
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
                            {errors.sortCode && touched.sortCode && <div style={{color:"red",marginBottom:"1rem"}}>{errors.sortCode}</div>}
                          </>
                        )}

                        {selectedCountry === "Dubai" && (
                          <>
                            <FormLabel>Account Opening Branch</FormLabel>
                            <FormInput
                              name="accountOpeningBranch"
                              value={values.accountOpeningBranch}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your Branch"
                            />
                            {errors.accountOpeningBranch && touched.accountOpeningBranch && <div style={{color:"red",marginBottom:"1rem"}}>{errors.accountOpeningBranch}</div>}

                            <FormLabel>IBAN</FormLabel>
                            <FormInput
                              name="iban"
                              value={values.iban}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter Your IBAN"
                            />
                            {errors.iban && touched.iban && <div style={{color:"red",marginBottom:"1rem"}}>{errors.iban}</div>}
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
                            {errors.ifsc && touched.ifsc && <div style={{color:"red",marginBottom:"1rem"}}>{errors.ifsc}</div>}
                          </>
                        )}

                        <FormButton type="submit" disabled={isSubmitting}>
                          Add Bank Account
                        </FormButton>
                      </FormSection>
                    </form>
                  </FormContainer>
                </FormWrapper>
              )}
            </Formik>
          ) : (
            accounts.map((account) => (
              <AccountCard key={account.AccountNumber}>
                <AccountInfo>
                  <AccountName>
                    <div>Bank Name: {account.BankName}</div>
                    <div>Account Holder: {account.FirstName} {account.LastName}</div>
                    <div>Account No: {account.AccountNo}</div>
                    <div>Country: {account.Country}</div>
                  </AccountName>
                </AccountInfo>
                <DeleteButton onClick={() => handleDelete(account.AccountNumber)}>
                  Delete
                </DeleteButton>
              </AccountCard>
            ))
          )}
        </Maindiv>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Bank;