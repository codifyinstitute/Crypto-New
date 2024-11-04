import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components for AdminTransaction
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
  background: white;
  margin-top: 4rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto; 
  max-width: calc(100vw - 250px);
  margin-top: 1.5rem;
  -webkit-overflow-scrolling: touch;
  max-height: 70vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px;

  thead {
    background-color: #f1f1f1;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    font-weight: bold;
    color: #333;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 0.875rem;
      padding: 0.5rem;
    }
  }
`;

const FiltersContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const InputDate = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  float: right;
`;

const TablePop = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const ConfirmationModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ConfirmationModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

const countryObject = {
  India: {
    urlName: "india",
    symbol: "₹",
    name: "India"
  },
  Brazil: {
    urlName: "brl",
    symbol: "R$",
    name: "Brazil"
  },
  UK: {
    urlName: "uk",
    symbol: "£",
    name: "United Kingdom"
  },
  Euro: {
    urlName: "euro",
    symbol: "€",
    name: "European Union"
  },
  Dubai: {
    urlName: "aed",
    symbol: "د.إ",
    name: "Dubai"
  },
  USA: {
    urlName: "usa",
    symbol: "$",
    name: "United States of America"
  }
}

const AdminTransaction = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState('');
  const [status, setStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterToken, setFilterToken] = useState('');
  const [filterCountry, setFilterCountry] = useState(''); // New state for country filter
  const [tokens, setTokens] = useState([]);
  const [countries, setCountries] = useState([]); // New state for country list
  const [confirmAction, setConfirmAction] = useState({ type: '', id: '', amount: '' });
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    const Id = localStorage.getItem("Login");
    if (Id !== "Admin") {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8000/transactions/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setTransactions(data.reverse());
        setFilteredTransactions(data);

        // Extract unique tokens and countries
        const uniqueTokens = [...new Set(data.map(transaction => transaction.Token).filter(token => token))];
        const uniqueCountries = [...new Set(data.map(transaction => transaction.Country).filter(country => country))];

        setTokens(uniqueTokens);
        setCountries(uniqueCountries); // Set unique countries
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (filterDate) {
      const temp = filterDate.split("-").reverse().join("-");
      filtered = filtered.filter(transaction => transaction.Date === temp);
    }
    if (filterStatus) {
      filtered = filtered.filter(transaction => transaction.Status === filterStatus);
    }
    if (filterToken) {
      filtered = filtered.filter(transaction => transaction.Token === filterToken);
    }
    if (filterCountry) {
      filtered = filtered.filter(transaction => transaction.Country === filterCountry);
    }
    if (searchQuery) {
      filtered = filtered.filter(transaction =>
        transaction.OrderId.toString().includes(searchQuery) ||
        transaction.Email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [filterDate, filterStatus, filterToken, filterCountry, searchQuery, transactions]);


  const handleUpdateStatus = async () => {
    if (!selectedTransactionId || !status) {
      alert("Please select a transaction and status.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/transactions/put/${selectedTransactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: status }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message);
      setStatus('');
      setSelectedTransactionId('');

      // Refetch transactions
      const updatedTransactions = await fetch('http://localhost:8000/transactions/all').then(res => res.json());
      setTransactions(updatedTransactions.reverse());
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  const handleIconClick = (accountDetail) => {
    setAccountDetails(accountDetail);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAccountDetails(null);
  };

  const handleConfirmAction = async () => {
    try {
      const url = confirmAction.type === 'accept'
        ? `http://localhost:8000/transactions/complete/${confirmAction.id}`
        : `http://localhost:8000/transactions/reject/${confirmAction.id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: confirmAction.amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      toast.success(`Transaction ${confirmAction.type === 'accept' ? 'accepted' : 'rejected'} successfully!`);

      const updatedTransactions = await fetch('http://localhost:8000/transactions/all').then(res => res.json());
      setTransactions(updatedTransactions.reverse());
      setFilteredTransactions(updatedTransactions.reverse());
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setConfirmAction({ type: '', id: '', amount: '' });
    }
  };


  const handelReject = async (id, value) => {
    try {
      const response = await fetch(`http://localhost:8000/transactions/reject/${id}`, { // Updated URL for the backend
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      const result = await response.json();

    } catch (error) {
      alert("Error submitting transaction: " + error.message);
    }
  }

  const openConfirmation = (type, id, amount) => {
    setConfirmAction({ type, id, amount });
  };

  const handelConfirm = async (id, value) => {
    try {
      const response = await fetch(`http://localhost:8000/transactions/complete/${id}`, { // Updated URL for the backend
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      const result = await response.json();

    } catch (error) {
      alert("Error submitting transaction: " + error.message);
    }
  }

  return (
    <DashboardContainer>
      <ToastContainer />
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Content>
        <Section>
          <Title>Manage Transactions</Title>
          <Paragraph>Here you can manage and review all transactions within the system.</Paragraph>

          {/* Filter Section */}
          <FiltersContainer>
            <InputDate
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />

            <Select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
              <option value="">Select Status</option>
              {[...new Set(transactions.map(t => t.Status))].map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>

            <Select onChange={(e) => setFilterToken(e.target.value)} value={filterToken}>
              <option value="">Select Token</option>
              {tokens.map(token => (
                <option key={token} value={token}>{token}</option>
              ))}
            </Select>

            <Select onChange={(e) => setFilterCountry(e.target.value)} value={filterCountry}>
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Select>

            {/* Search Input */}
            <InputDate
              type="text"
              placeholder="Search by Order ID or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FiltersContainer>


          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Email</th>
                  <th>Account Detail</th>
                  <th>Country</th>
                  <th>Token</th>
                  <th>USDT Amount</th>
                  <th>Processing Fee</th>
                  <th>Network Fee</th>
                  <th>Received Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Update Status</th>
                  <th>Update</th>
                  <th>Reject</th>
                  <th>Accept</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{transaction.OrderId}</td>
                    <td>{transaction.Email}</td>
                    <td>
                      <MdOutlineRemoveRedEye onClick={() => handleIconClick(transaction.AccountDetail)} />
                    </td>
                    <td>{transaction.Country}</td>
                    <td>{transaction.Token}</td>
                    <td>{transaction.USDTAmount}</td>
                    <td>{countryObject[transaction.Country].symbol} {transaction.ProcessingFee}</td>
                    <td>{countryObject[transaction.Country].symbol} {transaction.NetworkFee}</td>
                    <td>{countryObject[transaction.Country].symbol} {transaction.ReceivedAmount}</td>
                    <td>{transaction.Status}</td>
                    <td>{transaction.Date}</td>
                    <td>{transaction.Time}</td>
                    <td>
                      {transaction.Status === "Failed" || transaction.Status === "Successful" ? `${transaction.Status}` :
                        <Select
                          value={selectedTransactionId === transaction._id ? status : ''}
                          onChange={(e) => {
                            if (selectedTransactionId === transaction._id) {
                              setStatus(e.target.value);
                            } else {
                              setSelectedTransactionId(transaction._id);
                              setStatus(e.target.value);
                            }
                          }}
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          {/* <option value="Failed">Decline</option>
                      <option value="Completed">Completed</option> */}
                        </Select>
                      }

                    </td>
                    <td>
                      {transaction.Status === "Failed" || transaction.Status === "Successful" ? `${transaction.Status}` :
                        <Button onClick={handleUpdateStatus}>Update Status</Button>
                      }
                    </td>
                    <td>
                      {transaction.Status === "Failed" || transaction.Status === "Successful" ? `${transaction.Status}` :
                        <Button style={{ backgroundColor: "Red" }}
                          onClick={() => openConfirmation('reject', transaction._id, transaction.USDTAmount)}>
                          Reject
                        </Button>
                      }
                    </td>
                    <td>
                      {transaction.Status === "Failed" || transaction.Status === "Successful" ? `${transaction.Status}` :
                        <Button style={{ backgroundColor: "Green" }}
                          onClick={() => openConfirmation('accept', transaction._id, transaction.USDTAmount)}>
                          Confirm
                        </Button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
      </Content>
      {modalVisible && (
        <ModalBackground onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <TablePop>
              <thead>
                <tr>
                <th colSpan="2">{Object.keys(accountDetails).includes("CardNumber")?"Card Details":"Bank Details"}</th>
                </tr>
              </thead>
              <tbody>
                {accountDetails && Object.entries(accountDetails).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </TablePop>
          </ModalContent>
        </ModalBackground>
      )}
      {confirmAction.type && (
        <ConfirmationModalBackground onClick={() => setConfirmAction({ type: '', id: '', amount: '' })}>
          <ConfirmationModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to {confirmAction.type === 'accept' ? 'accept' : 'reject'} this transaction?</h3>
            <Button onClick={handleConfirmAction}>Yes</Button>
            <Button onClick={() => setConfirmAction({ type: '', id: '', amount: '' })}>No</Button>
          </ConfirmationModalContent>
        </ConfirmationModalBackground>
      )}

    </DashboardContainer>
  );
};

export default AdminTransaction;
