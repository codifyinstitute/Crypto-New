import React, { useState, useEffect } from "react";
// import { Hourglass } from 'react-loader-spinner';
import styled from "styled-components";
import { changeCountry } from '../features/country/countrySlice';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Info,
  X,
  Moon,
} from "lucide-react";
import { ChevronLeft } from "lucide-react";
import ind from "./../assets/ind.jpeg";
import usdtt from "./../assets/usdtt.png";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import Navbar from "./Navbar";
import payment from "./../assets/Frame 47.png";
import { RefreshCw } from "lucide-react";
import logoM from "./../assets/logo2.png";
import usd from "./../assets/america.png";
import germany from "./../assets/germay.png"; // Corrected the image path
import Dubai from "../assets/dubai flag.png";
import bg2 from "./../assets/bg2.jpg";
import Newcomp from "./Newcomp";
import usdtimg from "./../assets/usdt1-removebg-preview(2).png";
import usaFlag from "../assets/USD AMERICA.jpg";
import dubaiFlag from "../assets/AED DUBAI.jpg";
import indiaFlag from "../assets/INR INDIA.jpg";
import BrazilFlag from "../assets/BRL BRAZIL.jpg";
import ukFlag from "../assets/GBP UK.jpg";
import EuropeFlag from "../assets/EURO  EUROPEAN UNION.jpg";
import { useDispatch, useSelector } from "react-redux";

const TradingEnvironment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  font-family: "Roboto", sans-serif;
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
  width: 380px;
  height: 650px;
  max-width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* @media (max-width: 430px) {
  margin-top: 15%;
   
  } */
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 25px;
  font-weight: 700;
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
  width: 20%;

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #e1dcdc;
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

const OrderSummary = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;

  P {
    font-size: 0.9rem;
  }
`;

const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const ProceedButton = styled.button`
  width: 100%;
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
  background-size: contain;
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
  }
`;

const AnimatedDropdownContainer = styled.div`
  position: absolute;
  top: -251px;
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
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-20px)"};
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;

  /* @media (max-width: 375px) {
    max-width: 100%;

  } */
