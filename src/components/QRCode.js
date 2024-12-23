import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import HomeContact from './HomeContact';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
`;

const Card = styled.div`
    background-color: white;
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 380px;
    height: 610px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 5%;

    @media (max-width: 480px) {
        /* padding: 1rem; */
        width: 100%;
        /* height: auto; */
    }
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const QRCode = styled.div`
  background-color: #f0f0f0;
  border: 2px solid #f7a600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TransactionLabel = styled.p`
color: #f7a600;
  text-align: center;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e69500;
  }
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.9rem;
  text-align: center;
`;

const BackButton = styled.button`
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  /* z-index: 1001; */
  display: none;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Center = styled.div`
    height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    align-items: center;
`;


const QRCodeCard = () => {
    const [localData, setLocalData] = useState({});
    const [transactionFee, setTransactionFee] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    const fetchTransactionFee = async () => {
        try {
            const response = await fetch('http://147.93.20.176:8000/static/get/66c445a358802d46d5d70dd4');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransactionFee(data.TransactionFee);
        } catch (error) {
            setError('Error fetching transaction fee');
        }
    };

    const fetchCurrencyData = async () => {
        try {
            const response = await fetch('http://147.93.20.176:8000/currencies/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const currency = data.find(curr => curr.Symbol === localData.symbol);
            if (currency) {
                setImage(currency.QRCode);
                setTransactionId(currency.TransactionId);
                setCurrencyRate(currency.Rate);
            } else {
                setError('Currency not found');
            }
        } catch (error) {
            setError('Error fetching currency data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('transactionDetails'));
        setLocalData(data);
        //console.log(data)
        fetchTransactionFee();
    }, []);

    useEffect(() => {
        if (localData.symbol) {
            fetchCurrencyData();
        }
    }, [localData.symbol]);



    const handleProceedClick = () => {
        navigate('/sell4');
    };


    return (
        <>
            <PageContainer>
                <div style={{ width: "100%" }}>
                    <BackButton onClick={() => window.history.back()}>Back</BackButton>
                </div>
                <Navbar />
                <Center>
                    <Card>
                        <Title>Sell {localData.symbol}</Title>
                        <div>
                            <QRCodeContainer>
                                <QRCode><img src={`http://147.93.20.176:8000/uploads/${image}`} width='150px' alt="QR code" /></QRCode>
                            </QRCodeContainer>
                            <TransactionLabel>Transaction ID: {transactionId}</TransactionLabel>
                        </div>
                        <Button onClick={handleProceedClick}>Submit</Button>
                    </Card>
                </Center>
            </PageContainer>
            <HomeContact />
            <Footer />
        </>
    );
};

export default QRCodeCard;