import React from "react";
import styled from "styled-components";
import { DollarSign, Euro, Bitcoin } from "lucide-react";
import Marquee from "react-fast-marquee";
import image from "../assets/Item.png";
import image1 from "../assets/Item-1.png";
import image2 from "../assets/Item-2.png";
import image3 from "../assets/Item-3.png";
import image4 from "../assets/Item-4.png";
import image5 from "../assets/Item-5.png";
import image6 from "../assets/Item-6.png";
import image7 from "../assets/Item-7.png";
import image8 from "../assets/Item-8.png";
import image9 from "../assets/Item-9.png";
import image10 from "../assets/Item-10.png";
import image11 from "../assets/Item-11.png";
import image12 from "../assets/Item-12.png";
import currancy1 from "../assets/imagecurrancy1.png";
import currancy2 from "../assets/imagecurrancy2.png";
import currancy3 from "../assets/imagecurrancy3.png";
import currancy4 from "../assets/imagecurrancy4.png";

const DashboardContainer = styled.div`
  background: linear-gradient(to right, #1a202c, #2d3748, #4a5568);
  color: white;
  padding: 1rem;
  width: 80%;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Default for desktop */
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets and mobile */
  }
`;

const StatItemWrapper = styled.div`
  padding: 1rem;
  text-align: center;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 25%;
    right: 0;
    width: 1px;
    height: 50%;
    background-color: #4a5568;
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
`;

const StatContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


`;

const TextContent = styled.div`
  margin-right: 1rem;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: white;
  @media (max-width: 768px) {
    height: 34px;
  }
  @media (max-width: 480px) {
    /* height: 15px; */
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
  margin-top: 10px;
  @media (max-width: 480px) {
    margin-top: 20px;
  }
  @media (max-width: 375px) {
    width: fit-content;
  }

`;

const PaymentMethods = styled.div`
  margin-top: 20px;
  width: 100%;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const PaymentLogo = styled.img`
  height: 80px;
  margin: 0 1px;

  @media (max-width: 480px) {
    height: 80px;
    margin: 0 8px;
  }
`;

const StyledIcon = styled.div`
  margin-bottom: 0.25rem;
  color: white;
`;
const Pic = styled.img`
width: 100%;
@media (max-width: 320px) {
  width: 90%;
 
  }
`;

const StatItem = ({ title, value, image }) => (
  <StatItemWrapper>
    <StatContent>
      <TextContent>
        <StatValue>{value}</StatValue>
        <StatTitle>{title}</StatTitle>
      </TextContent>
      <IconWrapper>
        {image && <Pic src={image} alt={title} className="stat-image" />}
      </IconWrapper>
    </StatContent>
  </StatItemWrapper>
);

const StatsDashboard = () => {
  return (
    <Main>
      <DashboardContainer>
        <StatsWrapper>
          <StatItem
            title="Supported countries"
            value="170+"
            image={currancy1}
          />
          <StatItem
            title="Fiat currencies"
            value="50+"
            image={currancy2}
          />
          <StatItem
            title="Fiat payment channels"
            value="300+"
            image={currancy3}
          />
          <StatItem
            title="Cryptocurrencies supported"
            value="ALL"
            image={currancy4}
          />
        </StatsWrapper>
      </DashboardContainer>

      <PaymentMethods>
        <Marquee gradient={false} speed={50}>
          <PaymentLogo src={image} alt="Visa" />
          <PaymentLogo src={image1} alt="image1" />
          <PaymentLogo src={image2} alt="image2" />
          <PaymentLogo src={image3} alt="image3" />
          <PaymentLogo src={image4} alt="image4" />
          <PaymentLogo src={image5} alt="image5" />
          <PaymentLogo src={image6} alt="image6" />
          <PaymentLogo src={image7} alt="image7" />
          <PaymentLogo src={image8} alt="image8" />
          <PaymentLogo src={image9} alt="image9" />
          <PaymentLogo src={image10} alt="image10" />
          <PaymentLogo src={image11} alt="image11" />
          <PaymentLogo src={image12} alt="image12" />
        </Marquee>
      </PaymentMethods>
    </Main>
  );
};

export default StatsDashboard;
