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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: black;
  padding: 20px;
  padding-top: 140px;
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

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 0.1px solid #efdebc;
  background-color: #f7a6000a;
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

const Sell4 = () => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [image, setImage] = useState("");
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const targetDate = useRef(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showSubmitAnimation, setShowSubmitAnimation] = useState(false);

  const navigate = useNavigate();

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
      const response = await fetch("https://crypto-tusv.onrender.com/static/get/66c445a358802d46d5d70dd4");
      const countResponse = await fetch("https://crypto-tusv.onrender.com/transactions/get/count");

      if (!response.ok && !countResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const countData = await countResponse.json();
      setOrderId(`15300990${countData.Count + 1}`);
      setTransactionFee(data.TransactionFee);
      setNetworkFee(data.NetworkFee);
    } catch (error) {
      setError("Error fetching transaction fee");
    }
  };

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch("https://crypto-tusv.onrender.com/currencies/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const currency = data.find((curr) => curr.Symbol === localData.symbol);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localData.symbol) {
      fetchCurrencyData();
    }
  }, [localData.symbol]);

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
      toast.error("Please Enter TxID");
    } else {
      setShowConfirmation(true);
    }
  };

  const confirmTransaction = async () => {
    setShowConfirmation(false);
    try {
      const response = await fetch("https://crypto-tusv.onrender.com/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: localStorage.getItem("token"),
          Name: localData.Name,
          TransactionId: transaction,
          Country: localData.Country,
          BankName: localData.BankName,
          AccountNumber: localData.AccountNumber,
          IFSC: localData.IFSC,
          USDTAmount: localData.amountPay,
          Token: localData.symbol,
          ProcessingFee: transactionFee,
          NetworkFee: networkFee,
          ReceivedAmount: calculateReceivedAmount(),
          Status: "Pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setSavedData(result.transaction);
      navigate("/sell5", { state: { data: result.transaction } });
    } catch (error) {
      alert("Error submitting transaction: " + error.message);
    }
  };

  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const closeSuccessPopup = () => {
    setShowSuccess(false);
    navigate("/transaction");
  };

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied");
    }
  };

  const copyId = () => {
    let copyText = textTransactionRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied");
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
              <Tab active>How to Complete Your Sell</Tab>
            </TabContainer>

            <div>
              <InfoRow>
                <Label>Order ID</Label>
                <Value>
                  <input
                    style={{
                      width: "150px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "right",
                      color: "rgb(123 119 119)",
                    }}
                    value={orderId}
                    disabled
                    type="text"
                    ref={textRef}
                  />
                  <MdContentCopy
                    style={{ cursor: "pointer" }}
                    onClick={copyToClipboard}
                  />
                </Value>
              </InfoRow>
              <Heading>Transaction Summary</Heading>
              <InfoRow>
                <Label1>You're Selling</Label1>
                <Value>
                  {localData.amountPay} {coinName}{" "}
                </Value>
              </InfoRow>
              <InfoRow>
                <Label1>Transaction Fee</Label1>
                <Value>₹{transactionFee}</Value>
              </InfoRow>
              <InfoRow>
                <Label1>Network Fee</Label1>
                <Value>₹{networkFee}</Value>
              </InfoRow>
              <InfoRow>
                <Label1>You'll Receive</Label1>
                <Value>₹{calculateReceivedAmount()}</Value>
              </InfoRow>
            </div>
            <hr />
            <BoxPara>
              Please Transfer USDT to the address within{" "}
              <span style={{ color: "red" }}>{timeLeft}</span> after that time,
              transaction will expire.
            </BoxPara>

            <Text>
              From Your Wallet, send {localData.amountPay} {coinName} to exclusive
              MoonPay's deposit address below.
            </Text>
            <FaintText>Address ({localData.symbol})</FaintText>
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
            <QRCodeContainer>
              <QRCode>
                <img
                  src={`https://crypto-tusv.onrender.com/uploads/${image}`}
                  width="150px"
                  alt="QR code"
                />
              </QRCode>
            </QRCodeContainer>
            <InfoRow>
              <Label>TxID:</Label>
              {submited ? (
                <input
                  style={{
                    padding: "5px",
                    margin: "0 5px",
                    fontSize: "16px",
                    flexGrow: 1,
                    border: "black solid 1px",
                    borderRadius: "5px",
                  }}
                  type="text"
                  value={transaction}
                  onChange={handleTransactionChange}
                  disabled
                />
              ) : (
                <input
                  style={{
                    padding: "5px",
                    margin: "0 5px",
                    fontSize: "16px",
                    flexGrow: 1,
                    border: "black solid 1px",
                    borderRadius: "5px",
                  }}
                  type="text"
                  value={transaction}
                  onChange={handleTransactionChange}
                />
              )}

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
            <hr />
            <Heading style={{ marginTop: "15px" }}>What Happens Next?</Heading>
            <Text>
              Once We've received your crypto deposit, we'll send the pay-out
              within 1-2 hours max.
            </Text>
            <Button onClick={handleProceedClick} disabled={!submited}>
              Deposit Sent
            </Button>
          </Card>
        </Center>
      </PageContainer>
      <HomeContact />
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

export default Sell4;