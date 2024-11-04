import React, { useState, useEffect } from 'react';
// import { Hourglass } from 'react-loader-spinner';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHistory } from "react-icons/ai";
import { ChevronDown, ChevronUp, ChevronRight, Info, X, Moon, Weight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import ind from "./../assets/ind.jpeg";
import usdtt from "./../assets/usdtt.png";
import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';
import payment from "./../assets/Frame 47.png";
import { RefreshCw } from 'lucide-react';
import logoM from "./../assets/logo2.png";
import Depositimg from "./../assets/Deposit.jpg"
import Bepimg from "./../assets/bep21(1).png";
import trcimg from "./../assets/trc20(1).png";
import usdtimg from "./../assets/usdt1-removebg-preview(2).png";
import { TriangleAlert } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import { Check } from 'lucide-react';

const TradingEnvironment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color:black;
  font-family: 'Roboto', sans-serif;
  /* padding-top: 140 px; */
  @media (max-width: 480px) {
  padding-top: 80px;

  }
  
`;

const ExchangeCard = styled.div`
  background-color: white;
  color: #333333;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;  // Use full width for mobile viewports
  max-width: 380px;  // Limit maximum width
  height: 650px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 480px) {
    height: auto; // Allow height to adjust based on content
    padding: 1rem; // Adjust padding for smaller screens
  }

  @media (max-width: 320px) {
    padding: 0.5rem; // Further reduce padding for very small screens
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;  // Aligns tab content to the left
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 25px;
  font-weight: 700;
  display: inline-block;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 20px; // Adjust font size for smaller screens
  }

  @media (max-width: 320px) {
    font-size: 18px; // Further adjust for very small screens
  }
`;
const InputLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #f8f9fa;
//   border-radius: 0.5rem;
//   border: 1px solid #e0e0e0;
//   padding: 0.5rem 1rem;
// `;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%; // Allow full width for input

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem; // Adjust font size for smaller screens
  }

  @media (max-width: 320px) {
    font-size: 1rem; // Further adjust for very small screens
  }
`;

const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color:  #e1dcdc;
  /* padding: 9px; */
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 16px;
`;

const UpdateText = styled.div`
  font-size: 0.8rem;
  color: #888;
  text-align: right;
  margin-top: 0.5rem;
  
 
`;

//  const WrapperProceedButton = styled.button`

//  `


const ProceedButton = styled.button`
  width: 100%; // Ensure button takes full width
  padding: 1rem;
  background-color: orange;
  color: black;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  font-size: 20px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(227, 148, 0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaymentMethods = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
    @media (max-width: 430px) {
    margin-top: 10px;
    
    }
  `;

const PaymentIcon = styled.div`
  width: 210px;
    height: 35px;
    background-color: white;
    border-radius: 4px;
    background-image: url(${payment});
    object-fit: contain;
    background-repeat: no-repeat;
    background-size: InputLabelcontain;
  `;

const PoweredBy = styled.div`
      font-size: 0.8rem;
    color: black;
    text-align: center;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  @media (max-width: 430px) {
    margin-top: 0px;
    ;
  }
`;
const AnimatedDropdownContainer = styled.div`
  position: absolute;
  top: -110px;
  left: -25px;
  right: 0;
  background-color: white;
  /* border: 1px solid #e0e0e0; */
  border-radius: 0.5rem;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  z-index: 10;
  width: 380px;
  height: 650px;
  max-width: 115%;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;


  
  /* @media (max-width: 375px) {
    max-width: 100%;

  } */
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const DropdownTitle = styled.h3`
  margin: 0;
  font-size: 25px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SearchInput = styled.input`
  width: calc(100% - 2rem);
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0052ff;
  }
`;

const CurrencyList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const CurrencyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CurrencyIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 0.75rem;
`;

const CurrencyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrencySymbol = styled.span`
  font-size: 12px;
  color: #888;
  margin-top: 6%;
`;

const CurrencyName = styled.span`

  /* color: #888; */
  font-weight: 800;
`;

const PriceContainer = styled.div`
  background-color: #27201c;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  color: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
  position: relative;
  margin-top: 4%;
`;

const Container = styled.div`
  /* background-color: #2D2D2D; */

  background: linear-gradient(112.77deg, rgba(222, 209, 254, 0.2) -0.92%, rgba(247, 166, 0, 0.2) 103.89%);

  color: white;
  padding: 16px;
  border-radius: 8px;
  width: 450px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const RefreshText = styled.p`
  font-size: 14px;
  color: white;
`;

