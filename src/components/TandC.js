import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import { ChevronLeft  } from 'lucide-react';

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: white;
  background-color: black;
   /* Restrict width for better readability */
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; /* Ensure padding is included in the width */
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  color: orange;
  border-bottom: 2px solid orange;
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  margin-top: 22px;
  text-align: center;
  font-size: 2rem; /* Adjust font size for readability */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const SectionHeader = styled.h2`
  color: orange;
  margin-bottom: 10px;
  text-align: left;
  font-size: 1.5rem; /* Adjust font size for readability */


  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  p{
    text-align: start;
  }
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ImportantText = styled.p`
  font-weight: bold;
  color: orange;
  margin: 10px 0;
  text-align: left;
  @media (max-width: 768px) {
text-align: left;
  }
`;

const Link = styled.a`
  color: orange;
`;
const SectionMain = styled.div`
display: flex;
flex-direction: row;
margin-top: 3%;
width: 60%;

gap: 5%;
@media (max-width: 768px) {
flex-wrap: wrap;
width: 90%;
  }
`;
const Section1 = styled.div`
display: flex;
flex-direction: column;
`;
const Sectionn = styled.div`
width: 60%;
text-align: left;
@media (max-width: 768px) {
flex-wrap: wrap;
width: 90%;
text-align: left;
  }
`;


const List = styled.ul`
  display: flex;
    color: white;
    text-align: center;
    padding-left: 20px;
    list-style-type: disc;
    width: fit-content;
    align-items: start;
    flex-direction: column;
    justify-content: center;
    width: 100%;

  @media (max-width: 768px) {
    padding-left: 15px;
    text-align: left;
  }
`;
const BackButton = styled.button`
  background-color: transparent;
  color: #FFA500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  /* z-index: 1001; */
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;
const Titlee = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  
  @media (max-width: 430px) {
    font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  }
`;
const TermsAndConditions = () => {
  return (
    <>
    <Navbar/>
    <PageContainer>
  <Titlee>
    <BackButton onClick={() => window.history.back()}>
    <ChevronLeft />
  </BackButton>
            <Title>Moon Pay - Privacy Policy</Title>
            </Titlee>
      <Sectionn>
        <p>Welcome to the Privacy Policy governing your access to and usage of the services on electronic platforms, collectively known as "Moon Pay" or the "Platform," including the mobile application and/or website.</p>
        
        <p>This Policy outlines our guidelines for collecting, using, processing, storing, disclosing, and protecting your personal data and information, referred to as 'Personal Information.' This Policy represents a legal agreement between you, the user of the Platform, and us, the provider of services and operator of the Platform.</p>
        
        <ImportantText>By registering your user Platform account or accessing the Platform, you provide us with your express consent to use, collect, process, disclose, transfer, and protect Personal Information according to this Policy. If you disagree, please do not proceed to use/access this Platform.</ImportantText>
        
        <p>Your use of the Platform and Services is governed by this Policy and the applicable Terms of Use. Note that crypto products are unregulated and carry risks.</p>
      </Sectionn>
      <SectionMain>
      <Section1>
      <Section>
        <SectionHeader>User Age and Eligibility</SectionHeader>
        <List>
          <li>You must be at least 18 years old to use our services.</li>
          <li>Ensure legal eligibility under your country's laws.</li>
          <li>Do not use our services if debarred due to fraud or improper conduct.</li>
          <li>Corporate entities must have the authority to bind to these terms.</li>
        </List>
      </Section>
      
      <Section>
        <SectionHeader>Use of Services</SectionHeader>
        <List>
          <li>Services are for those who have agreed to these terms.</li>
          <li>Only authorized persons per applicable laws can use the services.</li>
          <li>We may disclose information about your service usage in disputes or legal proceedings.</li>
        </List>
      </Section>
      
      <Section>
        <SectionHeader>Limitation of Responsibility</SectionHeader>
        <p>Moon Pay is not responsible for losses during service usage. Users bear full responsibility and understand crypto trading risks.</p>
      </Section>
      
      <Section>
        <SectionHeader>Corporate Entities</SectionHeader>
        <p>Ensure authority to bind the entity to these terms.</p>
      </Section>
      
    
      </Section1>
      <Section1>
      <Section>
      <Section>
      <SectionHeader>Information Sharing</SectionHeader>
      <p>Moon Pay may provide information about service usage in disputes or legal proceedings.</p>
    </Section>
        <SectionHeader>Authorized Usage</SectionHeader>
        <p>Use the services only if legally permitted.</p>
      </Section>
      
      <Section>
        <SectionHeader>Links to Third-Party Sites</SectionHeader>
        <p>Links may lead to third-party platforms. Review their terms and policies before use.</p>
      </Section>
      
      <Section>
        <SectionHeader>Severability and Exclusion</SectionHeader>
        <p>Invalidity of any part does not affect the rest. This Policy covers information collected through the Platform.</p>
      </Section>
      
      <Section>
        <SectionHeader>Changes to the Policy</SectionHeader>
        <p>Periodic updates may occur. Review the Policy regularly.</p>
      </Section>
      
      <Section>
        <SectionHeader>Reach Out for Assistance</SectionHeader>
        <p>Contact our support team for questions or assistance.</p>
      </Section>
      
      <Section>
       
      </Section>
      </Section1>
      </SectionMain>
      <ImportantText>By using our services, you agree to these terms. Moon Pay is committed to privacy, providing a secure crypto trading experience. For questions, contact us. Trust is crucial, and we're here for a secure financial journey.</ImportantText>
    </PageContainer>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;
