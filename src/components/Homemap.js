import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Marquee from 'react-fast-marquee';
import WorldMap from './WorldMap';
import Numbers from './Numbers';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Starreview from './../components/Starreview';




const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #000;
    color: #fff;
  }
`;

const Container = styled.div`
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 480px) {
 padding: 0px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;

  span {
    color: #ffa500;
   
  }

  @media (max-width: 768px) {
    /* font-size: 2em; */
  }

  @media (max-width: 480px) {
    font-size: 1.87rem;
    text-align: left;
    margin-top: 4%;
  }
`;

const Description = styled.p`
  margin-bottom: 20px;
  font-size: 1.2em;
  width: 85%;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 30px;
    width: 100%;
    text-align: left;
  }
`;

const TalkButton = styled.button`
  background-color: #ffa500;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 20px;


  @media (max-width: 480px) {
    padding: 8px 16px;
  font-size: 15px;

  }
`;

const MapContainer = styled.div`
  /* width: 1200px; */
  height: auto;
  margin: 20px auto;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    margin: 10px auto;
  }
`;

const TooltipContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 2rem;
    justify-content: center;
  }
`;

const StatBox = styled.div`
  background-color: #222;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  flex: 1 0 calc(25% - 20px);
  margin: 10px;

  @media (max-width: 768px) {
    flex: 1 0 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    flex: 1 0 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
`;

const PaymentMethods = styled.div`
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const PaymentLogo = styled.img`
  height: 30px;
  margin: 0 10px;

  @media (max-width: 480px) {
    height: 25px;
    margin: 0 8px;
  }
`;

const App = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <GlobalStyle />
      <Container>

     
        <Title>  Using the  <span>latest technologies</span> to keep our platform safe.</Title>
        <Description>
        MoonPay’s built with your security in mind. That’s why we use AES-256 encryption across the board, and we’re PCI-DSS and ISO 27001 compliant.
        </Description>
        {/*<Link to="/contactus"><TalkButton>Talk to us</TalkButton></Link> */}
        <Starreview/>
        <MapContainer onMouseMove={handleMouseMove}>
          <WorldMap setTooltipContent={setTooltipContent} />
          {tooltipContent && (
            <TooltipContainer x={tooltipPosition.x} y={tooltipPosition.y}>
              {tooltipContent}
            </TooltipContainer>
          )}
        </MapContainer>

     
      </Container>
    </>
  );
};

export default App;