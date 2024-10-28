import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Search } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px 10px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  border: none;
  flex-grow: 1;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const CryptoList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CryptoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CryptoIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const CryptoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CryptoName = styled.span`
  font-weight: bold;
`;

const CryptoFullName = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const CryptoSelectionModal = ({ isOpen, onClose, onSelect, currencies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = currencies.filter(currency => 
    currency.Symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Select crypto</ModalTitle>
          <CloseButton onClick={onClose}><X /></CloseButton>
        </ModalHeader>
        <SearchInput>
          <Search size={20} />
          <StyledInput 
            type="text" 
            placeholder="Search here..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <CryptoList>
          {filteredCurrencies.map(currency => (
            <CryptoItem key={currency._id} onClick={() => onSelect(currency)}>
              <CryptoIcon src={currency.Icon || '/placeholder-icon.png'} alt={currency.Symbol} />
              <CryptoInfo>
                <CryptoName>{currency.Symbol}</CryptoName>
                <CryptoFullName>{currency.Name}</CryptoFullName>
              </CryptoInfo>
            </CryptoItem>
          ))}
        </CryptoList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CryptoSelectionModal;