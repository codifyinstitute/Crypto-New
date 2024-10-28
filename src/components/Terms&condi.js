import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { ChevronLeft  } from 'lucide-react';

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: white;
  background-color: black;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
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

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #f0a500;
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  @media (max-width: 480px) {
  font-size: 0.9rem;
  }
`;

const Paragraph = styled.p`
  color: #ddd;
  margin-bottom: 10px;
  text-align: justify;
  @media (max-width: 480px) {
  font-size: 0.7rem;
  }
`;

const TermsandCondi = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
      <Titlee>
      <BackButton onClick={() => window.history.back()}>
      <ChevronLeft />
    </BackButton>
        <Title>Moon Pay - Terms and Conditions</Title>
        </Titlee>
        <Section>
          <SectionTitle>1. Introduction</SectionTitle>
          <Paragraph>
            These terms and conditions pertain to Moon Pay. For additional details about us and how to get in touch, please refer to the relevant sections.
            We are committed to safeguarding your privacy. This document applies when we act as a data controller for the personal data of our users, outlining the collection, use, and sharing of personal data from consumer users across various platforms, including our website, Moon Pay applications, and services provided to users. Information obtained from partners and third parties is also covered.
          </Paragraph>
          <Paragraph>
            By utilizing our services, you agree to the collection, transfer, storage, disclosure, and use of your personal data as outlined in this Policy. This Policy excludes anonymized data, which cannot identify you. Please read this Policy carefully to understand our principles and procedures regarding your personal data. By accessing or using our services, you consent to this Policy. Our services include privacy controls that influence how we process your personal data. Refer to Section 5 for a list of rights regarding your personal data and instructions on how to exercise them. This Policy may undergo revisions, and your continued use of our services following any changes signifies your acceptance of these modifications. Please check this Policy periodically for updates.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Personal Data Collection and Sources</SectionTitle>
          <Paragraph>
            We categorize the personal data we gather into three primary groups:
          </Paragraph>
          <Paragraph>
            <strong>2.1 Information Provided by You</strong>
          </Paragraph>
          <Paragraph>
            (a) Account Data: Your account data, encompassing personal identification details like your name, date of birth, age, nationality, gender, and contact information, is collected. Formal identification information, such as Tax ID numbers and passport details, may also be gathered (collectively known as Account Data). We process Account Data to offer services, fulfill legal requirements, ensure security, and communicate with you.
          </Paragraph>
          <Paragraph>
            (b) Payment Information: Financial details, such as bank account and credit card information, are processed for payment facilitation (Payment Information). This processing aligns with our legitimate interests and the execution of agreements between you and us.
          </Paragraph>
          <Paragraph>
            (c) Correspondence Data: Information within or related to any communication you send to us (Correspondence Data) is processed for communication and record-keeping purposes.
          </Paragraph>
          <Paragraph>
            (d) Profile Data: Information in your personal profile, including location and time zone (Profile Data), is processed to enhance your user experience, based on your consent.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>3. Personal Data Disclosure</SectionTitle>
          <Paragraph>
            Your personal information may be shared with our affiliated companies, including subsidiaries and parent companies, as reasonably necessary to achieve the objectives outlined in this policy. Service Data may be shared with third-party service providers to enhance the functionality of our services. Aggregated data and anonymized information may be shared for purposes such as regulatory compliance, market analysis, demographic profiling, marketing, advertising, and other business-related activities.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. Global Transfer of Your Personal Data</SectionTitle>
          <Paragraph>
            Within this section, we detail the circumstances under which your personal data may be moved to countries outside your own. Our offices, along with those of our group companies, are located in India and Malaysia. Transfers to these countries or to service providers in the Asia Pacific region will be secured through appropriate measures, including standard data protection clauses.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. Your Personal Data Rights</SectionTitle>
          <Paragraph>
            This section provides a summary of your rights under data protection law, depending on your residency status. For a comprehensive understanding of these rights, refer to relevant laws and guidance from regulatory authorities.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. Personal Data Retention and Deletion</SectionTitle>
          <Paragraph>
            We delineate our policies and procedures for retaining and deleting personal data, ensuring compliance with legal obligations. Personal data processed for specific purposes will not be retained longer than necessary for those particular purposes.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Minors</SectionTitle>
          <Paragraph>
            Our services are not designed for children, and users must meet specific age requirements to provide consent for the processing of their personal data. Individuals under the age of 18 should refrain from using our services.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. Utilization of Cookies and Similar Technologies</SectionTitle>
          <Paragraph>
            We use cookies and similar technologies to enhance user experience, identify users, and secure our services. Most browsers permit the management of cookie preferences, but rejecting cookies may impact service functionality.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Data Protection</SectionTitle>
          <Paragraph>
            We implement measures to safeguard personal data against loss, unauthorized access, use, alteration, and disclosure. However, while we strive to protect personal data, the transmission of information over public networks is not entirely secure.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Amendments to Our Terms and Conditions</SectionTitle>
          <Paragraph>
            Alterations to terms and conditions are communicated through this page. Notable changes in our handling of personal data will be brought to your attention.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. Contact Details</SectionTitle>
          <Paragraph>
            Moon Pay is the data controller accountable for your personal data. Reach out to us through the contact-us page.
          </Paragraph>
        </Section>
      </PageContainer>
      <Footer />
    </>
  );
};

export default TermsandCondi;
