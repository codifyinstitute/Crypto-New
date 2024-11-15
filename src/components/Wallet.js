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


import coin from "../assets/FINAL-USDT.png";
import deposit from "../assets/depositimg.jpg";
import withdraw from "../assets/withdraw.jpg";
import withdrawicon from "../assets/3-removebg-preview.png";
import DEPOSIT__2_ from "../assets/4-removebg-preview.png";

import { AiOutlineHistory } from "react-icons/ai";
import { PiSpeakerHighFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import axios from "axios";

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
  height : 100vh; 
  
  @media (max-width: 380px) {
    /* padding: 1rem; */
    // margin: 0px 15px;
  height : 800px;
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
  // border : 2px solid green;
  flex-direction: column;
  font-size: 20px;
  color: black;
  margin-bottom: 1rem;

  p {
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-right: 12px;
    font-weight: bold;
    // background-color: #2b9178;
    border-radius: 4px;
    color: white;
  }

  img {
    // margin-left: 1px;
    margin-right : 1px;
    width: 30px;
    height: 30px;
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
  animation: ${slideUp} 5s cubic-bezier(.68,-0.55,.27,1.55) infinite;
  white-space: nowrap;
  // margin-left: 8px;
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
  max-width: 1200px;  /* Increased max-width for larger screens */
  margin:  auto;
  font-family: Arial, sans-serif;

  @media (max-width: 1400px) {
    max-width: 90%;
    height : auto;  /* Limit width on large desktops */
  }
  
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
  UAE: {
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
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [login, setLogin] = useState(false);
  const [isChanging, setIsChanging] = useState(false); 
  const handleDepositclick = () => {
    navigate('/deposit')
  }
  const handleWithdrawclick = () => {
    navigate('/withdraw')
  }

  const countryPrices = {
    "USA": { price1: 0.02, price2: 0.04, price3: 0.07 },
    "UAE": { price1: 0.24, price2: 0.37, price3: 0.51 },
    "UK": {  price1: 0.03, price2: 0.05, price3: 0.07 },
    "Euro": { price1: 0.08, price2: 0.11, price3: 0.15 },
    "Brazil": { price1: 0.44, price2: 0.62, price3: 0.79 },
    "India": { price1: 0.5, price2: 1, price3: 2 },
  };

  const countryPrice = countryPrices[selectedCountry] ;

  const dataEntries = [ 

"har****ka@gmail.com Sold 1327 USDT",
"ami****ed@gmail.com Sold 982 USDT",
"kem****ye@gmail.com Sold 1023 USDT",
"fio****or@gmail.com Sold 432 USDT",
"iri****va@gmail.com Sold 1075 USDT",
"ann****ka@gmail.com Sold 673 USDT",
"jav****es@gmail.com Sold 1254 USDT",
"bri****ms@gmail.com Sold 1289 USDT",
"muh****an@gmail.com Sold 1001 USDT",
"kar****as@gmail.com Sold 421 USDT",
"jua****as@gmail.com Sold 1342 USDT",
"mar****ez@gmail.com Sold 531 USDT",
"gab****ns@gmail.com Sold 725 USDT",
"li.****ei@gmail.com Sold 853 USDT",
"chi****or@gmail.com Sold 1102 USDT",
"mar****on@gmail.com Sold 1305 USDT",
"jay****gh@gmail.com Sold 549 USDT",
"arv****on@gmail.com Sold 1113 USDT",
"han****th@gmail.com Sold 1247 USDT",
"ang****od@gmail.com Sold 634 USDT",
"ale****ov@gmail.com Sold 1081 USDT",
"bio****le@gmail.com Sold 1036 USDT",
"dav****en@gmail.com Sold 780 USDT",
"isa****ta@gmail.com Sold 1251 USDT",
"kat****to@gmail.com Sold 453 USDT",
"yul****va@gmail.com Sold 1067 USDT",
"ing****en@gmail.com Sold 612 USDT",
"jor****ez@gmail.com Sold 1348 USDT",
"edu****va@gmail.com Sold 749 USDT",
"far****ta@gmail.com Sold 819 USDT",
"pri****or@gmail.com Sold 943 USDT",
"hec****ro@gmail.com Sold 1185 USDT",
"car****ra@gmail.com Sold 627 USDT",
"mar****ez@gmail.com Sold 847 USDT",
"jun****al@gmail.com Sold 732 USDT",
"dan****ng@gmail.com Sold 1181 USDT",
"oma****ed@gmail.com Sold 1017 USDT",
"ant****go@gmail.com Sold 770 USDT",
"tan****ez@gmail.com Sold 923 USDT",
"mah****an@gmail.com Sold 830 USDT",
"cla****er@gmail.com Sold 1054 USDT",
"aal****an@gmail.com Sold 702 USDT",
"krz****ik@gmail.com Sold 952 USDT",
"ele****va@gmail.com Sold 1313 USDT",
"ale****ra@gmail.com Sold 1228 USDT",
"joh****er@gmail.com Sold 933 USDT",
"fio****or@gmail.com Sold 1297 USDT",
"jay****gh@gmail.com Sold 915 USDT",
"arv****on@gmail.com Sold 667 USDT",
"han****th@gmail.com Sold 1150 USDT",
"ale****ov@gmail.com Sold 620 USDT",
"bio****le@gmail.com Sold 1058 USDT",
"dav****en@gmail.com Sold 1027 USDT",
"isa****ta@gmail.com Sold 763 USDT",
"kat****to@gmail.com Sold 803 USDT",
"yul****va@gmail.com Sold 609 USDT",
"ing****en@gmail.com Sold 1033 USDT",
"jor****ez@gmail.com Sold 684 USDT",
"edu****va@gmail.com Sold 1138 USDT",
"far****ta@gmail.com Sold 1301 USDT",
"pri****or@gmail.com Sold 451 USDT",
"hec****ro@gmail.com Sold 1206 USDT",
"car****ra@gmail.com Sold 788 USDT",
"mar****ez@gmail.com Sold 1343 USDT",
"jun****al@gmail.com Sold 1147 USDT",
"dan****ng@gmail.com Sold 1173 USDT", 
"oma****ed@gmail.com Sold 864 USDT",
"ant****go@gmail.com Sold 770 USDT",
"tan****ez@gmail.com Sold 877 USDT",
"mah****an@gmail.com Sold 830 USDT",
"cla****er@gmail.com Sold 1054 USDT",
"aal****an@gmail.com Sold 702 USDT",
"krz****ik@gmail.com Sold 952 USDT",
"ele****va@gmail.com Sold 1313 USDT",
"ale****ra@gmail.com Sold 1228 USDT",
"joh****er@gmail.com Sold 933 USDT",
"fio****or@gmail.com Sold 1297 USDT",
"jay****gh@gmail.com Sold 915 USDT",
"arv****on@gmail.com Sold 667 USDT",
"han****th@gmail.com Sold 1150 USDT",
"ale****ov@gmail.com Sold 620 USDT",
"bio****le@gmail.com Sold 1058 USDT",
"dav****en@gmail.com Sold 1027 USDT",
"isa****ta@gmail.com Sold 763 USDT",
"kat****to@gmail.com Sold 803 USDT",
"yul****va@gmail.com Sold 609 USDT",
"ing****en@gmail.com Sold 1033 USDT",
"jor****ez@gmail.com Sold 684 USDT",
"edu****va@gmail.com Sold 1138 USDT",
"far****ta@gmail.com Sold 1301 USDT",
"pri****or@gmail.com Sold 451 USDT",
"hec****ro@gmail.com Sold 1206 USDT",
"car****ra@gmail.com Sold 788 USDT",
"mar****ez@gmail.com Sold 1343 USDT",
"jun****al@gmail.com Sold 1147 USDT",
"dan****ng@gmail.com Sold 1173 USDT",
"oma****ed@gmail.com Sold 864 USDT",
"ant****go@gmail.com Sold 770 USDT",
"tan****ez@gmail.com Sold 877 USDT",
"mah****an@gmail.com Sold 1156 USDT",
"cla****er@gmail.com Sold 642 USDT",
"aal****an@gmail.com Sold 491 USDT"

// "ja*******@gmail.com sold 150 USDT",
// "ma****@gmail.com sold 250 USDT",
// "se******@gmail.com sold 400 USDT",
// "di******@gmail.com sold 300 USDT",
// "kh*******@gmail.com sold 200 USDT",
// "ar******@gmail.com.com sold 500 USDT",
// "la******@gmail.com sold 350 USDT",
// "ri******@gmail.com sold 600 USDT",
// "ts******@gmail.com sold 450 USDT",
// "pr******@gmail.com sold 700 USDT",
// "bo******@gmail.com sold 550 USDT",
// "ze******@gmail.com.com sold 800 USDT",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [currenciesResponse] = await Promise.all([
          axios.get(`https://api.moonpayx.com/currencies/${countryObject[selectedCountry].urlName}/all`),
        ]);
        // console.log(currenciesResponse.data[0])
        setSelectedCurrency(
          currenciesResponse.data.find((c) => c.Symbol === "ACH") ||
          currenciesResponse.data[0]
        );

  
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % dataEntries.length);
  //   }, 4000); // Change every 4 seconds

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    let timeoutId;

    const changeEntry = () => {
      if (isChanging) return; // Prevent change if we're already in transition
      setIsChanging(true); // Mark as changing to avoid immediate repeat
      timeoutId = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % dataEntries.length); // Change to the next entry
        setIsChanging(false); // Allow next change
      }, 5000); // Wait for 5 seconds

    };

    changeEntry(); // Call it to set the first change immediately.

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [index]); // When the index changes, the effect will trigger again.

  const token = localStorage.getItem("token");
  const fetchWallet = async () => {
    try {
      const response = await fetch(`https://api.moonpayx.com/wallet/get/${token}`);
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
                <span style={{border : "2px solid green", borderRadius :  "8px" }}>
                <p>
                  <span style={{
                    // backgroundColor: "#d3d3d3",
                    paddingTop: "5px",
                    paddingRight: "6px",
                    borderRadius: "4px 0px 0px 4px"
                  }}>
                    <img src={coin} alt="coin" />
                  </span>
                  <span style={{
                    marginLeft: "8px",
                    fontWeight : "800",
                    marginRight: "8px",
                    color : "black",
                    paddingLeft: "0px",
                    minWidth: "50px", // Set a minimum width
                    width: "auto", // Allow the width to grow as needed
                    display: "inline-block" // Ensure it behaves like a block element
                  }}>
                    {walletAmount}
                    <span> USDT</span>
                  </span>
                  
                </p>
                </span>
                <span style={{ fontSize: "16px", marginTop: "7px", fontWeight: "700" }}>Wallet balance</span>
              
              </Balance>
            </Part>
            {login ? null : <LoginButton onClick={() => navigate('/sell2')}>Login to Deposit</LoginButton>}
            <ActionButtons>
              <Deposit onClick={handleDepositclick}>
                <div>
                  <img src={DEPOSIT__2_} style={{ height: "70px", width: "75px", marginTop: "2px" }} alt="Deposit" />
                </div>
                <span style={{ fontWeight: 700 }}>Deposit</span>
              </Deposit>


              <Deposit onClick={handleWithdrawclick}>
                <div>
                  <img src={withdrawicon} alt="Withdraw" style={{ height: "70px", width: "75px" }} />
                </div>
                <span style={{ fontWeight: 700 }}>Withdraw</span>
              </Deposit>
            </ActionButtons>

            <Banner>
              <PiSpeakerHighFill
                style={{
                  borderRight: "1px solid",
                  marginRight: "15px",
                  paddingRight: "1px",
                  // fontSize: "19px",
                }}
                size={16}
              />
              <Text style={{ fontSize: "12px", fontWeight : "600" }}>{dataEntries[index]}</Text>
            </Banner>
            {loading?null:<>
            <Part2>
              <Container>
                <PriceDisplay>
                  <Price> {countryObject[selectedCountry].symbol} {selectedCurrency?.Rate}</Price>
                </PriceDisplay>
                <Subtext>1 USDT = {countryObject[selectedCountry].symbol} {selectedCurrency?.Rate}</Subtext>
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
                        {/* <tr>
                          <TableCell>
                            <b>1075 + USDT </b>
                          </TableCell>
                          <TableCell>
                            <b>{selectedCurrency?.Rate} + 0.25</b>
                          </TableCell>
                        </tr>
                        <tr>
                          <TableCell>
                            <b>2150 + USDT </b>
                          </TableCell>
                          <TableCell>
                            <b>{selectedCurrency?.Rate}+ 0.5</b>
                          </TableCell>
                        </tr>
                        <tr>
                          <TableCell>
                            <b>3255 + USDT </b>
                          </TableCell>
                          <TableCell>
                            <b>{selectedCurrency?.Rate} + 1</b>
                          </TableCell>  
                        </tr> */}

<tr>
      <TableCell><b>1075 + USDT</b></TableCell>
      <TableCell><b>{selectedCurrency?.Rate} + {countryPrice.price1}</b></TableCell>
    </tr>
    <tr>
      <TableCell><b>2150 + USDT</b></TableCell>
      <TableCell><b>{selectedCurrency?.Rate} + {countryPrice.price2}</b></TableCell>
    </tr>
    <tr>
      <TableCell><b>3255 + USDT</b></TableCell>
      <TableCell><b>{selectedCurrency?.Rate} + {countryPrice.price3}</b></TableCell>
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
            </>}
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      {/* <HomeContact /> */}
      <Footer />
    </>
  );
};

export default Wallet;
