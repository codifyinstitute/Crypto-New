import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

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
  text-align: center; /* Center align the title */
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center; /* Center align the paragraph */
`;

const TableContainer = styled.div`
  overflow-x: auto; /* Enable horizontal scroll */
  overflow-y: auto; 
  max-width: calc(100vw - 250px);
  margin-top: 1.5rem;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  max-height: 70vh; /* Limit the height of the container */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px; /* Ensure the table has a minimum width for scrolling */
  table-layout: auto; /* Adjust column width automatically */

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
  flex-wrap: wrap; /* Allows the filters to wrap on smaller screens */
  gap: 1rem; /* Space between filter elements */
  margin-bottom: 1rem;
`;

const Select = styled.select`
  flex: 1; /* Allows the select elements to grow and fill the available space */
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const InputDate = styled.input`
  flex: 1; /* Allows the date input to grow and fill the available space */
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

const AdminTransaction = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState('');
  const [status, setStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterToken, setFilterToken] = useState('');
  const [tokens, setTokens] = useState([]);

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
        
        // console.log(data.reverse())
        setTransactions(data.reverse());
        setFilteredTransactions(data);
        // Extract unique tokens
        const uniqueTokens = [...new Set(data.map(transaction => transaction.Token).filter(token => token))];
        setTokens(uniqueTokens);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (filterDate) {
      var temp = filterDate.split("-").reverse().join("-");
      console.log(temp)
      filtered = filtered.filter(transaction => transaction.Date === temp);
    }
    if (filterStatus) {
      filtered = filtered.filter(transaction => transaction.Status === filterStatus);
    }
    if (filterToken) {
      filtered = filtered.filter(transaction => transaction.Token === filterToken);
    }

    setFilteredTransactions(filtered);
  }, [filterDate, filterStatus, filterToken, transactions]);

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
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  return (
    <DashboardContainer>
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
          </FiltersContainer>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Transaction Id</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>IFSC</th>
                  <th>Token</th>
                  <th>USDT Amount</th>
                  <th>Processing Fee</th>
                  <th>Received Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Update Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{transaction.OrderId}</td>
                    <td>{transaction.TransactionId}</td>
                    <td>{transaction.Email}</td>
                    <td>{transaction.Name}</td>
                    <td>{transaction.Country}</td>
                    <td>{transaction.BankName}</td>
                    <td>{transaction.AccountNumber}</td>
                    <td>{transaction.IFSC}</td>
                    <td>{transaction.Token}</td>
                    <td>{transaction.USDTAmount}</td>
                    <td>{transaction.ProcessingFee}</td>
                    <td>{transaction.ReceivedAmount}</td>
                    <td>{transaction.Status}</td>
                    <td>{transaction.Date}</td>
                    <td>{transaction.Time}</td>
                    <td>
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
                        <option value="Decline">Decline</option>
                        <option value="Completed">Completed</option>

                      </Select>
                    </td>
                    <td>
                      <Button onClick={handleUpdateStatus}>Update Status</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
      </Content>
    </DashboardContainer>
  );
};

export default AdminTransaction;
