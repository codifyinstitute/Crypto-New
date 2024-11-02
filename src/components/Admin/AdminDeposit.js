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

const AdminDeposit = () => {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedTransactionId, setSelectedTransactionId] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterToken, setFilterToken] = useState('');
    const [filterCountry, setFilterCountry] = useState(''); // New state for country filter
    const [tokens, setTokens] = useState([]);
    const [countries, setCountries] = useState([]); // New state for country list
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
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
                const response = await fetch('https://crypto-backend-main.onrender.com/deposit-transactions/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setTransactions(data.reverse());
                setFilteredTransactions(data);

                // Extract unique tokens and countries
                const uniqueTokens = [...new Set(data.map(transaction => transaction.Network).filter(token => token))];
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
            filtered = filtered.filter(transaction => transaction.Network === filterToken);
        }
        if (filterCountry) {
            filtered = filtered.filter(transaction => transaction.Country === filterCountry);
        }

        // Add search filters
        if (searchOrderId) {
            filtered = filtered.filter(transaction => transaction.OrderId.toLowerCase().includes(searchOrderId.toLowerCase()));
        }
        if (searchEmail) {
            filtered = filtered.filter(transaction => transaction.Email.toLowerCase().includes(searchEmail.toLowerCase()));
        }

        setFilteredTransactions(filtered);
    }, [filterDate, filterStatus, filterToken, filterCountry, transactions, searchOrderId, searchEmail]);


    const handleUpdateStatus = async () => {
        if (!selectedTransactionId || !status) {
            alert("Please select a transaction and status.");
            return;
        }

        try {
            const response = await fetch(`https://crypto-backend-main.onrender.com/deposit-transactions/put/${selectedTransactionId}`, {
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
            const updatedTransactions = await fetch('https://crypto-backend-main.onrender.com/deposit-transactions/all').then(res => res.json());
            setTransactions(updatedTransactions);
        } catch (error) {
            console.error('Error updating transaction status:', error);
        }
    };

    const PaidWallet = async (Id) => {
        try {
            const response = await fetch(`https://crypto-backend-main.onrender.com/deposit-transactions/paid/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert("Paid Successfully");

            // Refetch transactions
            const updatedTransactions = await fetch('https://crypto-backend-main.onrender.com/deposit-transactions/all').then(res => res.json());
            setTransactions(updatedTransactions.reverse());
        } catch (error) {
            console.error('Error updating transaction status:', error);
        }
    }

    const openConfirmModal = (type, transaction) => {
        setCurrentTransaction({ type, transaction });
        setConfirmModalVisible(true);
    };

    const closeConfirmModal = () => {
        setConfirmModalVisible(false);
        setCurrentTransaction(null);
    };


    const handleIconClick = (accountDetail) => {
        setAccountDetails(accountDetail);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setAccountDetails(null);
    };

    const handelConfirm = async () => {
        if (currentTransaction) {
            const { transaction } = currentTransaction;
            try {
                const response = await fetch(`https://crypto-backend-main.onrender.com/deposit-transactions/paid/${transaction._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: paymentAmount }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                toast.success("Payment processed successfully!");
                closeConfirmModal();
                // Refetch transactions
                const updatedTransactions = await fetch('https://crypto-backend-main.onrender.com/deposit-transactions/all').then(res => res.json());
                setTransactions(updatedTransactions.reverse());
            } catch (error) {
                console.error('Error processing payment:', error);
                toast.error("Error processing payment.");
            }
        }
    };

    const handelReject = async () => {
        if (currentTransaction) {
            const { transaction } = currentTransaction;
            try {
                // Make API call to reject the transaction
                const response = await fetch(`https://crypto-backend-main.onrender.com/deposit-transactions/reject/${transaction._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const updatedTransaction = await response.json();
                toast.success("Transaction rejected successfully!");
                closeConfirmModal();
                // Refetch transactions
                const updatedTransactions = await fetch('https://crypto-backend-main.onrender.com/deposit-transactions/all').then(res => res.json());
                setTransactions(updatedTransactions.reverse());
            } catch (error) {
                console.error('Error rejecting transaction:', error);
                toast.error("Error rejecting transaction.");
            }
        }
    };


    return (
        <DashboardContainer>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <Section>
                    <Title>Manage Deposit</Title>
                    <Paragraph>Here you can manage and review all Deposit within the system.</Paragraph>

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

                        <InputDate
                            type="text"
                            placeholder="Search by Order ID"
                            value={searchOrderId}
                            onChange={(e) => setSearchOrderId(e.target.value)}
                        />
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
                                    <th>Order ID</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Network</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Paid</th>
                                    {/* <th>Update Status</th> */}
                                    <th>Approve </th>
                                    <th>Reject </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{transaction.OrderId}</td>
                                        <td>{transaction.Email}</td>
                                        <td>{transaction.Amount}</td>
                                        <td>{transaction.Network}</td>
                                        <td>{transaction.Status}</td>
                                        <td>{transaction.Date}</td>
                                        <td>{transaction.Time}</td>
                                        <td>
                                            {transaction.Paid ? "Paid" : transaction.Status === "Failed" ? "Failed" : "Not Paid"}
                                        </td>
                                        {/* <td>
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
                                                <option value="Successful">Successful</option>
                                            </Select>
                                        </td>
                                        <td>
                                            <Button onClick={handleUpdateStatus}>Update</Button>
                                        </td> */}
                                        <td>
                                            {transaction.Paid ? "Amount Paid" : transaction.Status === "Failed" ? "Failed" : <Button style={{ backgroundColor: "Red" }} onClick={() => openConfirmModal('reject', transaction)}>Reject</Button>}

                                        </td>
                                        <td>
                                            {transaction.Paid ? "Amount Paid" : transaction.Status === "Failed" ? "Failed" : <Button style={{ backgroundColor: "Green" }} onClick={() => openConfirmModal('accept', transaction)}>Confirm</Button>}
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
                        <h2>Account Details</h2>
                        <TablePop>
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
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
            {confirmModalVisible && (
                <ModalBackground onClick={closeConfirmModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={closeConfirmModal}>&times;</CloseButton>
                        <h2>{currentTransaction?.type === 'accept' ? "Confirm Payment" : "Confirm Rejection"}</h2>
                        {currentTransaction?.type === 'accept' ? (
                            <>
                                <Paragraph>Enter the amount to pay:</Paragraph>
                                <InputDate
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                />
                                <Button onClick={handelConfirm}>Pay</Button>
                            </>
                        ) : (<>
                            <Paragraph>Are you sure you want to reject this transaction?</Paragraph>
                            <Button onClick={handelReject}>Yes, Reject</Button>
                        </>
                        )}
                    </ModalContent>
                </ModalBackground>
            )}

        </DashboardContainer>
    );
};

export default AdminDeposit;
