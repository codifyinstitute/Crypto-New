import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background: #000; /* Black background */
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
  width: 80%;
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const HappyCustomerSection = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 80%;
  @media (max-width: 321px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 270px;
    margin-top: 7%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};

  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
    gap: 1rem;
    margin-top: 20px;
    transform: none; /* Disable sliding on desktop */
  }
`;
const Yellow = styled.span`
color: orange;
`;
const TestimonialCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  color: black;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 1rem;
  min-width: 100%;
  flex-shrink: 0;
  margin-top: 2%;

  @media (min-width: 1025px) {
    min-width: auto; /* Reset width on desktop */
    flex-shrink: 1;

    width: 100%; /* Ensure the card takes full width in its grid cell */
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 5%;
  }
  
  @media (max-width: 480px) {
    text-align: left;
    gap: 0;
    margin-top: 19%;
  }
`;


const Avatar = styled.div`
  background-color: #8247e5;
  border-radius: 50%;
  border: 2px black solid;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  position: relative;
  top: -58%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  @media (max-width: 1024px) {
    margin-bottom: 1rem;
    position: relative;
    top: -15%;
  }
  @media (max-width: 321px) {
    top: -12%;
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    top: -22%;
    margin-bottom: 0px;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
  color: white;

  @media (max-width: 480px) {
    font-size: 1.87rem;
    text-align: center;
    width: auto;
  }
`;

const IndicatorsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${({ isActive }) => (isActive ? '#8247e5' : '#ccc')};
  border-radius: 50%;
  cursor: pointer;
`;

const Component = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [reviews, setReviews] = useState([]);


  const fetchReviews = async () => {
    try {
        const response = await axios.get('https://crypto-backend-main.onrender.com/reviews/all');
        setReviews(response.data);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

useEffect(() => {
    fetchReviews();
}, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileOrTablet) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMobileOrTablet, reviews.length]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Container>
      <HappyCustomerSection>
        <Title>Happy<Yellow> Customers</Yellow> </Title>
        <SliderContainer>
          <SliderWrapper currentIndex={currentIndex}>
            {reviews.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <Avatar>
                  { <img src={`https://crypto-backend-main.onrender.com/uploads/${testimonial.Image}`} alt={testimonial.Name} />}
                </Avatar>
                <TestimonialContent>
                  <h3>{testimonial.Name}</h3>
                  <p>{testimonial.Title}</p>
                  <p>{testimonial.Quote}</p>
                </TestimonialContent>
              </TestimonialCard>
            ))}
          </SliderWrapper>
          <IndicatorsContainer>
            {reviews.map((_, index) => (
              <Indicator
                key={index}
                isActive={index === currentIndex}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </IndicatorsContainer>
        </SliderContainer>
      </HappyCustomerSection>
    </Container>
  );
};
export default Component;
