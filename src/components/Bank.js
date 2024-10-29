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
//         const response = await axios.get(`https://crypto-tusv.onrender.com/users/get/${token}`);
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
//       await axios.delete(`https://crypto-tusv.onrender.com/users/del/${token}/accounts/${accountNumber}`);

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
  color: white;
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
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed; /* Changed to fixed to keep it on top */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;

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

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://crypto-tusv.onrender.com/users/get/${token}`);
        setAccounts(response.data.Accounts);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? console.log() : navigate("/sell2");
  }, [])

  const handleDelete = async (accountNumber) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://crypto-tusv.onrender.com/users/del/${token}/accounts/${accountNumber}`);

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
          <BackButton onClick={() => window.history.back()}><ChevronLeft /></BackButton>
          <Title>Bank Accounts</Title>
          {/*<AddButton onClick={() => setShowForm(true)}>Add New</AddButton>*/}
          <Link to='/Sell3'><AddButton>ADD new</AddButton></Link>
        </Header>

        {showForm && (
          <>
            <Overlay onClick={() => setShowForm(false)} />
            <Card>
              <CloseButton onClick={() => setShowForm(false)}>
                <X size={24} />
              </CloseButton>
              <Form>
                <FormTitle>Add New Bank</FormTitle>
                <FormSection>
                  <FormSectionTitle>Personal Information</FormSectionTitle>
                  <Input placeholder="Please enter your full name" />
                  <Input placeholder="Enter your country" />
                </FormSection>
                <FormSection>
                  <FormSectionTitle>Account Information</FormSectionTitle>
                  <Input placeholder="Please enter your bank name" />
                  <Input placeholder="Please enter your account number" />
                  <Input placeholder="Enter your IFSC code" />
                </FormSection>
                <SubmitButton>Submit</SubmitButton>
              </Form>
            </Card>
          </>
        )}
<Maindiv>
        {accounts.map((account) => (
          <AccountCard key={account.AccountNumber}>
            <AccountInfo><br/><br/>
              <AccountName><Maincol><Col1><Label>   Bank Name  </Label></Col1>   <Col2>      {account.BankName} </Col2> </Maincol> </AccountName>
              <AccountDetails><Maincol><Col1><Label>Account Name</Label></Col1>     <Col2>          {account.Name}</Col2>  </Maincol> </AccountDetails>
              
              <AccountNumberValue><Maincol><Col1><Label>Account No</Label> </Col1>    <Col2>        {account.AccountNumber}</Col2> </Maincol> </AccountNumberValue>
              <AccountDetails><Maincol><Col1><Label>IFSC</Label>      </Col1>       <Col2>   {account.IFSC}</Col2></Maincol> </AccountDetails>
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
