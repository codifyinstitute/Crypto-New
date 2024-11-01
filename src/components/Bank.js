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
  height: 80vh;
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




const Bank = () => {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  const selectedCountry = useSelector((state) => state.country.value);
  const [form, setForm] = useState(true);


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

  useEffect(() => {
    const email = localStorage.getItem("token");
    axios
      .get(`https://crypto-backend-main.onrender.com/account-details/bank/all/${email}`)
      .then((response) => {
        // console.log(response.data)
        const filData = response.data.filter(val => val.Country === countryObject[selectedCountry].name);
        console.log()
        setAccounts(filData.reverse());
      })
      .catch((error) => {
        console.error("Error fetching Accounts:", error);
      });
  }, [selectedCountry])

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

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.get(`https://crypto-backend-main.onrender.com/users/get/${token}`);
  //       setAccounts(response.data.Accounts);
  //     } catch (error) {
  //       console.error('Error fetching accounts:', error);
  //     }
  //   };

  //   fetchAccounts();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? console.log() : navigate("/sell2");
  }, [])

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
          <div style={{display:"flex", gap:"20px"}}>
          <BackButton onClick={() => window.history.back()}><ChevronLeft /></BackButton>
          <Title>Bank Accounts</Title>
          </div>
          
          <AddButton onClick={() => setShowForm(true)}>Add Bank</AddButton>
          {/* <Link to='/Sell3'><AddButton>ADD new</AddButton></Link> */}
        </Header>

        {showForm && (
          <>
            <Overlay onClick={() => setShowForm(false)} />
            <Card>
              <CloseButton onClick={() => setShowForm(false)}>
                <X size={24} />
              </CloseButton>
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
                      <Tab>Add Bank Account</Tab>
                    </Left>
                    {/* {form ? (
                      <Button onClick={AddAccount}>Choose Account</Button>
                    ) : (
                      <Button onClick={AddAccount}>Add Account +</Button>
                    )} */}
                  </TabContainer>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
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
                        Add Bank Account
                        <IoArrowForwardOutline />
                      </FormButton>
                    </div>
                  </form> 
                </FormContainer>
              </FormWrapper>
            </Card>
          </>
        )}
        <Maindiv>
          {accounts.map((account) => (
            <AccountCard key={account.AccountNumber}>
              <AccountInfo><br /><br />
                <AccountName><Maincol><Col1><Label>   Bank Name  </Label></Col1>   <Col2>      {account.BankName} </Col2> </Maincol> </AccountName>
                <AccountDetails><Maincol><Col1><Label>Account Name</Label></Col1>     <Col2>          {account.FirstName} {account.LastName}</Col2>  </Maincol> </AccountDetails>

                <AccountNumberValue><Maincol><Col1><Label>Account No</Label> </Col1>    <Col2>        {account.AccountNo}</Col2> </Maincol> </AccountNumberValue>
                {/* <AccountDetails><Maincol><Col1><Label>IFSC</Label>      </Col1>       <Col2>   {account.IFSC}</Col2></Maincol> </AccountDetails> */}
                <AccountDetails><Maincol><Col1><Label>Country</Label> </Col1>       <Col2>         {account.Country}</Col2></Maincol>  </AccountDetails>
              </AccountInfo>
              <DeleteButton onClick={() => handleDelete(account.AccountNumber)}>
                Delete
              </DeleteButton>
            </AccountCard>
          ))}
        </Maindiv>
      </Container>
      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
};

export default Bank;
