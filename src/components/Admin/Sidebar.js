import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components for Sidebar
const SidebarContainer = styled.nav`
  width: 100%;
  max-width: 250px;
  background-color: #343a40;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});

  @media (min-width: 768px) {
    width: 250px;
    position: static;
    transform: none;
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const HeaderContainer = styled.header`
  background-color: #343a40;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    display: none; // Hide header on larger screens
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;

  &:hover {
    background-color: #495057;
  }
`;

const SubmenuButton = styled(SidebarButton)`
  padding-left: 2rem; // Indent for submenu items
`;

const Submenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-left: 1rem;
`;

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [isCurrencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    }
  };

  const handleLogOut = (path) => {
    localStorage.removeItem("Login");
    navigate(path);
  };

  return (
    <>
      <HeaderContainer>
        <span>Admin Dashboard</span>
        <ToggleButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
          ☰
        </ToggleButton>
      </HeaderContainer>
      <SidebarContainer isOpen={isOpen}>
        <SidebarButton onClick={() => handleNavigation('/admin/dashboard')}>Dashboard</SidebarButton>
        <SidebarButton onClick={() => setCurrencyMenuOpen((prev) => !prev)}>
          Add Currency
        </SidebarButton>
        <Submenu isOpen={isCurrencyMenuOpen}>
          <SubmenuButton onClick={() => handleNavigation('/admin/India/addCurrency')}>India</SubmenuButton>
          <SubmenuButton onClick={() => handleNavigation('/admin/Brazil/addCurrency')}>Brazil</SubmenuButton>
          <SubmenuButton onClick={() => handleNavigation('/admin/United Kingdom/addCurrency')}>United Kingdom</SubmenuButton>
          <SubmenuButton onClick={() => handleNavigation('/admin/European Union/addCurrency')}>European Union</SubmenuButton>
          <SubmenuButton onClick={() => handleNavigation('/admin/United Arab Emirates/addCurrency')}>United Arab Emirates</SubmenuButton>
          <SubmenuButton onClick={() => handleNavigation('/admin/United State of America/addCurrency')}>United State of America</SubmenuButton>
        </Submenu>
        <SidebarButton onClick={() => handleNavigation('/admin/transactionFee')}>Transaction Fee</SidebarButton>
        <SidebarButton onClick={() => handleNavigation('/admin/transactions')}>View Transaction</SidebarButton>
        <SidebarButton onClick={() => handleNavigation('/admin/otherprice')}>Other Price</SidebarButton>
        <SidebarButton onClick={() => handleNavigation('/admin/users')}>Users</SidebarButton>
        <SidebarButton onClick={() => handleNavigation('/admin/review')}>Review</SidebarButton>
        <SidebarButton onClick={() => handleNavigation('/admin/query')}>Queries</SidebarButton>
        <SidebarButton onClick={() => handleLogOut('/admin/login')}>Logout</SidebarButton>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;


{/* <SidebarButton onClick={() => handleNavigation('/admin/dashboard')}>Dashboard</SidebarButton>
<SidebarButton onClick={() => handleNavigation('/admin/addCurrency')}>Add Currency</SidebarButton>
<SidebarButton onClick={() => handleNavigation('/admin/otherprice')}>Other Price</SidebarButton>
<SidebarButton onClick={() => handleNavigation('/admin/users')}>Users</SidebarButton>
<SidebarButton onClick={() => handleNavigation('/admin/review')}>Review</SidebarButton>
<SidebarButton onClick={() => handleNavigation('/admin/query')}>Queries</SidebarButton>
<SidebarButton onClick={() => handleLogOut('/admin/login')}>Logout</SidebarButton> */}
{/* <Submenu isOpen={isTransactionMenuOpen}>
  <SubmenuButton onClick={() => handleNavigation('/admin/transactionFee')}>Transaction Fee</SubmenuButton>
  <SubmenuButton onClick={() => handleNavigation('/admin/transactions')}>View Transactions</SubmenuButton>
  </Submenu> */}
{/* <SidebarButton onClick={() => setTransactionMenuOpen((prev) => !prev)}>
    Transaction Management
  </SidebarButton> */}