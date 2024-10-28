import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
  color: #333;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  color: #ff6b6b;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-top: 0;
  color: #555;
`;

const HomeLink = styled.a`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #3498db;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// 404 Page Component
const NotFoundPage = () => {
    return (
        <Container>
            <Title>404</Title>
            <Message>Page Not Found</Message>
            <HomeLink href="/">Go Back to Home</HomeLink>
        </Container>
    );
};

export default NotFoundPage;