import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar'; // Adjust the path if necessary
import logo from "../../assets/logo.png"

// Styled components for AdminDashboard
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  margin: 0;
  padding: 2rem;
  background: #cecece;
  margin-top: 4rem; /* Space for header on mobile */

  @media (min-width: 768px) {
    margin-top: 0; /* No top margin needed for larger screens */
  }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #333;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 4rem); /* Adjust height to accommodate top margin */
  text-align: center;
`;

const LogoImage = styled.img`
  max-width: 200px;
  margin-bottom: 1rem;
`;

const Greeting = styled.h1`
  color: #333;
  font-size: 1.5rem;
`;

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return 'Good Morning';
  if (hours < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const Id = localStorage.getItem("Login");
        if (Id !== "Admin") {
            navigate('/admin/login');
        }
    }, [navigate]);

    return (
        <DashboardContainer>
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <LogoContainer>
                    <LogoImage src={logo} alt="Site Logo" />
                    <Greeting>{getGreeting()}, Admin!</Greeting>
                </LogoContainer>
            </Content>
        </DashboardContainer>
    );
};

export default AdminDashboard;
