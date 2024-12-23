import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -8rem;
  font-weight : 700;
  gap : 74rem;
`;

const NavigationButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  width : 55px;
  height : 50px;
  padding: 0.5rem 1rem;
  font-weight : 600;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #662d91;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div`
  background: #000; 
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
// const slideIn = keyframes`
//   from {
//     transform: translateX(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;

// const slideOut = keyframes`
//   from {
//     transform: translateX(0);
//     opacity: 1;
//   }
//   to {
//     transform: translateX(-100%);
//     opacity: 0;
//   }
// `;

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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  
//   .testimonial-card {
//     transition: all 0.5s ease-in-out; /* Maintain existing transition */
//   }
//   justify-content: center;
//     transition: all 0.5s ease-in-out; /* Add transition */
//   .testimonial-card {
//    transition: all 0.5s ease-in-out; /* Add transition */
//     animation: 0.5s ease-in-out;
//   }
//   .testimonial-card.out {
    // animation: 0.5s ease-in-out;
//   }
   @media (min-width: 1025px) {
    display: flex;
    flex-wrap: nowrap; /* Prevent wrapping */
    justify-content: space-around;
    margin-top : 16px;
  }
  @media (max-width: 1024px) {
    .testimonial-card {
      flex-basis: 100%;
      margin: 10px;
    }
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
  min-width: 40%;
  flex-shrink: 0;
  margin-top: 2%;
  className: testimonial-card;
    // animation: 0.5s ease-in-out;
  transition: all 0.5s ease-in-out; /* Add transition */
  @media (min-width: 1025px) {
    flex-basis: 45%; /* Adjust width */
    margin: 10px;
    flex-grow: 1; /* Equalize heights */
    flex-direction: row; /* Stack content vertically */
    height : 170px;
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
    height : 300px;
    
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
    const [visibleReviews, setVisibleReviews] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get('http://147.93.20.176:8000/reviews/all');
          if (response.data.length > 0) {
            setReviews(response.data);
            setLoading(false);
          } else {
            console.log('No reviews found');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
          setLoading(false);
        }
      };
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
        setVisibleReviews([reviews[currentIndex]]);
      } else {
        setVisibleReviews(reviews.slice(currentIndex * 2, (currentIndex + 1) * 2));
      }
    }, [reviews, currentIndex, isMobileOrTablet]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(reviews.length / (isMobileOrTablet ? 1 : 2)));
      }, 5000);
  
      return () => clearInterval(interval);
    }, [reviews.length, isMobileOrTablet]);
  
    const handleIndicatorClick = (index) => {
      setCurrentIndex(index);
    };
  
    const handleNextClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(reviews.length / (isMobileOrTablet ? 1 : 2)));
    };
  
    const handlePrevClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(reviews.length / (isMobileOrTablet ? 1 : 2))) % Math.ceil(reviews.length / (isMobileOrTablet ? 1 : 2)));
    };
  
    return (
        <Container>
          <HappyCustomerSection>
            <Title>Happy<Yellow> Customers</Yellow> </Title>
            {/* <NavigationContainer>
              <NavigationButton onClick={handlePrevClick}>Previous</NavigationButton>
            //   <NavigationButton onClick={handleNextClick}>Next</NavigationButton>
            </NavigationContainer> */}
            <SliderContainer>
              <SliderWrapper currentIndex={currentIndex}>
                {loading ? (
                  <p style={{color : "orange", fontWeight : "500"}}>Loading...</p>
                ) : (
                  visibleReviews.length > 0 && visibleReviews.map((testimonial, index) => (
                    testimonial && (
                      <TestimonialCard key={index}>
                        <Avatar>
                          {testimonial.Image && <img src={`http://147.93.20.176:8000/uploads/${testimonial.Image}`} alt={testimonial.Name} />}
                        </Avatar>
                        <TestimonialContent>
                          {testimonial.Name && <h3>{testimonial.Name}</h3>}
                          {testimonial.Title && <p>{testimonial.Title}</p>}
                          {testimonial.Quote && <p>{testimonial.Quote}</p>}
                        </TestimonialContent>
                      </TestimonialCard>
                    )
                  ))
                )}
              </SliderWrapper>
              <IndicatorsContainer>
                {reviews.map((_, index) => (
                  <Indicator
                    key={index}
                    isActive={index === currentIndex * (isMobileOrTablet ? 1 : 2)}
                    onClick={() => handleIndicatorClick(index / (isMobileOrTablet ? 1 : 2))}
                  />
                ))}
              </IndicatorsContainer>
          
            </SliderContainer>
            <NavigationContainer>
              <NavigationButton onClick={handlePrevClick}><ChevronLeft size={30}/></NavigationButton>
              <NavigationButton onClick={handleNextClick}><ChevronRight size={30}/></NavigationButton>
            
            </NavigationContainer>
            <div style={{marginTop : "80px"}}> </div>
          </HappyCustomerSection>
        </Container>
      );
    };
    
    export default Component;