import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import HomeContact from "./HomeContact";
import Modal from "./ConformationModal";
import { MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TriangleAlert } from 'lucide-react';
import moneyIcon from '../assets/usdtt.png';
import networkIcon from '../assets/usdtt.png';
import { useSelector } from "react-redux";
import Bepimg from "./../assets/bep21(1).png";
import trcimg from "./../assets/trc20(1).png";
import usdtimg from "./../assets/usdt1-removebg-preview(2).png";
import { Check } from 'lucide-react';

const PageContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // background-color: black;
  // padding: 20px;
  // padding-top:-50px;
  // @media (max-width: 480px) {
  //   padding-top: 80px;
  // }

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color:black;
  font-family: 'Roboto', sans-serif;
  // min-height: 100vh;
  /* padding-top: 140 px; */
  @media (max-width: 480px) {
  padding-top: 80px;
  }
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
  font-size: 24px;
  font-weight: 700;
`;

const Card = styled.div`
  background-color: white;
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 375px) {
    width: 320px;
  }
  @media (max-width: 320px) {
    width: 300px;
  }
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 375px) {
flex-wrap: wrap;
  }

`;

const Label1 = styled.span`
  color: black;
`;

const Label = styled.span`
  color: black;
  font-weight: bolder;
`;

const Value = styled.span`
  color: black;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #f7a600;
  color: black;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e69500;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background-color: #f7a600;
  color: black;
  border: none;
  font-weight: 700;
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  width: 80px;
  @media (max-width: 375px) {
margin: 2%;
  }
  &:hover {
    background-color: #e69500;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #ffa500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Center = styled.div`
  /* height: calc(100vh - 64px); */
  display: flex;
  justify-content: center;

  .example::-webkit-scrollbar {
    display: none;
  }
  .example {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const QRcodeHeading = styled.div`
 display : flex;
 justify-content : center;
 align-items :center;
 text-align : justify;
`

const QRcodeHeadingText = styled.div`
font-size : 18px;
color : black;
`

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 0.1px solid #efdebc;
  // background-color: #f7a6000a;
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
`;


const QRCode = styled.div`
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.p`
  color: black;
  font-size: 24px;
  border-bottom: 1px solid #f7a600;
  margin-bottom: 20px;
  width: fit-content;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 19px;
  }
`;

const BoxPara = styled.p`
  border: 2px solid #f7a600;
  border-radius: 5px;
  background-color: #f7a60042;
  color: black;
  margin: 15px 0;
  padding: 10px;
  font-size: 14px;
`;

const Text = styled.p`
  color: black;
  font-size: 14px;
`;

const FaintText = styled.p`
  color: #757575;
  font-size: 12px;
  margin: 10px 0;
`;

const SubmitAnimation = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 5px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const TxidDisclaimerWrapper = styled.div`
  display : flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top : 8px;
  
  `

const TxidDisclaimer = styled.span`

  font-size: 14px;
  font-weight: 400;
  text-align : justify;
  color : black
`;




const Disclaimer = styled.div`
display : flex;
  align-items: center;
  gap : 1rem;
  color : black;
  margin-top : 15px;

  `;

const DisclaimerIcon = styled.div`

`;

const DisclaimerText = styled.span`
  font-size: 10px;
  font-weight: 550;
  // text-align : justify;
`;

// 
const NetworkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 0.5rem;
  // background-color: #f0f0f0;
`;

const NetworkButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
`;



const SelectedNetwork = styled(NetworkButton)`
  width: 40%;
  height :100%;
  background-color: orange;
  color: black;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  cursor: not-allowed;
  
 
`;


const DeposiWrapper = styled.div`
display : flex;
flex-direction : row;
margin-top : 10px;
justify-content  : space-between;

`;



const DepositNetworkWrapper = styled.div`
display : flex;
flex-direction : column;
gap : 5px;
  position: relative; 

`;

const DepositNetworkHeading = styled.div`
 color : black;
 font-size : 16px;
 font-weight : 700;
 
 
`;

const DepositNetworkvalues = styled.div`
 display : flex;
 flex-direction : row;
 align-items:  center;
 color : black;
 margin-top : 5px;
 gap : 5px;
  // background-color: #e5e5e5;
  color: black;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 14px; /* Slightly smaller font for better scaling */
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px; /* Reduce gap slightly */
  min-width: 120px; /* Prevent the button from getting too narrow */
  transition: background-color 0.3s;

    // width: 40%;
  // background-color: orange;
  color: black;
  font-weight: 700;
  border: 2px solid orange;
  border-radius: 0.5rem;

`;

const DepositNetworkvalues1 = styled.img`
  width: 18px;
  height: 18px;
  // margin-right: 0.75rem;   
  

`;


const DepositNetworkvalues2 = styled.div`
 font-size : 16px;
 font-weight : bold;  
 color : black; 
`;




const DepositAmountWrapper = styled.div`
display : flex;
flex-direction : column;
gap : 5px;
`;

const DepositAmountHeading = styled.div`
 color : black;
 font-size : 16px;
 font-weight : 700;
`;

const DepositAmountvalues = styled.div`
 display : flex;
 flex-direction : row;
 align-items:  center;
 color : black;
 margin-top : 5px;
//  background-color : ;

 gap : 5px;

    background-color: #e5e5e9;
  color: black;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 14px; /* Slightly smaller font for better scaling */
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px; /* Reduce gap slightly */
  min-width: 120px; /* Prevent the button from getting too narrow */
  transition: background-color 0.3s;
  

`;

const DepositAmountvalues1 = styled.img`
  width: 18px;
  height: 18px;
  // margin-right: 0.75rem;   
  
  
`;


const DepositAmountvalues2 = styled.div`
 font-size : 16px;
 font-weight : bold;  
 color : black; 
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height : 5px;
`;

const TimerCard = styled.div`
  background-color: #f0f0f0; // Light gray background
  border-radius: 5px;
  padding: 2px;
  margin: 0 3px; // Minimal gap between cards
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1; // Makes each card take equal space
`;

const TimerValue = styled.div`
  font-size: 14px; // Larger font size for visibility
  font-weight: 700;
  color: #333; // Dark text color for contrast
`;

const TimerLabel = styled.div`
  font-size: 10px; // Smaller font size for the label
  color: #666; // Lighter text color for the label
`;

const Balance = styled.div`
  display: flex;
  justify-content: flex-start; /* Align content to the left */
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: black;
  margin-bottom: 1rem;

  p {
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-top: 5px; 
    margin-right: 0; /* Remove right margin to keep content aligned */
    font-weight: bold;
    // background-color: #2b9178;
    border-radius: 4px;
    color: black;
    width: 100%; /* Allow p to take full width for left alignment */
    justify-content: flex-start; /* Align contents inside p to the left */
  }

  img {
    margin-left: 5px;
    width: 26px;
    height: 26px;
  }
`;

// const CountDownWrapper = Styled.div 
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

const Depposit1 = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const textRef = useRef();
  const textTransactionRef = useRef();
  const [localData, setLocalData] = useState({});
  const [transactionFee, setTransactionFee] = useState(0);
  const [submited, setSubmitted] = useState(false);
  const [transaction, setTransaction] = useState("");
  const [networkFee, setNetworkFee] = useState(0);
  const [currencyRate, setCurrencyRate] = useState(0);
  const [coinName, setCoinName] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [image, setImage] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const targetDate = useRef(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showSubmitAnimation, setShowSubmitAnimation] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
  const [createdTime, setCreatedTime] = useState(null);
  const navigate = useNavigate();

  const [selectNetwork, setSelectNetwork] = useState(() => {
    const storedNetworkDetails = localStorage.getItem('networkDetails');
    if (storedNetworkDetails) {
      const networkDetails = JSON.parse(storedNetworkDetails);
      return networkDetails.network;
    } else {
      return 'TRC20'; // default network if no data in local storage
    }
  });


  useEffect(() => {
    const networkDetails = JSON.parse(localStorage.getItem('networkDetails'));
    if (!networkDetails) {
      navigate('/')
    } else {
      const network = networkDetails.network;
      const amount = networkDetails.depositamount;
      setNetwork(network)
      setAmount(amount)
      console.log(network)
      console.log(networkDetails)
      console.log(amount)
    }
  }, [])

  // console.log();
  // console.log(amount);


  // Created Time 
  useEffect(() => {
    // Set the created time when the component loads or when the transaction is started.
    setCreatedTime(new Date().toLocaleString()); // You can format this as needed
  }, []);


  useEffect(() => {
    const fetchNetworkDetails = async () => {
      try {
        const response = await fetch('http://localhost:3001/network-details');
        const data = await response.json();

        if (!localStorage.getItem('networkDetails')) {
          setSelectedNetwork(data.network);
          setEnteredAmount(data.depositamount);
        }

        // console.log(setSelectedNetwork);
        // console.log(data.depositamount);
      } catch (error) {
        console.error('Error fetching network details:', error);
      }
    };




    const storedNetworkDetails = localStorage.getItem('networkDetails');
    if (storedNetworkDetails) {
      const networkDetails = JSON.parse(storedNetworkDetails);
      setSelectedNetwork(networkDetails.network);
      setEnteredAmount(networkDetails.depositamount);
    } else {
      fetchNetworkDetails(); // fetch from API if no data in local storage
    }
  }, []);




  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? console.log() : navigate("/sell2");
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const timeDifference = targetDate.current - now;

      if (timeDifference <= 0) return "00:00:00";

      let totalSeconds = Math.floor(timeDifference / 1000);
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds % 3600) / 60);
      let seconds = totalSeconds % 60;

      const formatTime = (time) => time.toString().padStart(2, "0");

      return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchTransactionFee = async () => {
    try {
      const response = await fetch(`https://crypto-backend-main.onrender.com/static/${countryObject[selectedCountry]?.urlName}/one`);
      /* const countResponse = await fetch("https://crypto-backend-main.onrender.com/transactions/get/count"); */

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      /* const countData = await countResponse.json(); */
      /* setOrderId(`15300990${countData.Count + 1}`); */
      setTransactionFee(data.TransactionFee);
      setNetworkFee(data.NetworkFee);
    } catch (error) {
      setError("Error fetching transaction fee");
    }
  };

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(`https://crypto-backend-main.onrender.com/currencies/${countryObject[selectedCountry].urlName}/all`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data, network)
      const currency = data.find((curr) => curr.Symbol === network);
      if (currency) {
        setImage(currency.QRCode);
        setTransactionId(currency.TransactionId);
        setCurrencyRate(currency.Rate);
        setCoinName(currency.Name);
      } else {
        setError("Currency not found");
      }
    } catch (error) {
      setError("Error fetching currency data");
    }
  };

  useEffect(() => {
    console.log(selectedCountry)
    fetchCurrencyData();
  }, [network, selectedCountry]);

  useEffect(() => {
    fetchCurrencyData();
  }, [selectNetwork])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactionDetails"));
    setLocalData(data);
    fetchTransactionFee();
    const intervalId = setInterval(fetchTransactionFee, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const calculateReceivedAmount = () => {
    if (!currencyRate || !localData.amountPay || !transactionFee || !networkFee) return 0;
    var totalAmount;
    if (localData.amountPay >= 1075 && localData.amountPay < 2150) {
      //console.log(0.25);
      totalAmount = localData.amountPay * (currencyRate + 0.25);
    } else if (localData.amountPay >= 2150 && localData.amountPay < 3255) {
      //console.log(0.5);
      totalAmount = localData.amountPay * (currencyRate + 0.5);
    } else if (localData.amountPay >= 3255) {
      //console.log(1);
      totalAmount = localData.amountPay * (currencyRate + 1);
    } else {
      //console.log(0);
      totalAmount = localData.amountPay * currencyRate;
    }
    return totalAmount - transactionFee - networkFee;
  };

  const handleProceedClick = () => {
    if (transaction === "") {
      toast.error("Please Enter TxID", {
        position: "top-left",
        style: {
          fontSize: "14px", // Adjust font size for mobile
          fontWeight: "bold", // Make text bold
          color: "#333", // Text color
          border: "1px solid #f0a500", // Add border
          borderRadius: "8px", // Rounded corners
          backgroundColor: "#fffdf5", // Light background color
          padding: "10px", // Padding for better spacing
          width: "90vw", // Full width on mobile
          maxWidth: "300px", // Cap max width for larger screens
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },

      }

      );
    } else {
      setShowConfirmation(true);
    }
  };

  // const confirmTransaction = async () => {
  //   setShowConfirmation(false);
  //   try {
  //     const response = await fetch("https://crypto-backend-main.onrender.com/transactions/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         Email: localStorage.getItem("token"),
  //         Name: localData.Name,
  //         TransactionId: transaction,
  //         Country: localData.Country,
  //         BankName: localData.BankName,
  //         AccountNumber: localData.AccountNumber,
  //         IFSC: localData.IFSC,
  //         USDTAmount: localData.amountPay,
  //         Token: localData.symbol,
  //         ProcessingFee: transactionFee,
  //         NetworkFee: networkFee,
  //         ReceivedAmount: calculateReceivedAmount(),
  //         Status: "Pending",
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     setSavedData(result.transaction);
  //     navigate("/sell5", { state: { data: result.transaction } });
  //   } catch (error) {
  //     alert("Error submitting transaction: " + error.message);
  //   }
  // };




  // api

  const confirmTransaction = async () => {
    setShowConfirmation(false);
    setLoading(true);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    try {
      const data = JSON.parse(localStorage.getItem("networkDetails"));

      /* console.log({
        Email: localStorage.getItem("token"),
        Amount: data.depositAmount,
        Network: network,
        Status: "Pending",
        Date: formattedDate,
        Time: formattedTime,
      }) */
      const response = await fetch("https://crypto-backend-main.onrender.com/deposit-transactions/add", { // Updated URL for the backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: localStorage.getItem("token"),
          Amount: data.depositamount,
          Network: network,
          Status: "Pending",
          Date: formattedDate,
          Time: formattedTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");

      }

      const result = await response.json();
      setSavedData(result);
      setShowSuccess(true);
      localStorage.removeItem("networkDetails");
      localStorage.removeItem("transaction");
      navigate("/sell6", { state: { data: result } });
    } catch (error) {
      alert("Error submitting transaction: " + error.message);
    } finally {
        setLoading(false)
    }
  };


  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const closeSuccessPopup = () => {
    setShowSuccess(false);
    navigate("/transaction");
  };

  // const copyToClipboard = () => {
  //   let copyText = textRef.current.value;
  //   let isCopy = copy(copyText);
  //   if (isCopy) {
  //     toast.success("Copied",);
  //   }
  // };

  const copyId = () => {
    let copyText = textTransactionRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied", {
        position: "top-left",
        style: {
          fontSize: "14px", // Adjust font size for mobile
          fontWeight: "bold", // Make text bold
          color: "#333", // Text color
          border: "1px solid #f0a500", // Add border
          borderRadius: "8px", // Rounded corners
          backgroundColor: "#fffdf5", // Light background color
          padding: "10px", // Padding for better spacing
          width: "90vw", // Full width on mobile
          maxWidth: "300px", // Cap max width for larger screens
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };

  const handleTransactionChange = (e) => {
    const value = e.target.value;
    setTransaction(value);
    setIsSubmitDisabled(value.trim() === "");
  };

  const submitTrans = () => {
    localStorage.setItem("transaction", transaction);
    setSubmitted(true);
    setShowSubmitAnimation(true);
    setTimeout(() => setShowSubmitAnimation(false), 3000);
  };

  const editId = () => {
    setSubmitted(false);
  };



  const handleTrcClick = () => {
    setSelectNetwork('TRC20');
  };

  const handleBepClick = () => {
    setSelectNetwork('BEP20');
  };


  return (
    <>
      <Navbar />
      <PageContainer>
        <ToastContainer />
        <Center>
          <Card className="example">
            <TabContainer>
              <BackButton onClick={() => window.history.back()}>
                <ChevronLeft />
              </BackButton>
              <Tab active>USDT Deposit</Tab>
            </TabContainer>

            <div>
              <QRcodeHeading>
                <QRcodeHeadingText>
                  Scan The QR code To Deposit
                </QRcodeHeadingText>
              </QRcodeHeading>
            </div>
            <QRCodeContainer>
              <QRCode>
                <img
                  src={`https://crypto-backend-main.onrender.com/uploads/${image}`}
                  width="100px"
                  alt="QR code"
                />
              </QRCode>
            </QRCodeContainer>



            <FaintText> Deposit Address ({network})</FaintText>
            <InfoRow
              style={{
                color: "black",
                border: "#efdebc solid 0.5px",
                borderRadius: "5px",
                padding: "6px",
                backgroundColor: "#f7a6000a",
              }}
            >
              <input
                style={{
                  fontSize: "10.5px",
                  border: "none",
                  backgroundColor: "transparent",
                  flexGrow: 1,
                  color: "black",
                  fontWeight: "bold",

                }}
                type="text"
                disabled
                value={transactionId}
                ref={textTransactionRef}
              />
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onClick={copyId}
              >
                <MdContentCopy />
                Copy
              </p>
            </InfoRow>

            {/* Timer started */}


            {/* Add countdown timer below the deposit address */}
            {/* <InfoRow style={{ marginTop: "10px", textAlign: "center" }}>
              <Label1>Time Remaining</Label1>
              <Value>{timeLeft}</Value>
            </InfoRow> */}

            <InfoRow style={{ textAlign: "center" }}>
              <Label1 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px', color: '#333' }}>
                Time Remaining
              </Label1>
              <TimerContainer>
                {timeLeft.split(':').map((time, index) => (
                  <TimerCard key={index}>
                    <TimerValue>{time}</TimerValue>
                    <TimerLabel>{['Hours', 'Minutes', 'Seconds'][index]}</TimerLabel>
                  </TimerCard>
                ))}
              </TimerContainer>
            </InfoRow>

            {/* Timer ended */}
            <InfoRow
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                marginTop: "15px",
                width: "100%", // Ensures it fits within the container
                paddingRight: "10px", // Adds a buffer to the right side
                boxSizing: "border-box",
              }}
            >
              <Label>TxID:</Label>
              <input
                style={{
                  padding: "5px",
                  margin: "0 5px",
                  fontSize: "16px",
                  flexGrow: 1,
                  maxWidth: "65%", // Adjusts to keep both elements visible
                  border: "black solid 1px",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
                type="text"
                value={transaction}
                onChange={handleTransactionChange}
                disabled={submited}
              />
              {submited ? (
                <SubmitButton onClick={editId}>Edit</SubmitButton>
              ) : (
                <SubmitButton onClick={submitTrans} disabled={isSubmitDisabled}>
                  Submit
                </SubmitButton>
              )}
            </InfoRow>

            {showSubmitAnimation && (
              <SubmitAnimation>TxID submitted successfully!</SubmitAnimation>
            )}
            <TxidDisclaimerWrapper>
              <TxidDisclaimer>

                Please ensure that TxID you have entered is correct
              </TxidDisclaimer>
            </TxidDisclaimerWrapper>

            <hr style={{ marginTop: '10px' }} />

            <DeposiWrapper>
              <DepositAmountWrapper>
                <DepositAmountHeading>
                  Deposit Amount
                </DepositAmountHeading>
                {/* <DepositAmountvalues>
                  <DepositAmountvalues1 src={usdtimg}style={{ width: "22px", height: "22px" }} alt="image" />
                  <DepositAmountvalues2>
                    <span>
                      {amount}
                    </span>
                  </DepositAmountvalues2>
                </DepositAmountvalues> */}
                <Balance>
                  <p>
                    <span style={{
                      // backgroundColor: "#d3d3d3",
                      paddingTop: "5px",
                      paddingRight: "2px",
                      borderRadius: "4px 0px 0px 4px"
                    }}>
                      <img src={usdtimg} alt="coin" />
                    </span>
                    <span style={{
                      // marginLeft: "8px",
                      marginRight: "8px",
                      fontSize: "16px",
                      // paddingLeft : "10px",
                      fontWeight: "700",
                      minWidth: "40px", // Set a minimum width
                      width: "auto", // Allow the width to grow as needed
                      display: "inline-block" // Ensure it behaves like a block element
                    }}>
                      {amount}
                      <span> USDT</span>
                    </span>
                  </p>
                </Balance>
              </DepositAmountWrapper>



              <DepositNetworkWrapper>
                <Check
                  strokeWidth={3}
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "5px",
                    backgroundColor: "#FFF176",

                    borderRadius: "50%",
                    padding: "2px",
                    color: "#000000",
                    width: "16px",
                    height: "16px"
                  }}
                />
                <DepositNetworkHeading>
                  Deposit Network
                </DepositNetworkHeading>

                <DepositNetworkvalues>
                  <DepositNetworkvalues1

                    src={network === 'TRC20' ? trcimg : Bepimg}
                    alt="network icon" />
                  <DepositNetworkvalues2>
                    <span>
                      {network}
                    </span>
                  </DepositNetworkvalues2>
                </DepositNetworkvalues>
              </DepositNetworkWrapper>
            </DeposiWrapper>
            <hr style={{ marginTop: '10px' }} />

            {/* <CountDownWrapper>

            </CountDownWrapper> */}

            <InfoRow style={{ marginTop: "10px", textAlign: "center" }}>
              <Label1 style={{ fontWeight: "600" }}>Date & Time</Label1>
              <Value style={{ fontSize: "13px" ,fontWeight: "550"}}>{createdTime}</Value>
            </InfoRow>

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


            <Button onClick={handleProceedClick} disabled={!submited}>
            {loading?<div style={{display:"flex", justifyContent:"center"}}><div class="loader"></div></div>:"Deposit Sent"}
            </Button>
          </Card>
        </Center>
      </PageContainer>
      {/* <HomeContact /> */}
      <Footer />

      {showConfirmation && (
        <Modal
          title="I have transferred the crypto to the indicated address and network"
          message="Are you sure you want to proceed with this transaction?"
          onConfirm={confirmTransaction}
          onCancel={cancelConfirmation}
        />
      )}

      {showSuccess && savedData && (
        <Modal
          title="Transaction Successful"
          message={
            <div>
              <p>Transaction ID: {savedData.OrderId}</p>
              <p>Amount: {savedData.ReceivedAmount}</p>
              <p>Status: {savedData.Status}</p>
            </div>
          }
          onConfirm={closeSuccessPopup}
          showDoneButton
        />
      )}
    </>
  );
};

export default Depposit1;