const PriceDisplay = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Price = styled.span`
  font-size: 50px;
  font-weight: bold;
`;

const BaseLabel = styled.span`
  margin-left: 4px;
  font-size: 12px;
  background-color: #E53935;
  color: white;
  padding: 2px 4px;
  border-radius: 2px;
  vertical-align: super;
`;
const Rocks = styled.div`
  display: flex;
  flex-direction: column;

`;
const CurrencySymbols = styled.div`
  color: black;
  font-size: 12px;
  font-weight: 400;

`;

const Subtext = styled.p`
  text-align: center;
  margin-bottom: 16px;
  color: white;
  font-size: 14px;
`;
const Center = styled.div`
display: flex;
justify-content: center;
`


const TableContainer = styled.div`
  background-color: orange;
  border-radius: 10px;
  padding: 9px;
  width: 350px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 0px;
  border: 1px solid orange;
  tbody{
  background-color: white;
  border: 1px solid orange;
  
  }
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



const BackButton = styled.button`
  /* background-color: #FFA500; */
  background-color: transparent;
  color: #FFA500;
  border: none;
  /* padding: 8px 16px; */
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  /* z-index: 1001; */
  /* display: none; */
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;
const Right = styled.div`
display: flex;
justify-content: left;
    width: 100%;

`;
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 5px;

  @media (max-width: 375px) {
    /* Adjust the container for smaller screens */
    margin-left: 3px;
  }

  @media (max-width: 320px) {
    margin-left: 2px;
  }

  &:hover div {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  width: 300px;
  background-color: white;
  padding: 5px;
  color: black;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -114px; /* Adjust to center the tooltip */

  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  @media (max-width: 375px) {
    width: 220px; /* Adjust width for 375px screens */
    margin-left: -110px; /* Center the tooltip */
  }

  @media (max-width: 320px) {
    width: 180px; /* Adjust width for 320px screens */
    margin-left: -90px; /* Center the tooltip */
  }
`;

const Buddy = styled.p`
font-size:18px;
font-weight: 600;
`;
const Indicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;


// const Info = styled.icon`
// display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-left: 2%;

// `;
const Moonn = styled.img`
 
 width: 25%;


`;

const Card = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;
const Exchange = styled.div`
min-height: 100vh;
background-color: black;
display: flex;
justify-content: center;
padding-top: 100px;
`
const Card1 = styled.div`
height: 170px;
width: 50%;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
@media (max-width:480px){
  width: 90%;
}

h1{
  color: gray;
  width: 100%;
  font-size: 20px;
  padding: 10px;
  background-color:#eaeaea;
  @media (max-width:480px){
    font-size: 18px;
  
}

}

// button{
//   height: 50px;
//   font-size: 20px;
//   border-radius: 10px;
//   width: 30%;
//   margin-bottom: 15px;
//   color: white;
//   border: 0px solid orange;
//   background-color: orange;
//   @media (max-width:480px){
//     font-size: 18px;
//     height: 40px;
//     width: 26%;
  
// }
/* } */
p{
  font-size: 24px;
  @media (max-width:480px){
    font-size: 18px;
  
}
}
`
const InputMessage = styled.p`
  font-size: 0.9rem;
  color: ${props => (props.isValid ? 'green' : 'red')};
  margin-top: 0.5rem;
`;



const DepositImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #f7f7f7; 
`
const DepositImgIcon = styled.div`
  background-image: url(${Depositimg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const DepositText = styled.div`
  margin-top: 0.5rem;
  font-size: 25px;
  font-weight: 700;

`;



const NetworkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 0.5rem;
  flex-wrap: wrap;  // Allow elements to wrap on smaller screens
  gap: 8px;  // Add space between wrapped items for readability

  @media (max-width: 480px) {
    justify-content: space-between;
    gap: 5px;  // Reduce gap on smaller screens if needed
  }
`;

// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   color: #fff;
// `;

// const ActiveButton = styled(Button)`
//     width: 40%;
//     background-color: orange;
//     color: black;
//     font-weight:700;
//     border: none;
//     border-radius: 0.5rem;
//  &:hover {
//       background-color: rgb(227, 148, 0);
//     }

//     &:disabled {
//       background-color: #ccc;
//       cursor: not-allowed;
//     }
// `;

const Button = styled.button`
  display: flex; // Enable flexbox
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
  // color: #fff;
  height: 50px; // Set a fixed height for uniformity
`;


const ActiveButton = styled(Button)`
  width: 48%; // Use percentage to maintain responsive sizing
  font-size: 14px; // Adjust font size for smaller screens
  color: black;
  font-weight: 700;
  border: 2px solid orange;
  border-radius: 0.5rem;

  @media (max-width: 480px) {
    width: 45%;  // Adjust width to fit better on smaller screens
  }
`;

const InactiveButton = styled(Button)`
  width: 48%;
  font-size: 14px;
  color: black;
  background-color: #e5e5e5;

  @media (max-width: 480px) {
    width: 45%;  // Adjust width similarly for consistency
  }
`;
// const InactiveButton = styled(Button)`
//   width: 40%;
//   color: black;
//   background-color: #e5e5e5;
//   &:hover {
//     background-color: #aaa;
//   }
// `;
const AmountHeading = styled.div`
  font-size: 16px;
  margin-top: 0.8rem;
  font-weight: bold;
`;

const DepositInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px 10px;
  border-radius: 4px;
  width: 100%;
  max-width: 100%;
  margin-top: 15px;
  gap: 4px;
  box-sizing: border-box;
  overflow: hidden;

  /* Responsive adjustments for smaller viewports */
  @media (max-width: 400px) {
    padding: 6px 8px;
    gap: 2px;
  }
`;

// The input field itself
const InputField = styled.input`
  flex: 1;
  padding: 6px;
  border: none;
  outline: none;
  font-size: 0.9rem; /* Smaller font for smaller screens */
  font-weight: 700;
  box-sizing: border-box;

  /* Adjust padding and font size for narrow screens */
  @media (max-width: 400px) {
    padding: 4px;
    font-size: 0.85rem;
  }
`;

// Icon for currency
const DepsitCurrencyIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  /* Slightly smaller icon for small screens */
  @media (max-width: 400px) {
    width: 20px;
    height: 20px;
  }
`;

// Currency text (e.g., "USDT")
const CurrencyText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;

  /* Smaller font for small screens */
  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`;




const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  gap: 5px;
  padding-left: 5px;


  
`;

const BalanceText = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;


const IconValueWrapper = styled.div`
    background-color: rgb(251 251 251);
    color: black;
    padding: 5px 13px;
    border-radius: 10px;
    border: none;
    font-size: 8px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    /* height: 40px; */
    gap: 2px;
    width: auto;
    transition: background-color 0.3s;
`

const BalanceIcon = styled.div`
  width: 18px;
  height: 18px;
`;

const AvailableBalanceValue = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
//  background-color: #e1e1e1;
  /* padding: 8px 2px; Spacing for a button-like look */
  // border-radius: 20px; /* Rounded corners */
  // display: inline-block;
  cursor: pointer; /* Gives the impression that it can be clicked */
  // border: 1px solid #ccc; /* Border to make it look like a button */
  transition: background-color 0.3s ease; /* Smooth hover transition */

  &:hover {
     /* Darken on hover for effect */
  }

  &:active {
    background-color: #d1d1d1; /* Slightly darker on click */
  }
`;


const Disclaimer = styled.div`
display : flex;
  align-items: center;
  gap : 1rem;
  margin-top : 1rem;
  `

const DisclaimerIcon = styled.div`

`

const DisclaimerText = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-align : justify;
`;


const Balance = styled.div`
  display: flex;
  justify-content: flex-start; /* Align content to the left */
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  color: black;
  margin-bottom: 1rem;

  p {
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-top: 15px; 
    margin-right: 0; /* Remove right margin to keep content aligned */
    font-weight: bold;
    background-color: #2b9178;
    border-radius: 4px;
    color: white;
    width: 100%; /* Allow p to take full width for left alignment */
    justify-content: flex-start; /* Align contents inside p to the left */
  }

  img {
    margin-left: 5px;
    width: 26px;
    height: 26px;
  }
`;

const Deposit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usdt, setUsdt] = useState(location.state?.amount || '1');
  const [isValid, setIsValid] = useState(true);
  const [minAmount, setMinAmount] = useState(0);
  const [extra, setExtra] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [login, setLogin] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);
  // const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [transactionFee, setTransactionFee] = useState(475.76);
  const [networkFee, setNetworkFee] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(30);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [BalanceValue, setBalanceValue] = useState(500000);
  const [TRCValue, setTRVvalue] = useState()
  const [selectNetwork, setSelectNetwork] = useState('TRC20');

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? setLogin(true) : setLogin(false);
    if (!token) {
      navigate("/sell2")
    }
  }, [])



  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);


  const handleRefresh = () => {
    setTimer(30);
    // Implement your refresh logic here
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [currenciesResponse, feesResponse] = await Promise.all([
  //         axios.get('https://crypto-backend-main.onrender.com/currencies/all'),
  //         fetch('https://crypto-backend-main.onrender.com/static/get/66c445a358802d46d5d70dd4')
  //       ]);

  //       setCurrencies(currenciesResponse.data);
  //       // setSelectedCurrency(currenciesResponse.data.find(c => c.Symbol === 'ACH') || currenciesResponse.data[0]);

  //       if (feesResponse.ok) {
  //         const feesData = await feesResponse.json();
  //         setTransactionFee(feesData.TransactionFee);
  //         setNetworkFee(feesData.NetworkFee);
  //         setUsdt(feesData.MinAmount);
  //         setMinAmount(feesData.MinAmount);

  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleUsdtChange = (e) => {
    const value = e.target.value;
    if (value >= 1075 && value < 2150) {
      setExtra(0.25);
      //console.log(0.25)
    } else if (value >= 2150 && value < 3255) {
      setExtra(0.5);
    } else if (value >= 3255) {
      setExtra(1);
    } else {
      setExtra(0);
    }
    setUsdt(value);
    setIsValid(value && !isNaN(value) && Number(value) > 0 && Number(value) >= minAmount);
  };

  // const handleCurrencySelect = (currency) => {
  //   setSelectedCurrency(currency);
  //   setIsDropdownOpen(false);
  // };

  // const inr = selectedCurrency ? usdt * (selectedCurrency.Rate + extra): 0;

  const handleDepositNowClick = () => {
    if (isValid) {
      const networkData = {
        network: selectNetwork,
        depositamount: usdt,
      };
      localStorage.setItem('networkDetails', JSON.stringify(networkData));
      const depositData = {
        depositAmount: usdt,
        // symbol: selectedCurrency.Symbol,
        network: selectNetwork,
      };
      // localStorage.setItem('depositDetails', JSON.stringify(depositData));
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/deposit2', { state: depositData });
      } else {
        navigate('/Sell2');
      }
    }
  };
  const toggleDetailsExpanded = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const filteredCurrencies = currencies.filter(currency =>
    currency.Symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (loading) {
  //   return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black", width: "100vw", height: "100vh" }}>
  //     <Hourglass
  //       visible={true}
  //       height="80"
  //       width="80"
  //       ariaLabel="hourglass-loading"
  //       wrapperStyle={{}}
  //       wrapperClass=""
  //       colors={['#ffa500', '#ffffff']}
  //     />
  //   </div>;
  // }

  if (!login) {
    navigate("/sell2")
  }


  const handleBackClick = () => {
    if (login) {
      navigate('/wallet');
    } else {
      navigate('/');
    }
  };


  const handleTrcClick = () => {
    setSelectNetwork('TRC20');
    setTimeout(() => {
      toast.success("Network changed to TRC20", {
        position: "top-left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          border: "1px solid #f0a500",
          borderRadius: "8px",
          backgroundColor: "#fffdf5",
          padding: "10px",
          width: "90vw", // Full width on mobile
          maxWidth: "300px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }, 1000); // 1-second delay
  };

  const handleBepClick = () => {
    setSelectNetwork('BEP20');
    setTimeout(() => {
      toast.success("Network changed to BEP20", {
        position: "top-left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          border: "1px solid #f0a500",
          borderRadius: "8px",
          backgroundColor: "#fffdf5",
          padding: "10px",
          width: "90vw",
          maxWidth: "300px", // Cap max width for larger screens
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }, 1000);
  };

  const token = localStorage.getItem("token");
  const fetchWallet = async () => {
    try {
      const response = await fetch(`https://crypto-backend-main.onrender.com/wallet/get/${token}`);
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


  return (
    <>
      <Navbar />
      <TradingEnvironment>
        <ToastContainer />
        <ExchangeCard>
          <div>

            <TabContainer>
              <BackButton onClick={handleBackClick}>
                <ChevronLeft />
              </BackButton>
              {/* <Tab active> USDT Deposit </Tab> */}
              <TabWrapper>
                <Tab>USDT Deposit</Tab>
              </TabWrapper>
              <AiOutlineHistory onClick={() => navigate("/depositHistory")} style={{ color: '#FFA500', fontSize: '30px' }} />
            </TabContainer>

            <InputLabel>You Deposit</InputLabel>
            <DepositImageContainer>
              <DepositImgIcon />
            </DepositImageContainer>
            <DepositText>  Network   </DepositText>




            <NetworkWrapper>
              {selectNetwork === 'TRC20' ? (

                <ActiveButton onClick={handleTrcClick} style={{ position: "relative" }}>
                  <Check strokeWidth={3}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      backgroundColor: "#FFF176",
                      borderRadius: "50%",
                      padding: "2px",
                      // color: "black",
                      color: "#000000",
                      width: "16px",
                      height: "16px"
                    }}
                  />
                  <img src={trcimg} alt="TRC20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                  TRC20
                </ActiveButton>

              ) : (
                <InactiveButton onClick={handleTrcClick}>
                  <img src={trcimg} alt="TRC20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                  TRC20
                </InactiveButton>
              )}
              {selectNetwork === 'BEP20' ? (
                <ActiveButton onClick={handleBepClick} style={{ position: "relative" }}>
                  <Check strokeWidth={3}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      backgroundColor: "#FFF176",
                      borderRadius: "50%",
                      padding: "2px",
                      color: "#000000",
                      width: "16px",
                      height: "16px"
                    }}
                  />
                  {/* <Check color="#f9f06b" strokeWidth={3} /> */}
                  <img src={Bepimg} alt="BEP20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />

                  BEP20
                </ActiveButton>
              ) : (
                <InactiveButton onClick={handleBepClick}>

                  <img src={Bepimg} alt="BEP20 Icon" style={{ width: "20px", height: "20px", marginRight: "8px" }} />

                  BEP20
                </InactiveButton>
              )}
            </NetworkWrapper>




            <AmountHeading>  Enter Amount   </AmountHeading>
            <DepositInput>
              <InputField
                placeholder='Enter USDT amount'
                type='number'
                value={usdt}
                onChange={(e) => setUsdt(e.target.value)}
              />

              <DepsitCurrencyIcon src={usdtimg} style={{ width: "26px", height: "26px" }} />

              <CurrencyText>USDT</CurrencyText>
            </DepositInput>
            <BalanceWrapper>
              <BalanceText>
                Available  :
              </BalanceText>

              <IconValueWrapper>
              <Balance>
      <p>
        <span style={{
          backgroundColor: "#d3d3d3",
          paddingTop: "5px",
          paddingRight: "2px",
          borderRadius: "4px 0px 0px 4px"
        }}>
          <img src={usdtimg} alt="coin" />
        </span>
        <span style={{
          marginLeft: "8px",
          marginRight: "8px", 
          fontSize: "16px",
          paddingLeft : "10px",
          fontWeight : "700",
          minWidth: "40px", // Set a minimum width
          width: "auto", // Allow the width to grow as needed
          display: "inline-block" // Ensure it behaves like a block element
        }}>
          {walletAmount}
        </span>
      </p>
    </Balance>

                {/* <AvailableBalanceValue>
                  {walletAmount}
                </AvailableBalanceValue> */}
              </IconValueWrapper>
            </BalanceWrapper>


          </div>
          <div>
            <Disclaimer>
              <DisclaimerIcon>
                <TriangleAlert size={20} color="#e5a50a" />
              </DisclaimerIcon>
              <DisclaimerText>
                For the safety of your funds please ensure that the network
                selected and amount entered is appropriate
              </DisclaimerText>
            </Disclaimer>
          </div>
          <div>

            <ProceedButton onClick={handleDepositNowClick} disabled={!isValid}>
              Proceed · Deposit {null?.Name} <ChevronRight />
            </ProceedButton>

            {/* <PaymentMethods>
              <PaymentIcon />
            </PaymentMethods> */}

            <PoweredBy>
              Powered by <Moonn src={logoM} />
            </PoweredBy>
          </div>

          <Indicator onClick={toggleCardVisibility}>
            <Info size={20} />
          </Indicator>
          {isCardVisible && (
            <Card>
              <p>This is the detailed card shown when the indicator is clicked.</p>
            </Card>
          )}
        </ExchangeCard>

      </TradingEnvironment>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Deposit;
