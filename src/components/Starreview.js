import React from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #1f2937; */
  padding: 1rem;
  border-radius: 0.5rem;
  @media (max-width: 430px) {
    align-items: flex-start;
  width: 100%;
  padding: 1rem 1rem 1rem 0rem;
  }

  
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const StyledStar = styled(Star)`
  color: ${props => props.filled ? '#FBBF24' : 'white'};
`;

const ScoreText = styled.p`
  color: white;
`;

const CustomRating = ({ score = 4.3, reviews = 1280, maxStars = 5 }) => {
  const safeScore = typeof score === 'number' ? score : 4.3;
  const filledStars = Math.round(safeScore);
  const safeReviews = typeof reviews === 'number' ? reviews : 1280;

  return (
    <Container>
      <Title>Trustpilot</Title>
      <StarsContainer>
        {[...Array(maxStars)].map((_, index) => (
          <StyledStar
            key={index}
            size={24}
            filled={index < filledStars}
            fill={index < filledStars ? 'currentColor' : 'none'}
          />
        ))}
      </StarsContainer>
      <ScoreText>
        TrustScore: {safeScore.toFixed(1)} | {safeReviews.toLocaleString()} reviews
      </ScoreText>
    </Container>
  );
};

export default CustomRating;