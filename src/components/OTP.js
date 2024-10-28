import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeContact from './HomeContact';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronLeft } from 'lucide-react';
import logoM from "./../assets/logo2.png";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  gap: 10rem;
  background-color: black;
  color: white;
  padding: 20px;
`;
const Moonn = styled.img`
 
 width: 25%;


`;
const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  height: 610px;
  color: black;
  margin-top: 4%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #ffa500;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  color: #ffa500;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
`;

const OTPContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:69%;
`;

const OTPInput = styled.input`
  width: 40px;
  height: 40px;
  font-size: 18px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const Button = styled.button`
  background-color: #ffa500;
  color: black;
  border: none;
  font-weight: 700;
  font-size: 20px;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const PoweredBy = styled.div`
      font-size: 0.8rem;
    color: black;
    text-align: center;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  @media (max-width: 430px) {
    margin-top: 0px;
    ;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffa500;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 25px;
  font-weight: 700;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #FFA500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  z-index: 1001;
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const TimerContainer = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  /* color: #ffa500; */
  text-align: center;
`;

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(10 * 60); // 10 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!(location.state && location.state.email)) {
      navigate('/sell2');
    }
  }, [location, navigate]);

  useEffect(() => {
    if (timer <= 0) return;

    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    if (timer <= 0) {
      toast.error("Your OTP has expired. Please request a new one.");
      // Redirect or handle expired OTP scenario
      navigate('/sell2'); // Example: Navigate to a different page
    }
  }, [timer, navigate]);

  const handleChange = (element, index) => {
    if (/^\d*$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move to next input box if value is entered
      if (element.nextSibling && element.value !== '') {
        element.nextSibling.focus();
      }
    }
  };

  const isFormValid = otp.every(num => num !== '');

  const handleVerify = async () => {
    if (isFormValid) {
      setLoading(true);
      try {
        const response = await axios.post('https://api.moonpayx.com/users/login/verify', {
          Email: location.state.email,
          OTP: otp.join('') // Concatenate OTP array into a single string
        });
        localStorage.setItem("token", response.data.token)
        if (response.status === 200) {
          navigate('/sell1'); // Replace with your next page route
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Invalid or expired OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>
          <TabContainer>
            <BackButton onClick={() => window.history.back()}>
              <ChevronLeft />
            </BackButton>
            <Tab active>Verification Code</Tab>
          </TabContainer>
          <Logo>LOGO</Logo>
       
          <FormContainer>
            <div>
              <Subtitle>Enter the OTP sent to your email</Subtitle>
              <p> Please enter the verification code sent to <b>{location?.state?.email}</b></p><br/>
              <OTPContainer>
                {otp.map((data, index) => (
                  <OTPInput
                    key={index}
                    type="number"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                  />
                ))}
              </OTPContainer>
              <TimerContainer>
              New verification code sent in : {formatTime(timer)}
            </TimerContainer>
            
             
            </div>
            <Button type="button" disabled={!isFormValid || loading} onClick={handleVerify}>
              {loading ? <LoadingSpinner /> : 'Verify OTP'}
            </Button>
          </FormContainer>
          <PoweredBy>
          Powered by <Moonn src={logoM}/>
        </PoweredBy>
        </Card>
      </PageContainer>
      <HomeContact />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default OTPPage;