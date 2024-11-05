import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BinanceImage from '../assets/Binancee2.png'; // Replace with actual path
import ByBitImage from '../assets/bybit.png'; // Replace with actual path
import BitgetImage from '../assets/Bitget.png'; // Replace with actual path
import WazirxImage from '../assets/Coinbase2.png'; // Replace with actual path
import { useSelector } from 'react-redux';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  width: 80%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 95%;
    justify-items: center;
  }
`;

const Card = styled.div`
  background-color: black;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 270px;
  border: 1px #1e1e1e solid;

  @media (max-width: 430px) {
    width: 100%;
    justify-content: center;
    height: 225px;
    align-items: center;
  }
`;

const CoinIcon = styled.div`
  width: 100%;
  /* height: 150px; Adjust the height as needed */
  height: 100%;
  margin-bottom: 0.5rem;
  background-color: #e6f7ff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 430px) {
    height: 80px !important; 
  }
  @media (max-width: 375px) {
    height:65px  !important; 
   
  }
  img {
    width: 100%;
    height: 100%; 
   @media (max-width: 430px) {
    height:80px  !important; 
   
  }
  @media (max-width: 375px) {
    height:65px  !important; 
   
  }
  }
`;

const ExchangeName = styled.div`
  background-color: #ffa500;
  color: black;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
  top: -20px;

  @media (max-width: 430px) {
    font-size: 0.8rem;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 800;
  color: white;

  @media (max-width: 320px) {
    text-align: center;
    font-size: 0.9em;
  }
`;

const SubText = styled.div`
  font-size: 0.68rem;
  color: #999;
  margin: 5px;
  font-weight : 1000;
  @media (max-width: 320px) {
    text-align: center;
    font-size: 0.6em;
  }
`;

const MinMaxPrice = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  background-color: #2a2a2a;
  border-radius: 20px;
`;

const PriceInfo = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  color: #aaa;
`;
const Yellow = styled.span`
color: orange;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
  color: white;
  margin-top: 4%;

  @media (max-width: 480px) {
    font-size: 1.87rem;
    text-align: center;
    width: auto;
    margin-top: 8%;
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

const CryptoPriceCard = ({ exchange, avgPrice, usdtPrice, minPrice, maxPrice, image, selectedCountry }) => (
  <Card>
    <CoinIcon>
      <img src={image} alt={exchange} />
    </CoinIcon>
    <ExchangeName>{exchange}</ExchangeName>
    <Price>Avg {countryObject[selectedCountry]?.symbol} {avgPrice}</Price>
    <SubText>1 USDT = {countryObject[selectedCountry]?.symbol} {usdtPrice}</SubText>
{  /*  <MinMaxPrice>
      <PriceInfo>Min ₹ {minPrice}</PriceInfo>
      <PriceInfo>Max ₹ {maxPrice}</PriceInfo>
    </MinMaxPrice>*/}
  </Card>
);

const CryptoPriceGrid = () => {
  const selectedCountry = useSelector((state) => state.country.value);
  const [data, setData] = useState({});

  const fetchTransactionFee = async () => {
    try {
      const response = await fetch(`https://crypto-backend-main.onrender.com/static/${countryObject[selectedCountry]?.urlName}/one`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionFee();
  }, [selectedCountry]);

  return (
    <>
      <Title><Yellow>Exchange</Yellow> Rates</Title>
      <Grid>
        <CryptoPriceCard
          exchange="Binance"
          avgPrice={data?.Binance?.Average || null}
          usdtPrice={data?.Binance?.Average || null}
          minPrice={data?.Binance?.Min || null}
          maxPrice={data?.Binance?.Max || null}
          image={BinanceImage}
          selectedCountry={selectedCountry}
        />
        <CryptoPriceCard
          exchange="Bybit"
          avgPrice={data?.Coinbase?.Average || null}
          usdtPrice={data?.Coinbase?.Average || null}
          minPrice={data?.Coinbase?.Min || null}
          maxPrice={data?.Coinbase?.Max || null}
          image={ByBitImage}
          selectedCountry={selectedCountry}
        />
        <CryptoPriceCard
          exchange="Bitget"
          avgPrice={data?.Kraken?.Average || null}
          usdtPrice={data?.Kraken?.Average || null}
          minPrice={data?.Kraken?.Min || null}
          maxPrice={data?.Kraken?.Max || null}
          image={BitgetImage}
          selectedCountry={selectedCountry}
        />
        <CryptoPriceCard
          exchange="Coinbase"
          avgPrice={data?.Wazirx?.Average || null}
          usdtPrice={data?.Wazirx?.Average || null}
          minPrice={data?.Wazirx?.Min || null}
          maxPrice={data?.Wazirx?.Max || null}
          image={WazirxImage}
          selectedCountry={selectedCountry}
        />
      </Grid>
    </>
  );
};

export default CryptoPriceGrid;
