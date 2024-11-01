

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserRound, CircleUser, CirclePlus } from 'lucide-react';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 6%;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #FFA500;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VerifiedBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color:#76b83f;
  border-radius: 50%;
  border: 1px black solid;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const Username = styled.h2`
  color: white;
  margin: 5px 0;
  @media (max-width: 320px) {
    font-size: 18px;
  }
`;

const Subtitle = styled.span`
  color: #888;
  font-size: 14px;
`;

const WalletBalanceButton = styled.button`
  // background-color: #FFA500;
  // color: black;
  // border: none;
  // border-radius: 10px;
  // padding: 10px 20px;
  // font-size: 16px;
  // font-weight: bold;
  // margin-top: 20px;
  // cursor: pointer;
  // transition: background-color 0.3s;

  // &:hover {
  //   background-color: #e69500;
   background-color: #7db386;
  margin-top: 20px;

  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 14px; /* Slightly smaller font for better scaling */
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px; /* Reduce gap slightly */
  min-width: 120px; /* Prevent the button from getting too narrow */
  transition: background-color 0.3s;

  &:hover {
    background-color: #4CAF50; /* Optional: Add hover effect */
  }

  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font-size for smaller screens */
    gap: 4px; /* Adjust gap for mobile view */
  }
`;


const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const MenuItem = styled.li`
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  color: black;
  border: 1px solid #FFA500;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: 15px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  justify-content: space-between;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 15px;
  font-size: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIcon = styled.span`
  font-size: 20px;
`;

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? console.log() : navigate("/sell2");
  }, []);

  const fetchUserData = async () => {
    const email = localStorage.getItem('token');
    if (email) {
      try {
        const response = await fetch(`https://crypto-backend-main.onrender.com/users/get/${email}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserEmail(data.Email);
        setProfileImage(`https://crypto-backend-main.onrender.com/uploads/${data.Profile}`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('No email found in local storage');
      setLoading(false);
    }
  };

  const fetchWalletBalance = async () => {
    const email = localStorage.getItem('token');
    if (email) {
      try {
        const response = await fetch(`https://crypto-backend-main.onrender.com/wallets/getBalance/${email}`);
        if (!response.ok) throw new Error('Failed to fetch wallet balance');
        const data = await response.json();
        setWalletBalance(data.balance);
        toast.success('Wallet balance fetched successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <Container><p>Loading...</p></Container>;

  const getInitial = email => email.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem('token')
    navigate("/")
  }

  return (
    <>
      <Navbar />
      <Container>
        <ProfileSection>
          <AvatarContainer onClick={() => fileInputRef.current.click()}>
            <Avatar>
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile" />
              ) : (
                getInitial(userEmail)
              )}
            </Avatar>
            <VerifiedBadge>✓</VerifiedBadge>
          </AvatarContainer>
          <input
            type="file"
            ref={fileInputRef}
            onChange={() => { }}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Username>{userEmail}</Username>
          <Subtitle>Email</Subtitle>
          <WalletBalanceButton onClick={fetchWalletBalance}>
            <CircleUser size={20} />
            {walletBalance !== null ? `Balance: ${walletBalance}` : 'Show Wallet Balance'}
          </WalletBalanceButton>
        </ProfileSection>
        <MenuList>
          <MenuItem>
            <MenuLink href="/Bank">
              <IconText>
                <Icon>🏦</Icon>
                Bank Accounts
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/depositHistory">
              <IconText>
                <Icon>📥</Icon>

                Your Deposit History
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/sellhistory">
              <IconText>
                <Icon>📊</Icon>
                Sell History
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/WithdrawHistory">
              <IconText>
                <Icon>💸</Icon>
                Withdraw History
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/Refer">
              <IconText>
                <Icon>🎁</Icon>
                Refer And Earn
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/contactus">
              <IconText>
                <Icon>📞</Icon>
                Contact Us
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
          <MenuItem onClick={logout}>
            <MenuLink>
              <IconText>
                <Icon>🚪</Icon>
                Logout
              </IconText>
              <ArrowIcon>▶</ArrowIcon>
            </MenuLink>
          </MenuItem>
        </MenuList>
      </Container>
    </>
  );
};

export default Profile;
