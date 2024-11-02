import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import { ChevronLeft } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import wallet from "../assets/wallet3.png";
import newWallet from "../assets/new icon/newWallet.png";


import coin from "../assets/tether2.png";
import deposit from "../assets/depositimg.jpg";
import withdraw from "../assets/withdraw.jpg";
import withdrawicon from "../assets/withdrawicon-removebg-preview.png";
import DEPOSIT__2_ from "../assets/DEPOSIT__2_-removebg-preview.png";

import { AiOutlineHistory } from "react-icons/ai";
import { PiSpeakerHighFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  padding-top: 50px;

  @media (max-width: 480px) {
    padding-top: 80px;
  }
`;




const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const Part = styled.div`
  background-color: orange;
  width: 100%;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  color: white;
  /* padding: 2rem; */
  border-radius: 0.5rem;
  width: 380px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height : 750px;
  @media (max-width: 380px) {
    /* padding: 1rem; */
    // margin: 0px 15px;
  height : 750px;
    width: 100%;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  display: flex;
  align-items: center;
  width: 83%;

  margin: 1rem;
`;

const WalletIcon = styled.div`
  font-size: 2rem;
  color: #f7a600;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 65px;
    height: 65px;
  }
`;

const Balance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  color: black;
  margin-bottom: 1rem;

  p {
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-right: 12px;
    font-weight: bold;
    background-color: #2b9178;
    border-radius: 4px;
    color: white;
  }

  img {
    margin-left: 5px;
    width: 25px;
    height: 25px;
  }
`;


const LoginButton = styled.button`
  background-color: black;
  color: white;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  margin-bottom: 1.5rem;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  border: 1px solid black;


  &:hover {
    background-color: white;
    color: black;
  }
`;

const ActionButtons = styled.div`
display: flex;
justify-content: space-around;
width: 100%;
max-width: 300px;
margin-bottom: 1rem;
`;

const Deposit = styled.div`
color: black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1rem;
border-radius: 8px;
transition: transform 0.2s ease; /* Smooth transition for hover effect */

&:hover {
  transform: scale(1.05); /* Slightly scales up the button */
}

div {
  border-radius: 5px;
  width: 60px;
  height: 50px;
  overflow: hidden; /* Ensures image fits in rounded div */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Light shadow effect for the image */
  transition: box-shadow 0.2s ease; /* Smooth shadow transition */

  
}

img {
  width: 50px;
  height: 50px;
  // border-radius: 50%;
 
}
`;


const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background-color: ${({ isDeposit }) => (isDeposit ? "#00b4d8" : "#6c757d")};
  color: white;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
const slideUp = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  90% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ededec;
`;

const Text = styled.div`
  display: inline-block;
  animation: ${slideUp} 2s ease-in-out infinite;
  white-space: nowrap;
  margin-left: 8px;
`;

// -------------------------------------------------

const Part2 = styled.div`
  width: 90%;
  @media (max-width: 480px) {
    width: 95%;
  }
`;

const Container = styled.div`
  background: linear-gradient(
    112.77deg,
    rgba(222, 209, 254, 0.2) -0.92%,
    rgba(247, 166, 0, 0.2) 103.89%
  );

  color: white;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  margin: 10px auto;
  font-family: Arial, sans-serif;

  @media (max-width: 500px) {
    width: 90%;
    padding: 10px;
  }
`;

const Price = styled.span`
  font-size: 30px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 50px;
  }
`;

const TableContainer = styled.div`
  background-color: orange;
  border-radius: 10px;
  padding: 9px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 0px;
  border: 1px solid orange;

  tbody {
    background-color: white;
    border: 1px solid orange;
  }
`;

const Subtext = styled.p`
  text-align: center;
  margin-bottom: 16px;
  color: black;
  font-size: 14px;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const TableHeader = styled.th`
  text-align: center;
  font-weight: normal;
  color: black;
  border: 1px solid orange;
  font-weight: 800;
  font-size: 17px;
  padding: 8px;
`;

const TableCell = styled.td`
  font-size: 14px;
  padding: 10px;
  color: black;
  border: 1px solid orange;
  text-align: center;
`;

const TableFooter = styled.p`
  text-align: center;
  margin-top: 8px;
  font-size: 16px;
  color: black;
`;

const PriceDisplay = styled.div`
  text-align: center;
  margin-bottom: 16px;
  color: black;
`;

