import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/GlobalStyles';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from './components/ScroolToTop';
import { Provider } from 'react-redux'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop /> {/* Add the ScrollToTop component */}
    <ToastContainer
      position="top-center"
      autoClose={500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
