import React, { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AlertCircle, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ChevronLeft } from "lucide-react";
import HomeContact from "./HomeContact";

const Main = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  background-color: black;
  flex-direction: column;
  padding: 20px;
  padding-top: 140px;
  @media (max-width: 480px) {
  padding-top: 80px;

  }
`;

const Container = styled.div`
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #1f2937;
  padding: 1.5rem;
  border-radius: 12px;
  width: 380px;
  height: 610px;
  font-family: "Inter", Arial, sans-serif;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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
  text-align: left;
`;

const EUFlag = styled.div`
  background-color: #003399;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px auto;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Stars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Star = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ffcc00;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  transform: translate(-50%, -50%);
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#10b981" : "#d1d5db")};
  margin-bottom: 8px;
  transition: background-color 0.3s ease;
`;

const TimelineLabel = styled.span`
  font-size: 12px;
  color: ${(props) => (props.active ? "#111827" : "#6b7280")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  transition: color 0.3s ease;
`;

const InfoBox = styled.div`
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 16px;
  margin: 32px 0;
`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  color: #d97706;
  font-weight: 600;
  margin-bottom: 12px;
`;

const InfoText = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
`;

const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background-color: #f7a600;
  color: black;
  border: none;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e69500;
  }
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

const checkMarkAnimation = keyframes`
  0% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

const SuccessContainer = styled.div`
  width: 100%;
  /* background-color: #dff0d8; */
  border-radius: 10px;
  padding: 20px;

`;
const SuccessCenter = styled.div`
font-size: 20px;
display: flex;
justify-content: center;
`

const CheckMark = styled.svg`
  width: 100px;
  height: 100px;
  stroke: #4caf50;
  stroke-width: 5;
  fill: none;

  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${checkMarkAnimation} 5s ease forwards;

  background-color: #dff0d8;
    border-radius: 50%;
    padding: 10px;
`;

const SuccessMessage = styled.div`
  font-size: 20px;
  color: #4caf50;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
  font-size: 15px;

  } 
`;

const Sell5 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const starCount = 12;

  useEffect(() => {
    console.log(location.state)
    const token = localStorage.getItem('token');
    token ? console.log() : navigate("/sell2");
  }, [])
  // console.log(location.state.data)

  return (
    <>
      <Navbar />
      <Main>
        <Container>
          <Header>
            <TabContainer>
              <BackButton onClick={() => window.history.back()}>
                {" "}
                <ChevronLeft></ChevronLeft>
              </BackButton>
              <Tab active>Almost Done</Tab>
            </TabContainer>
          </Header>

          {/* <EUFlag>
            <Stars>
              {[...Array(starCount)].map((_, i) => (
                <Star
                  key={i}
                  style={{
                    left: `${
                      40 + 30 * Math.cos((2 * Math.PI * i) / starCount)
                    }px`,
                    top: `${
                      40 + 30 * Math.sin((2 * Math.PI * i) / starCount)
                    }px`,
                  }}
                />
              ))}
            </Stars>
          </EUFlag> */}

          <SuccessContainer>
            <SuccessCenter>
              <CheckMark viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </CheckMark>
            </SuccessCenter>
            <SuccessMessage>{}</SuccessMessage>
          </SuccessContainer>

          <Timeline>
            <TimelineItem>
              <TimelineDot active />
              <TimelineLabel active>Verified</TimelineLabel>
              {/* <TimelineLabel active>3:37 PM</TimelineLabel> */}
            </TimelineItem>
            <TimelineItem>
              <TimelineDot active />
              <TimelineLabel active>Pending</TimelineLabel>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot />
              <TimelineLabel>Processing</TimelineLabel>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot />
              <TimelineLabel>Deposited</TimelineLabel>
            </TimelineItem>
          </Timeline>

          <InfoBox>
            <InfoTitle>
              {/* <AlertCircle size={20} style={{ marginRight: "10px" }} /> */}
              Transaction Details
            </InfoTitle>
            <InfoText>
              <span style={{fontWeight:"bold"}}>Order Id :</span> <span>{location.state?.data?.transaction?.OrderId}</span>
            </InfoText>
            <InfoText>
              <span style={{fontWeight:"bold"}}>USDT :</span> <span>{location.state?.data?.transaction?.Amount} USDT</span>
            </InfoText>
            {/* <InfoText>
              <span style={{fontWeight:"bold"}}>Your Recieve :</span> <span>₹{location.state?.data?.ReceivedAmount}</span>
            </InfoText> */}
            <InfoText>
              <span style={{fontWeight:"bold"}}>Satus :</span> <span>{location.state?.data?.transaction?.Status}</span>
            </InfoText>
          </InfoBox>

          <Button onClick={()=>navigate('/')}>
            Home
            <ChevronRight size={24} />
          </Button>
        </Container>
      </Main>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Sell5;