const countryObject = {
  India: {
    urlName: "india",
    symbol: "₹",
    name: "India",
    fait: "INR"
  },
  Brazil: {
    urlName: "brl",
    symbol: "R$",
    name: "Brazil",
    fait: "BRL"
  },
  UK: {
    urlName: "uk",
    symbol: "£",
    name: "United Kingdom",
    fait: "GBP"
  },
  Euro: {
    urlName: "euro",
    symbol: "€",
    name: "European Union",
    fait: "EUR"
  },
  Dubai: {
    urlName: "aed",
    symbol: "د.إ",
    name: "Dubai",
    fait: "AED"
  },
  USA: {
    urlName: "usa",
    symbol: "$",
    name: "United States of America",
    fait: "USD"
  }
}

const Wallet = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const navigate = useNavigate();
  const [walletAmount, setWalletAmount] = useState("0");
  const [login, setLogin] = useState(false);
  const handleDepositclick = () => {
    navigate('/deposit')
  }
  const handleWithdrawclick = () => {
    navigate('/withdraw')
  }

  const dataEntries = [
    "13:00 98***1233 sold for $388",
    "13:02 88***1234 sold for $400",
    "13:05 77***5678 sold for $290",
    "13:08 66***6789 sold for $310",
    "13:10 55***7890 sold for $450",
    "13:12 44***8901 sold for $320"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dataEntries.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const token = localStorage.getItem("token");
  const fetchWallet = async () => {
    try {
      const response = await fetch(`http://localhost:8000/wallet/get/${token}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWalletAmount(data.Amount);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? setLogin(true) : setLogin(false);
  }, [])


  const handleBackClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ToastContainer />
        <FormWrapper>
          <FormContainer>
            <Part>
              <BackButton onClick={handleBackClick}>
                <ChevronLeft />
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "23px",
                  }}
                >
                  {" "}
                  Wallet
                </p>
              </BackButton>
              <WalletIcon>
                <img src={newWallet} alt="wallet"></img>
              </WalletIcon>
              <Balance>
      <p>
        <span style={{
          backgroundColor: "#d3d3d3",
          paddingTop: "5px",
          paddingRight: "6px",
           borderRadius: "4px 0px 0px 4px"
        }}>
          <img src={coin} alt="coin" />
        </span>
        <span style={{
          marginLeft: "8px",
          marginRight: "8px",
          paddingLeft: "10px",
          minWidth: "50px", // Set a minimum width
          width: "auto", // Allow the width to grow as needed
          display: "inline-block" // Ensure it behaves like a block element
        }}>
          {walletAmount}
        </span>
      </p>
      <span style={{ fontSize: "16px", marginTop: "7px", fontWeight: "700" }}>Wallet balance</span>
    </Balance>
            </Part>
            {login ? null : <LoginButton>Login to Deposit</LoginButton>}

            <ActionButtons>
                <Deposit onClick={handleDepositclick}>
                  <div>
                    <img src={DEPOSIT__2_} style={{ height: "80px", width: "80px" ,marginTop :  "10px" }} alt="Deposit"  />
                  </div>
                  <span style={{ fontWeight: 700 }}>Deposit</span>
                </Deposit>

                
               <Deposit onClick={handleWithdrawclick}>
                  <div>
                    <img src={withdrawicon} alt="Withdraw" style={{ height: "60px", width: "65px" }} />
                  </div>
                  <span style={{ fontWeight: 700 }}>Withdraw</span>
                </Deposit>
            </ActionButtons>

            <Banner>
              <PiSpeakerHighFill
                style={{
                  borderRight: "1px solid",
                  marginRight: "13px",
                  paddingRight: "4px",
                  fontSize: "19px",
                }}
              />
              <Text>{dataEntries[index]}</Text>
            </Banner>
            <Part2>
              <Container>
                <PriceDisplay>
                  <Price> {countryObject[selectedCountry].symbol} 90</Price>
                </PriceDisplay>
                <Subtext>1 USDT = {countryObject[selectedCountry].symbol} 1111</Subtext>
                <Center>
                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <TableHeader>Exchange</TableHeader>
                          <TableHeader align="right">Price</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <TableCell>
                            <b>1075 + USDT </b>
                          </TableCell>
                          <TableCell>
                            <b>11111 + 0.25</b>
                          </TableCell>
                        </tr>
                        <tr>
                          <TableCell>
                            <b>2150 + USDT </b>
                          </TableCell>
                          <TableCell>
                            <b>1111+ 0.5</b>
                          </TableCell>
                        </tr>
                        <tr>
                          <TableCell>
                            <b>3255 + USDT </b>
                          </TableCell>
                          <TableCell>
                            <b>11111 + 1</b>
                          </TableCell>
                        </tr>
                      </tbody>
                    </Table>
                    <TableFooter>
                      <b>Exchange more , Get more</b>
                    </TableFooter>
                  </TableContainer>
                </Center>
              </Container>
            </Part2>
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Wallet;