`;

const AnimatedDropdownContainer1 = styled.div`
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
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-20px)"};
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
  max-height: 400px;
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

  background: linear-gradient(
    112.77deg,
    rgba(222, 209, 254, 0.2) -0.92%,
    rgba(247, 166, 0, 0.2) 103.89%
  );

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
  background-color: #e53935;
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
`;

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
  tbody {
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
  color: #ffa500;
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

  @media (max-width: 1024px) {
    // Show on tablet and mobile
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
    content: "";
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
  font-size: 18px;
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
`;
const Card1 = styled.div`
  height: 170px;
  width: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    width: 90%;
  }

  h1 {
    color: gray;
    width: 100%;
    font-size: 20px;
    padding: 10px;
    background-color: #eaeaea;
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  button {
    height: 50px;
    font-size: 20px;
    border-radius: 10px;
    width: 30%;
    margin-bottom: 15px;
    color: white;
    border: 0px solid orange;
    background-color: orange;
    @media (max-width: 480px) {
      font-size: 18px;
      height: 40px;
      width: 26%;
    }
  }
  p {
    font-size: 24px;
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;
const InputMessage = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.isValid && !props.inSufficientBalance ? "green" : "red")};
  margin-top: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.isInvalid ? "red" : "#e0e0e0")};
  padding: 0.5rem 1rem;
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

const Sell1 = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const location = useLocation();
  const navigate = useNavigate();
  const [usdt, setUsdt] = useState(location.state?.amount || "1");
  const [isValid, setIsValid] = useState(true);
  const [minAmount, setMinAmount] = useState(0);
  const [extra, setExtra] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [login, setLogin] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [transactionFee, setTransactionFee] = useState(475.76);
  const [networkFee, setNetworkFee] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [timer, setTimer] = useState(30);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isFiatDropdownOpen, setIsFiatDropdownOpen] = useState(false);
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState(null);
  const [filteredFiatCurrencies, setFilteredFiatCurrencies] = useState([]);
  const [walletAmount, setWalletAmount] = useState(0);
  const [inSufficientBalance, setInSufficientBalance] = useState(false);

  const dispatch = useDispatch();

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
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setLogin(true) : setLogin(false);
  }, []);

  const handleRefresh = () => {
    setTimer(30);
    // Implement your refresh logic here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currenciesResponse, feesResponse] = await Promise.all([
          axios.get(`http://localhost:8000/currencies/${countryObject[selectedCountry].urlName}/all`),
          fetch(`http://localhost:8000/static/${countryObject[selectedCountry]?.urlName}/one`),
        ]);

        setCurrencies(currenciesResponse.data);
        setSelectedCurrency(
          currenciesResponse.data.find((c) => c.Symbol === "ACH") ||
          currenciesResponse.data[0]
        );

        if (feesResponse.ok) {
          const feesData = await feesResponse.json();
          setTransactionFee(feesData.TransactionFee);
          setNetworkFee(feesData.NetworkFee);
          setUsdt(feesData.MinAmount);
          setMinAmount(feesData.MinAmount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    const fiatCurrencies = [
      { name: "India", symbol: "INR", image: indiaFlag, short: "India" },
      {
        name: "United States of America",
        symbol: "USD",
        image: usaFlag,
        short: "USA",
      },
      { name: "United Kingdom", symbol: "GBP", image: ukFlag, short: "UK" },
      { name: "European Union", symbol: "EUR", image: EuropeFlag, short: "EU" },
      { name: "Dubai", symbol: "AED", image: dubaiFlag, short: "Dubai" },
      { name: "Brazil", symbol: "BRL", image: BrazilFlag, short: "Brazil" },
    ];

    setFilteredFiatCurrencies(fiatCurrencies);

    const defaultFiatCurrency = fiatCurrencies.find(currency =>
      currency.name === countryObject[selectedCountry].name
    );

    setSelectedFiatCurrency(defaultFiatCurrency || fiatCurrencies[0]);
  }, []);

  useEffect(() => {
    const defaultFiatCurrency = filteredFiatCurrencies.find(currency =>
      currency.name === countryObject[selectedCountry].name
    );

    setSelectedFiatCurrency(defaultFiatCurrency || filteredFiatCurrencies[0]); // Fallback to the first currency
  }, [selectedCountry, filteredFiatCurrencies]);

  const handleFiatCurrencySelect = (currency) => {
    const selectedKey = Object.keys(countryObject).find(key => countryObject[key].name === currency.name);
    dispatch(changeCountry(selectedKey));
    localStorage.setItem("Country", selectedKey);
    setSelectedFiatCurrency(currency);
    setIsFiatDropdownOpen(false);
  };

  const handleUsdtChange = (e) => {
    const value = e.target.value;
    if (value > walletAmount) {
      setInSufficientBalance(true);
    } else {
      setInSufficientBalance(false);
    }
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
    setIsValid(
      value && !isNaN(value) && Number(value) > 0 && Number(value) >= minAmount
    );
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const inr = selectedCurrency ? usdt * (selectedCurrency.Rate + extra) : 0;

  const handleSellNowClick = () => {
    if (isValid && selectedCurrency) {
      localStorage.setItem(
        "transactionDetails",
        JSON.stringify({
          amountPay: usdt,
          symbol: selectedCurrency.Symbol,
          ReceiveCurrency: countryObject[selectedCountry].fait
        })
      );
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/payment-method", {
          state: { amount: usdt, symbol: selectedCurrency.Symbol },
        });
      } else {
        navigate("/Sell2");
      }
    }
  };

  const toggleDetailsExpanded = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
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
    navigate("/sell2");
  }

  const handleBackClick = () => {
    if (login) {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  // Function to get the fiat icon based on the selected currency
  const getFiatIcon = () => {
    switch (selectedFiatCurrency?.symbol) {
      case "USD":
        return usaFlag; // US icon
      case "INR":
        return indiaFlag; // INR icon
      case "EUR":
        return EuropeFlag; // Euro icon

      case "GBP":
        return ukFlag;

      case "BRL":
        return BrazilFlag;
      case "AED":
        return dubaiFlag; // Euro icon
      default:
        return indiaFlag; // Fallback to INR icon
    }
  };

  return (
    <>
      <Navbar />
      <TradingEnvironment>
        <ExchangeCard>
          <div>
            <TabContainer>
              <BackButton onClick={handleBackClick}>
                <ChevronLeft />
              </BackButton>
              <Tab active>Sell Crypto</Tab>
            </TabContainer>

            <InputLabel>You sell</InputLabel>
            <InputContainer isInvalid={!isValid && Number(usdt) < minAmount}>
              <InputWrapper>
                <Input
                  type="number"
                  value={usdt}
                  min={minAmount}
                  onChange={handleUsdtChange}
                />
                <CurrencyToggle
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedCurrency && (
                    <CurrencyIcon src={usdtimg} style={{ width: "30px", height: "30px" }} alt={selectedCurrency.Symbol} />
                  )}
                  <Rocks>
                    <Buddy>
                      {selectedCurrency ? selectedCurrency.Name : "Select"}
                    </Buddy>
                    <CurrencySymbols>
                      {selectedCurrency?.Symbol}
                    </CurrencySymbols>
                  </Rocks>
                  <ChevronDown size={16} />
                </CurrencyToggle>
              </InputWrapper>
              <AnimatedDropdownContainer1 isOpen={isDropdownOpen}>
                <DropdownHeader>
                  <DropdownTitle>Select crypto</DropdownTitle>
                  <CloseButton onClick={() => setIsDropdownOpen(false)}>
                    <X size={24} />
                  </CloseButton>
                </DropdownHeader>
                {/* <SearchInput
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />*/}
                <CurrencyList>
                  {filteredCurrencies.map((currency) => (
                    <CurrencyItem
                      key={currency._id}
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      <CurrencyIcon src={usdtimg}  style={{ width: "30px", height: "30px" }} alt={currency.Symbol} />
                      <CurrencyInfo>
                        <Buddy>
                          <CurrencyName>{currency.Name}</CurrencyName>
                        </Buddy>
                        <CurrencySymbol>{currency.Symbol}</CurrencySymbol>
                      </CurrencyInfo>
                    </CurrencyItem>
                  ))}
                </CurrencyList>
              </AnimatedDropdownContainer1>
              <InputMessage isValid={isValid} inSufficientBalance={inSufficientBalance}>
                {isValid
                  ? inSufficientBalance ? "Insufficient Balance" : `You can proceed with this amount.`
                  : ` Minimum sell order is ${minAmount} USDT.`}
                {/* -{inSufficientBalance?"Insufficient Balance":null} */}
              </InputMessage>
            </InputContainer>

            <InputLabel>
              You receive (estimate)
              <TooltipContainer>
                <Info size={14} />
                <TooltipText>
                  Estimated value may vary slightly due to market fluctuations.
                </TooltipText>
              </TooltipContainer>
            </InputLabel>

            {/* <InputContainer>
              <InputWrapper>
                <Input
                  type="text"
                  value={isValid ? inr.toFixed(2) : 0}
                  readOnly
                />
                <CurrencyToggle>
                  <CurrencyIcon as="div">
                    <CurrencyIcon src={ind} />
                  </CurrencyIcon>
                  <Buddy>INR</Buddy>
                </CurrencyToggle>
              </InputWrapper>
            </InputContainer> */}

            <InputContainer>
              <InputWrapper>
                <Input type="text" value={`₹ ${inr.toFixed(2)}`} readOnly />
                <CurrencyToggle
                  onClick={() => setIsFiatDropdownOpen(!isFiatDropdownOpen)}
                >
                  {selectedFiatCurrency && (
                    <CurrencyIcon
                      src={getFiatIcon()}
                      alt={selectedFiatCurrency.symbol}
                      style={{ borderRadius: "50%" }}

                    />
                  )}
                  <Rocks>
                    <Buddy>
                      {selectedFiatCurrency
                        ? selectedFiatCurrency.short
                        : "Select"}
                    </Buddy>
                    <CurrencySymbols>
                      {selectedFiatCurrency?.symbol}
                    </CurrencySymbols>
                  </Rocks>
                  <ChevronDown size={16} />
                </CurrencyToggle>
              </InputWrapper>
              <AnimatedDropdownContainer isOpen={isFiatDropdownOpen}>
                <DropdownHeader>
                  <DropdownTitle>Select fiat currency</DropdownTitle>
                  <CloseButton onClick={() => setIsFiatDropdownOpen(false)}>
                    <X size={24} />
                  </CloseButton>
                </DropdownHeader>
                <CurrencyList>
                  {filteredFiatCurrencies.map((currency) => (
                    <CurrencyItem
                      key={currency.symbol}
                      onClick={() => handleFiatCurrencySelect(currency)}
                    >
                      <CurrencyIcon
                        src={currency.image}
                        alt={currency.Symbol}
                      />
                      <CurrencyInfo>
                        <Buddy>
                          <CurrencyName>{currency.name}</CurrencyName>
                        </Buddy>
                        <CurrencySymbol>{currency.symbol}</CurrencySymbol>
                      </CurrencyInfo>
                    </CurrencyItem>
                  ))}
                </CurrencyList>
              </AnimatedDropdownContainer>
            </InputContainer>

            <UpdateText>Updating rates</UpdateText>

            <OrderSummary>
              <OrderTitle onClick={toggleDetailsExpanded}>
                <b>Your order</b>
                <div style={{ display: "flex" }}>
                  {inr.toFixed(2) === "0.00" ? null : (
                    <p>
                      <b>
                        {usdt} {selectedCurrency.Name}{" "}
                      </b>
                      to <b>{isValid ? inr.toFixed(2) : 0} {selectedFiatCurrency.symbol} </b>
                    </p>
                  )}
                  {isDetailsExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </OrderTitle>
              {isDetailsExpanded && (
                <>
                  <OrderDetail>
                    <span>1 {selectedCurrency?.Name}</span>
                    <span>
                      ≈ {selectedCurrency?.Rate} {extra ? `+ ${extra}` : null}{" "}
                      {selectedFiatCurrency?.symbol}
                    </span>
                  </OrderDetail>
                  <OrderDetail>
                    <span>
                      Processing fee
                      <TooltipContainer>
                        <Info size={14} />
                        <TooltipText>
                          Fee charged for processing the transaction.
                        </TooltipText>
                      </TooltipContainer>
                    </span>
                    <span>as low as {countryObject[selectedCountry].symbol} {transactionFee}</span>
                  </OrderDetail>
                  <OrderDetail>
                    <span>
                      Network fee
                      <TooltipContainer>
                        <Info size={14} />
                        <TooltipText>
                          Fee charged by the network for sending the
                          transaction.
                        </TooltipText>
                      </TooltipContainer>
                    </span>
                    <span>as low as {countryObject[selectedCountry].symbol} {networkFee}</span>
                  </OrderDetail>
                </>
              )}
            </OrderSummary>
          </div>
          <div>
            {inSufficientBalance ?
              <ProceedButton onClick={() => navigate('/deposit')}>
                Add USDT to Wallet
              </ProceedButton>
              :
              <ProceedButton onClick={handleSellNowClick} disabled={!isValid}>
                Proceed · Sell {selectedCurrency?.Name} <ChevronRight />
              </ProceedButton>
            }

            <PaymentMethods>
              <PaymentIcon />
            </PaymentMethods>

            <PoweredBy>
              Powered by <Moonn src={logoM} />
            </PoweredBy>
          </div>
          <Indicator onClick={toggleCardVisibility}>
            <Info size={20} />
          </Indicator>
          {isCardVisible && (
            <Card>
              <p>
                This is the detailed card shown when the indicator is clicked.
              </p>
            </Card>
          )}
        </ExchangeCard>
        <Container>
          <PriceDisplay>
            <Price> ₹ {selectedCurrency?.Rate}</Price>
          </PriceDisplay>
          <Subtext>1 USDT = ₹ {selectedCurrency?.Rate}</Subtext>
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
                      <b>{selectedCurrency?.Rate} + 0.25</b>
                    </TableCell>
                  </tr>
                  <tr>
                    <TableCell>
                      <b>2150 + USDT </b>
                    </TableCell>
                    <TableCell>
                      <b>{selectedCurrency?.Rate} + 0.5</b>
                    </TableCell>
                  </tr>
                  <tr>
                    <TableCell>
                      <b>3255 + USDT </b>
                    </TableCell>
                    <TableCell>
                      <b>{selectedCurrency?.Rate} + 1</b>
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
      </TradingEnvironment>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Sell1;
