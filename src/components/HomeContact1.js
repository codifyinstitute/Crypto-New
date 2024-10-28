import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Container = styled.div`
  /* background-color: #1a1a1a; */
  color: white;
  padding: 2rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  /* background-color: #1a1a1a; */
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const MainText = styled.h2`
  font-size: 3rem;
  margin: 0;

  max-width: 80%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    max-width: 100%;
  }
`;

const SubText = styled.p`
  font-size: 1.2rem;
  margin: 0;
  max-width: 80%;
  opacity: 0.7;
  color: white;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    max-width: 100%;
  }
`;

const Button = styled.button`
  background-color: #ffa500;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
  margin-top: -2.5rem;

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-top: 1rem;
  }
  @media (max-width: 480px) {
  font-size: 0.8rem;

  } 
`;

const ContactSection = () => {
  return (
    <Container>
      <MainText>
      Get in Touch with Moon Pay – We're Here to Assist You
      </MainText>
      <SubText>
      For help with crypto sales or account-related queries, contact us through our Contact Us page. Our team is ready to assist you with all your needs.
      </SubText>
      <Link to="/contactus"><Button>Contact Us</Button></Link>
    </Container>
  );
};

export default ContactSection;