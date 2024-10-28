import React, { useState, useEffect } from "react";
import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';
import image1 from '../assets/ReferEarn.png';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  padding-top: 100px;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #ffa500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Para = styled.p`
  width: 100%;
  text-align: center;
  color: white;
  @media (max-width: 480px) {
  text-align: left;

  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const Come = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  color: orange;
  text-align: center;
  margin-top: 2%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Image = styled.div`
background-image: url(${image1});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 290px;
width: 60%;
margin-top: 50px;
@media (max-width:480px){
  width: 100%;
}
`

const Refer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? console.log() : navigate("/sell2");
  }, [])
    return (
        <>
        <Navbar />
          

        <Container>
        <Title>
          <BackButton onClick={() => window.history.back()}>
            <ChevronLeft />
          </BackButton>
          <Para>Refer & Earn</Para>
        </Title>
            <Image></Image>
            <Come>Coming Soon !!!</Come>
        </Container>
        {/* <HomeContact /> */}
        {/* <Footer /> */}
        </>
    )
}

export default Refer