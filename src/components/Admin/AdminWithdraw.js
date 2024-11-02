import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
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
  max-width: calc(100vw - 250px);
  margin-top: 1.5rem;
  max-height: 70vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

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

const AdminWithdraw = () => {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedTransactionId, setSelectedTransactionId] = useState('');
    const [status, setStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterToken, setFilterToken] = useState('');
    const [tokens, setTokens] = useState([]);
    const [searchOrderId, setSearchOrderId] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    useEffect(() => {
        const Id = localStorage.getItem("Login");
        if (Id !== "Admin") {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('https://crypto-backend-main.onrender.com/withdraw/all');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                setTransactions(data.reverse());
                setFilteredTransactions(data);

                const uniqueTokens = [...new Set(data.map(transaction => transaction.Network).filter(token => token))];
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
            const temp = filterDate.split("-").reverse().join("-");
            filtered = filtered.filter(transaction => transaction.Date === temp);
        }
        if (filterStatus) {
            filtered = filtered.filter(transaction => transaction.Status === filterStatus);
        }
        if (filterToken) {
            filtered = filtered.filter(transaction => transaction.Network === filterToken);
        }
        if (searchOrderId) {
            filtered = filtered.filter(transaction => transaction.OrderId.toLowerCase().includes(searchOrderId.toLowerCase()));
        }
        if (searchEmail) {
            filtered = filtered.filter(transaction => transaction.Email.toLowerCase().includes(searchEmail.toLowerCase()));
        }

        setFilteredTransactions(filtered);
    }, [filterDate, filterStatus, filterToken, transactions, searchOrderId, searchEmail]);

    const handleUpdateStatus = async () => {
        if (!selectedTransactionId || !status) {
            toast.error("Please select a transaction and status.");
            return;
        }

        try {
            const response = await fetch(`https://crypto-backend-main.onrender.com/withdraw/update/${selectedTransactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Status: status }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            toast.success("Updated Successfully");
            setStatus('');
            setSelectedTransactionId('');

            const updatedTransactions = await fetch('https://crypto-backend-main.onrender.com/withdraw/all').then(res => res.json());
            setTransactions(updatedTransactions.reverse());
        } catch (error) {
            console.error('Error updating transaction status:', error);
            toast.error("Error updating transaction status.");
        }
    };

    return (
        <DashboardContainer>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} pauseOnHover />
            <Sidebar />
            <Content>
                <Section>
                    <Title>Manage Withdraw</Title>
                    <Paragraph>Here you can manage and review all Withdraw within the system.</Paragraph>

                    <FiltersContainer>
                        <InputDate
                            type="date"
                            value={filterDate}
                            onChange={(e) => {
                                // Format the date from YYYY-MM-DD to MM/DD/YYYY
                                const date = new Date(e.target.value);
                                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                                setFilterDate(formattedDate);
                            }}
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
                        <InputDate
                            type="text"
                            placeholder="Search by Email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </FiltersContainer>

                    <TableContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Network</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Update Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{transaction.Email}</td>
                                        <td>{transaction.WithdrawAmount}</td>
                                        <td>{transaction.Network}</td>
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
                                                <option value="Failed">Failed</option>
                                            </Select>
                                        </td>
                                        <td>
                                            <Button onClick={handleUpdateStatus}>Update</Button>
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

export default AdminWithdraw;
