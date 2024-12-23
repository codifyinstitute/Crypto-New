import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Styled components for AdminAddCurrency
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
  max-height: 100vh;
  overflow-y: auto; /* Enable vertical scrolling */
  margin-top: 4rem; /* Space for header on mobile */

  @media (min-width: 768px) {
    margin-top: 0; /* No top margin needed for larger screens */
  }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center; /* Center align the title */
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center; /* Center align the paragraph */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center; /* Center align the form elements */
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 400px; /* Limit the width of the input fields */
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

const TableContainer = styled.div`
  margin: 1.5rem auto; /* Center align the table container */
  width: 100%; /* Ensure it takes full width */
`;

const Table = styled.table`
  width: 100%; /* Full width of the container */
  border-collapse: collapse; /* Collapse table borders */

  thead {
    background-color: #f1f1f1;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd; /* Add border to table cells */
    white-space: nowrap; /* Prevent cells from wrapping */
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

const EditButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-left: 0.5rem; /* Space between Edit and Delete buttons */

  &:hover {
    background-color: #c82333;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 400px; /* Limit the width of the search box */
  margin-bottom: 1rem; /* Space below the search box */
`;

const countryObject = {
    India: "india",
    Brazil: "brl",
    'United Kingdom': "uk",
    'European Union': "euro",
    'United Arab Emirates': "aed",
    'United State of America': "usa"
}

const AdminAddCurrency = () => {
    const { country: con } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [rate, setRate] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [qrCode, setQrCode] = useState(null); // For QRCode file
    const [currencies, setCurrencies] = useState([]);
    const [filteredCurrencies, setFilteredCurrencies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingCurrency, setEditingCurrency] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);
    const [currencyToDelete, setCurrencyToDelete] = useState(null);

    useEffect(() => {
        const Id = localStorage.getItem("Login");
        if (Id !== "Admin") {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleAddCurrency = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Symbol', symbol);
        formData.append('Rate', rate);
        formData.append('TransactionId', transactionId);
        if (qrCode) {
            formData.append('QRCode', qrCode); // Include QRCode if uploaded
        }

        try {
            // console.log(`https://pay.moonpayx.com/currencies/${countryObject[country]}/add`)
            const response = await fetch(`https://pay.moonpayx.com/currencies/${countryObject[country]}/add`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            toast.success('Currency added successfully');
            setName('');
            setSymbol('');
            setRate('');
            setTransactionId('');
            setQrCode(null); // Reset QRCode
            fetchCurrencies(); // Refresh the list after adding a new currency
        } catch (error) {
            console.error('Error adding currency:', error);
            toast.error('Failed to add currency');
        }
    };

    const fetchCurrencies = async () => {
        try {
            const response = await fetch(`https://pay.moonpayx.com/currencies/${countryObject[country]}/all`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrencies(data.reverse());
            setFilteredCurrencies(data);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const handleEditCurrency = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Symbol', symbol);
        formData.append('Rate', rate);
        formData.append('TransactionId', transactionId);
        if (qrCode) {
            formData.append('QRCode', qrCode); // Include QRCode if changed
        }

        try {
            const response = await fetch(`https://pay.moonpayx.com/currencies/${countryObject[country]}/put/${editingCurrency._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success('Currency updated successfully');
            setName('');
            setSymbol('');
            setRate('');
            setTransactionId('');
            setQrCode(null); // Reset QRCode
            setEditMode(false);
            setEditingCurrency(null);
            fetchCurrencies(); // Refresh the list after updating a currency
        } catch (error) {
            console.error('Error updating currency:', error);
            toast.error('Failed to update currency');
        }
    };

    const handleDeleteCurrency = async () => {
        try {
            const response = await fetch(`https://pay.moonpayx.com/currencies/${countryObject[country]}/del/${currencyToDelete._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success('Currency deleted successfully');
            setDeleteMode(false);
            setCurrencyToDelete(null);
            fetchCurrencies(); // Refresh the list after deleting a currency
        } catch (error) {
            console.error('Error deleting currency:', error);
            toast.error('Failed to delete currency');
        }
    };

    const openEditModal = (currency) => {
        setName(currency.Name);
        setSymbol(currency.Symbol);
        setRate(currency.Rate);
        setTransactionId(currency.TransactionId);
        setEditingCurrency(currency);
        setEditMode(true);
    };

    const openDeleteModal = (currency) => {
        setCurrencyToDelete(currency);
        setDeleteMode(true);
    };

    const closeModals = () => {
        setEditMode(false);
        setDeleteMode(false);
        setEditingCurrency(null);
        setCurrencyToDelete(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        filterCurrencies(e.target.value);
    };

    const filterCurrencies = (query) => {
        const filtered = currencies.filter(currency =>
            currency.Name.toLowerCase().includes(query.toLowerCase()) ||
            currency.Symbol.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCurrencies(filtered);
    };

    useEffect(() => {
        setCountry(con);
    }, [con]);

    useEffect(() => {
        fetchCurrencies(); // Fetch currencies when the country state changes
    }, [country]);

    return (
        <DashboardContainer>
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <Section>
                    <Title>Add New Currency In {country}</Title>
                    <Form onSubmit={handleAddCurrency}>
                        <Input
                            type="text"
                            placeholder="Currency Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Currency Symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            required
                        />
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Currency Rate"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            required
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setQrCode(e.target.files[0])} // Handle file input
                        />
                        <Button type="submit">Add Currency</Button>
                    </Form>
                </Section>

                <Section>
                    <Title>Currency List</Title>
                    <SearchInput
                        type="text"
                        placeholder="Search by name or symbol"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <TableContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Symbol</th>
                                    <th>Rate</th>
                                    <th>Transaction ID</th> {/* Add Transaction ID column */}
                                    <th>QRCode</th> {/* Add QRCode column */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCurrencies.map((currency) => (
                                    <tr key={currency._id}>
                                        <td>{currency.Name}</td>
                                        <td>{currency.Symbol}</td>
                                        <td>{currency.Rate}</td>
                                        <td>{currency.TransactionId}</td> {/* Display Transaction ID */}
                                        <td>
                                            {currency.QRCode && (
                                                <img
                                                    src={`https://pay.moonpayx.com/uploads/${currency.QRCode}`}
                                                    alt="QRCode"
                                                    width="50"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <EditButton onClick={() => openEditModal(currency)}>Edit</EditButton>
                                            <DeleteButton onClick={() => openDeleteModal(currency)}>Delete</DeleteButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                </Section>

                {editMode && (
                    <Modal>
                        <ModalContent>
                            <CloseButton onClick={closeModals}>X</CloseButton>
                            <Title>Edit Currency</Title>
                            <Form onSubmit={handleEditCurrency}>
                                <Input
                                    type="text"
                                    placeholder="Currency Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="Currency Symbol"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                    required
                                />
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Currency Rate"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="Transaction ID"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    required
                                />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setQrCode(e.target.files[0])} // Handle file input
                                />
                                <Button type="submit">Update Currency</Button>
                            </Form>
                        </ModalContent>
                    </Modal>
                )}

                {deleteMode && (
                    <Modal>
                        <ModalContent>
                            <CloseButton onClick={closeModals}>X</CloseButton>
                            <Title>Confirm Deletion</Title>
                            <Paragraph>Are you sure you want to delete this currency?</Paragraph>
                            <ConfirmButton onClick={handleDeleteCurrency}>Confirm</ConfirmButton>
                        </ModalContent>
                    </Modal>
                )}

                {/* Toast container for displaying notifications */}
                <ToastContainer />
            </Content>
        </DashboardContainer>
    );
};

export default AdminAddCurrency;