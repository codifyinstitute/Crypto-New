import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: transparent;
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const BitcoinSection = styled.section`
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const HappyCustomerSection = styled.section`
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;


  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    width: fit-content;
  }
`;

const Grid1 = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: row;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    gap: 0.5rem;
    overflow-x: auto; /* Allow horizontal scroll on small screens */
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Start scrolling from the first card */
    scroll-snap-type: x mandatory; /* Add smooth scroll snap */
  }
`;

const Card = styled.div`
  background: black;
  border-radius: 10px;
  border: 1px solid white;
  padding: 1rem;
  text-align: center;
  

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const BitcoinIcon = styled.div`
  background-color: #f2a900;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 0.5rem;
  }
`;

const ExchangeName = styled.div`
  background-color: #f2a900;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }
`;

const PriceInfo = styled.div`
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TestimonialCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  color: black;
  background-color: white;
  min-width: 200px; /* Set minimum width to 200px on small screens */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 200px; /* Set fixed width to 200px on small screens */
    scroll-snap-align: start; /* Align each card to the start of the scroll container */
  }
`;

const Avatar = styled.div`
  background-color: #8247e5;
  border-radius: 50%;
  border: 2px black solid;
  margin-top: -10%;
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
  }

  p {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Component = () => {
  const bitcoinCards = [
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
  ];

  const testimonials = [
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: "Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon's DeFi ecosystem to the next level.",
    },
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: "Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon's DeFi ecosystem to the next level.",
    },
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: "Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon's DeFi ecosystem to the next level.",
    },
  ];

  return (
    <Container>
      <BitcoinSection>
        <Grid>
          {bitcoinCards.map((card, index) => (
            <Card key={index}>
              <BitcoinIcon />
              <ExchangeName>{card.exchange}</ExchangeName>
              <div>Avg {card.avg} Rs</div>
              <PriceInfo>1 USDT = ${card.usdt}</PriceInfo>
              <PriceInfo>Min {card.min}$</PriceInfo>
              <PriceInfo>Max {card.max}$</PriceInfo>
            </Card>
          ))}
        </Grid>
      </BitcoinSection>

      <HappyCustomerSection>
        <Title>Happy Customers</Title>
        <Grid1>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <Avatar />
              <TestimonialContent>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.title}</p>
                <p>{testimonial.quote}</p>
              </TestimonialContent>
            </TestimonialCard>
          ))}
        </Grid1>
      </HappyCustomerSection>
    </Container>
  );
};

export default Component;
