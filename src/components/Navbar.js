import styled from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { changeCountry } from '../features/country/countrySlice';
import logo1 from "../assets/logoM1.png";
import { UserRound, CircleUser, CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiWallet } from "react-icons/gi";
import { RiHome5Fill } from "react-icons/ri";
import { RiExchangeFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";




// Import country flags
import USA from "../assets/USD AMERICA.jpg";
import Dubai from "../assets/AED DUBAI.jpg";
import India from "../assets/INR INDIA.jpg";
import Brazil from "../assets/BRL BRAZIL.jpg";
import UK from "../assets/GBP UK.jpg";
import Euro from "../assets/EURO  EUROPEAN UNION.jpg";
import Tether from "../assets/tether2.png";

// Main Navbar container
const NavbarContainer = styled.nav`
  width: 100%;
  background-color: black;
  padding: 25px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  position: relative;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 25px 10px 0px 20px;
    background-color: #000;
  }
`;

// Fixed bottom navbar for mobile
const NavbarWrapper = styled.div`
  background-color: black;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;

  @media (min-width: 769px) {
    display: none; /* Hide mobile navbar on desktop */
  }
`;

// Top logo for mobile
const TopLogo = styled.div`
  height: 20px;
  width: 115px;
  margin-left: 16px;
  img {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 769px) {
    display: none; /* Hide mobile logo on desktop */
  }
`;

// Main logo for desktop
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;

  img {
    width: 145px;
    height: 28px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    display: none; /* Hide desktop logo on mobile */
  }
`;

// Desktop navigation links
const NavLinksDesktop = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto; /* Push the links to the right */

  li {
    margin: 0 20px;

    a {
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      transition: background-color 0.3s ease;
      border-radius: 12px;
      font-size: 1.2rem;

      &:hover {
        background-color: white;
        color: #ffa500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      &.active {
        color: #ffa500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media (max-width: 768px) {
    display: none; /* Hide desktop links on mobile */
  }
`;

// Mobile navigation links
const NavLinksMobile = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-around;
  height: 100%;

  li {
    margin: 0;
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: white;
      text-decoration: none;
      padding: 10px 15px;
      font-size: 12px;
      display: inline-block;
      width: 100%;

      &:hover {
        color: #ffa500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      &.active {
        color: #ffa500;
        width: fit-content;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media (min-width: 769px) {
    display: none; /* Hide mobile links on desktop */
  }
`;

// Deposit button styling (working fine issue with balance button)
// const DepositButton = styled.button`
//   background-color: #7db386;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 10px;
//   border: none;
//   font-size: 12px;
//   font-weight : 700;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #4CAF50; /* Optional: Add hover effect */
//   }
// `;

const DepositButton = styled.button`
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background: transparent;
  img {
    width: 27px;
    height: 27px;
  }
`;

const DepositButton2 = styled.button`
  border: none;
  color: black;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background: white;
  img {
    width: 24px;
    height: 22px;
    margin-right: 2px;
  }
`;
// Dropdown menu styling
const DropdownMenu = styled.div`
  position: absolute;
  top: 61px;
  right: 20px;
  background: white; /* White background */
  color: black; /* Black text */
  border: 1px solid #ccc;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 10;
  padding: 10px 0;
  width: 100%;
    max-width: 235px;
  transform: translateY(10px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  `}
img{
  width: 25px;
}
  div {
    padding: 9px 10px;
    color: black;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    text-align: right;
    align-items: center;
    justify-content: space-between;
    /* gap:2rem; */
    transition: background-color 0.2s ease, color 0.2s ease;
    @media (max-width: 769px) {
      font-size: 12px;

    }

    &:hover {
      background-color: #f5f5f5;
      color: #ffa500;
    }
  }

  @media (max-width: 768px) {
    top: 60px;
    right: 11px;
  }
  @media (max-width: 350px) {
    top: 69px;
  }
`;

const countryFlags = {
  India: India,
  Brazil: Brazil,
  UK: UK,
  Euro: Euro,
  Dubai: Dubai,
  USA: USA,
};


// Navbar component
const Navbar = () => {
  const selectedCountryStore = useSelector((state) => state.country.value);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState({
    name: selectedCountryStore,
    flag: countryFlags[selectedCountryStore] || '', // Set initial flag based on store value
  });
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const data = localStorage.getItem("Country");
    dispatch(changeCountry(data));
    setSelectedCountry({
        name: selectedCountryStore,
        flag: countryFlags[selectedCountryStore] || '', // Update flag when selected country changes
    });
}, [selectedCountryStore]);


  const handleDepositClick = () => {
    navigate("/deposit");
  };
  const handleWalletClick = () => {
    navigate("/wallet")
  }

  const handleExchangeClick = (e) => {
    e.preventDefault();
    navigate("/Sell1");
  };

  const isExchangeActive = ["/sell1", "/sell3", "/sell4", "/sell5"].includes(
    location.pathname.toLowerCase()
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handelCountryChange = (country) =>{
    dispatch(changeCountry(country));
    localStorage.setItem("Country", country);
  }
  return (
    <>
      <NavbarContainer>
        <TopLogo>
          <img src={logo1} alt="Logo" />
        </TopLogo>
        <Logo>
          <img src={logo1} alt="Logo" />
        </Logo>
        {/* Desktop links */}
        <NavLinksDesktop>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isExchangeActive ? location.pathname : "/sell3"}
              className={isExchangeActive ? "active" : ""}
              onClick={handleExchangeClick}
            >
              Exchange
            </NavLink>
          </li>
          {/* <li>
            <NavLink exact to="/Withdraw" activeClassName="active">Withdraw</NavLink>
          </li> */}
          <li>
            {token ? (
              <NavLink to="/Profile" activeClassName="active">
                Profile
              </NavLink>
            ) : (
              <NavLink to="/sell2" activeClassName="active">
                Sign In
              </NavLink>
            )}
          </li>
        </NavLinksDesktop>

        {/* Deposit Button with user avatar and balance */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <NavLink
            to="/profile"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              flexDirection: "row",
            }}
          >
          </NavLink>
          <DepositButton2 onClick={handleWalletClick}>
            <img src={Tether} alt="logo" />


            <span style={{ textAlign: "center", fontWeight: "bold" }}>
              0
            </span>{" "}
            &nbsp;
            &nbsp;
            <GiWallet style={{ fontSize: "18px", color: "black" }} />
            {/* Balance display below avatar */}
          </DepositButton2>
          {/* <NavLink to="/deposit" style={{ textDecoration: 'none' }}>
            <DepositButton onClick={handleDepositClick}>
                <CirclePlus size={20}/>DEPOSIT
            </DepositButton>
          </NavLink> */}

          <DepositButton onClick={toggleDropdown}>
            {selectedCountry && (
              <img
                src={selectedCountry.flag}
                alt={`${selectedCountry.name} Flag`}
                width="20"
                style={{
                  marginRight: "2px",
                  borderRadius: "50%",
                  border: "1px solid white",
                }}
              />
            )}
            <IoMdArrowDropdown />
          </DepositButton>

          {isDropdownOpen && (
            <DropdownMenu isVisible={isDropdownOpen}>
              <div
                onClick={() => {
                  handelCountryChange("India")
                  setSelectedCountry({ name: "India", flag: India });
                  setDropdownOpen(false); // Close dropdown
                }}
              >
                <img src={India} alt="India Flag" />
                <p style={{ fontWeight: "bold" }}>India <p style={{ color: "gray" }}>INR</p></p>
              </div>
              <div
                onClick={() => {
                  handelCountryChange("Brazil")
                  setSelectedCountry({ name: "Brazil", flag: Brazil });
                  setDropdownOpen(false); // Close dropdown
                }}
              >
                <img src={Brazil} alt="Brazil Flag" />
                <p style={{ fontWeight: "bold" }}>Brazil <p style={{ color: "gray" }}>BRL</p></p>
              </div>

              <div
                onClick={() => {
                  handelCountryChange("UK")
                  setSelectedCountry({ name: "UK", flag: UK });
                  setDropdownOpen(false); // Close dropdown
                }}
              >
                <img src={UK} alt="UK Flag" />
                <p style={{ fontWeight: "bold" }}>United Kingdom<p style={{ color: "gray" }}>GBP</p></p>
              </div>
              <div
                onClick={() => {
                  handelCountryChange("Euro")
                  setSelectedCountry({ name: "Euro", flag: Euro });
                  setDropdownOpen(false); // Close dropdown
                }}
              >
                <img src={Euro} alt="Europe Flag" />
                <p style={{ fontWeight: "bold" }}>European Union <p style={{ color: "gray" }}>EUR</p></p>
              </div>
              <div
                onClick={() => {
                  handelCountryChange("Dubai")
                  setSelectedCountry({ name: "Dubai", flag: Dubai });
                  setDropdownOpen(false); // Close dropdown
                }}
              >
                <img src={Dubai} alt="Dubai Flag" />
                <p style={{ fontWeight: "bold" }}>United Arab Emirates <p style={{ color: "gray" }}>AED</p></p>
              </div>
              <div
                onClick={() => {
                  handelCountryChange("USA")
                  setSelectedCountry({ name: "USA", flag: USA });
                  setDropdownOpen(false); // Close dropdown
                }}
              >
                <img src={USA} alt="USA Flag" />
                <p style={{ fontWeight: "bold" }}>United State of America<p style={{ color: "gray" }}>USD</p></p>
              </div>

            </DropdownMenu>
          )}

        </div>
      </NavbarContainer>

      {/* Mobile bottom navbar */}
      <NavbarWrapper>
        <NavLinksMobile>
          <li>
            <NavLink exact to="/" activeClassName="active"><RiHome5Fill style={{ fontSize: "25px" }} /><br></br>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isExchangeActive ? location.pathname : "/sell3"}
              className={isExchangeActive ? "active" : ""}
              onClick={handleExchangeClick}
            >
              <RiExchangeFill style={{ fontSize: "25px" }} /><br></br>

              Exchange
            </NavLink>
          </li>
          {/* <li>
            <NavLink exact to="/Withdraw" activeClassName="active">Withdraw</NavLink>
          </li> */}

          <li>
            {token ? (
              <NavLink to="/Profile" activeClassName="active">
                <CgProfile style={{ fontSize: "25px" }} /><br></br>

                Profile
              </NavLink>
            ) : (
              <NavLink to="/sell2" activeClassName="active">
                Sign In
              </NavLink>
            )}
          </li>
        </NavLinksMobile>
      </NavbarWrapper>
    </>
  );
};

export default Navbar;
