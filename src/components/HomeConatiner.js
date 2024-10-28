import React from 'react';
import styled from 'styled-components';
import Home from './Home';
import Home1 from './Home1';
import Homemap from './Homemap';
import Homelogo from './Homelogo';
import Homelogo2 from './Homelogo2';
import HomeContact1 from './HomeContact1';
import Footer from './Footer';
import GlobeComponent from './GlobeComponent';
import Navbar from './Navbar';
import Mobile from './Mobile';
import Wazir from './Wazir';
import Customer from './Customer';
import Numbers from './Numbers';
import WorldMap from './WorldMap'; // Import your CustomWorldMap component
import WithCoreFooter from './WithCoreFooter';

const GlobeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #000;
  overflow: hidden;
`;

const GlobeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 10rem; */

  @media (max-width: 768px) {
    padding: 3%;
    height: fit-content;
    /* margin-bottom: 60rem; */
  }
`;



const HomeContainer = () => {
  return (
    <GlobeContainer>
      <Navbar />
      <GlobeWrapper>
        {/* Uncomment this if you want to display the Globe component */}
        {/* <GlobeComponent /> */}
      </GlobeWrapper>
      <ContentWrapper>
        <Home />
        <Wazir />
        <Customer />
        
        <Mobile />
        <Homemap />
       {/* Include your CustomWorldMap component here */}
        <Numbers />
        <Homelogo />
        <Homelogo2 />
  <HomeContact1 />
        <WithCoreFooter></WithCoreFooter>
      
      </ContentWrapper>
    
 
    </GlobeContainer>
  );
};

export default HomeContainer;
