import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Home from './components/Home';
import { theme } from './styles/theme';
import HomeConatiner from './components/HomeConatiner';
import Sell1 from './components/Sell1';
import Sell2 from './components/Sell2';
import Sell3 from './components/Sell3';
import Sell4 from './components/Sell4';
import Sell5 from './components/Sell5';
import Sell6 from './components/Sell6';
import Sell7 from './components/Sell7';
import Profile from './components/Profile';
import Bank from './components/Bank';
import Transaction from './components/SellHistory';

import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminTransactionFee from './components/Admin/AdminTransactionFee';
import AdminUsers from './components/Admin/AdminUsers';
import AdminTransaction from './components/Admin/AdminTransaction';
import AdminAddCurrency from './components/Admin/AdminAddCurrency';
import OTPPage from './components/OTP';
import QRCodeCard from './components/QRCode';
import Refer from './components/Refer';
import TandC from './components/TandC';
import OtherPrice from './components/Admin/OtherPrice';
import TermsandCondi from './components/Terms&condi';
import ContactUs from './components/ContactUs';
import AdminQueries from './components/Admin/AdminQueries';

import Starreview from './components/Starreview';
import AdminReview from './components/Admin/AdminReview';
import NotFoundPage from './components/NotFound';
import Deposit from './components/Deposit';
// import Deposit1 from './components/Deposit1';
import Depposit1 from './components/Depposit1';
import DepositHistory from './components/DepositHistory';
import Withdraw from './components/Withdraw';
import SellHistory from './components/SellHistory';
import Wallet from './components/Wallet';
import PaymentMethod from './components/PaymentMethod';
import BankTransfer from './components/BankTransfer';
import CardTransfer from './components/CardTransfer';
import WithdrawHistory from './components/WithdrawHistory';
import AdminDeposit from './components/Admin/AdminDeposit';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomeConatiner />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/Sell1" element={<Sell1 />} />
        <Route path="/Sell2" element={<Sell2 />} />
        <Route path="/Sell3" element={<Sell3 />} />
        <Route path="/Sell4" element={<Sell4 />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/deposit2" element={<Depposit1 />} />
        <Route path='/deposithistory' element={<DepositHistory />}/>
        <Route path='/Withdraw' element= {<Withdraw />} />
        <Route path='/withdrawhistory' element={<WithdrawHistory />}/>
        <Route path="/qr-code" element={<QRCodeCard />} />
        <Route path="/Sell5" element={<Sell5 />} />
        <Route path="/Sell6" element={<Sell6 />} />
        <Route path="/Sell7" element={<Sell7 />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Refer" element={<Refer />} />
        <Route path="/Bank" element={<Bank />} />
        <Route path="/sellhistory" element={<SellHistory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/:country/addCurrency" element={<AdminAddCurrency />} />
        <Route path="/admin/transactions" element={<AdminTransaction />} />
        <Route path="/admin/deposit" element={<AdminDeposit />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/review" element={<AdminReview />} />
        <Route path="/admin/:country/transactionFee" element={<AdminTransactionFee />} />
        <Route path="/TandC" element={<TandC />} />
        <Route path="/terms" element={<TermsandCondi />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin/:country/otherprice" element={<OtherPrice />} />
        <Route path="/admin/query" element={<AdminQueries />} />
        <Route path="/star" element={<Starreview />} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/payment-method" element={<PaymentMethod/>} />
        <Route path="/bank-transfer" element={<BankTransfer/>} />
        <Route path="/card-transfer" element={<CardTransfer/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
