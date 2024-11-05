import React from 'react';
import styled from 'styled-components';
import { User, Coins, ArrowLeftRight } from 'lucide-react';

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  width: 100%;
  /* background-color: white; */
  padding: 1rem;
  margin-bottom: 4%;
  border-radius: 15px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const StepCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white
  ;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    /* flex-wrap: wrap; */
    justify-content: flex-start;
    gap: 0.5rem;
  }
`;

const StepNumber = styled.div`
  background-color: #FFA500;
  color: black;
  font-size: clamp(20px, 5vw, 25px);
  width: clamp(45px, 10vw, 52px);
  height: clamp(45px, 10vw, 52px);
  border-radius: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex-grow: 1;
  margin: 0 1rem;

  @media (max-width: 480px) {
    width: calc(100% - 60px);
    margin: 0;
  }
`;

const StepTitle = styled.h3`
  margin: 0;
  font-size: clamp(1rem, 3vw, 1.1rem);
  color: #333;
`;

const StepDescription = styled.p`
  margin: 0.25rem 0 0;
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  color: #666;
`;

const IconWrapper = styled.div`
  color: #4CAF50;
  flex-shrink: 0;
`;

const ReverseStepCard = styled(StepCard)`
  flex-direction: row-reverse;

  @media (max-width: 480px) {
    flex-direction: row-reverse;
    /* flex-wrap: wrap; */
  }
`;

const MoonPaySteps = () => {
  return (
    <StepsContainer>
      <StepCard>
        <StepNumber>1</StepNumber>
        <StepContent>
          <StepTitle>Register</StepTitle>
          <StepDescription>Register using your email and phone number</StepDescription>
        </StepContent>
        <IconWrapper>
          <User size={24} />
        </IconWrapper>
      </StepCard>
      
      <ReverseStepCard>
        <StepNumber>2</StepNumber>
        <StepContent>
          <StepTitle>Deposit USDT</StepTitle>
          <StepDescription>Deposit USDT to your unique Moon Pay's Wallet </StepDescription>
        </StepContent>
        <IconWrapper>
          <Coins size={24} />
        </IconWrapper>
      </ReverseStepCard>
      
      <StepCard>
        <StepNumber>3</StepNumber>
        <StepContent>
          <StepTitle>Start Exchanging</StepTitle>
          <StepDescription>Exchange your USDT at the best market rates</StepDescription>
        </StepContent>
        <IconWrapper>
          <ArrowLeftRight size={24} />
        </IconWrapper>
      </StepCard>
    </StepsContainer>
  );
};

export default MoonPaySteps;