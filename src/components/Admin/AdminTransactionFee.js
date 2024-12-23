import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

// Styled components
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FeeDisplay = styled.div`
  margin-top: 2.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FileInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const countryObject = {
    India: {
        urlName: "india",
        symbol: "₹",
        name: "India",
        fait: "INR"
    },
    Brazil: {
        urlName: "brl",
        symbol: "R$",
        name: "Brazil",
        fait: "BRL"
    },
    "United Kingdom": {
        urlName: "uk",
        symbol: "£",
        name: "United Kingdom",
        fait: "GBP"
    },
    "European Union": {
        urlName: "euro",
        symbol: "€",
        name: "European Union",
        fait: "EUR"
    },
    "United Arab Emirates": {
        urlName: "aed",
        symbol: "د.إ",
        name: "Dubai",
        fait: "AED"
    },
    "United State of America": {
        urlName: "usa",
        symbol: "$",
        name: "United States of America",
        fait: "USD"
    }
}

const AdminTransactionFee = () => {
    const { country: con } = useParams();
    const [country, setCountry] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [transactionFee, setTransactionFee] = useState(0);
    const [transactionFeeFix, setTransactionFeeFix] = useState(0);
    const [networkFee, setNetworkFee] = useState(0);
    const [networkFeeFix, setNetworkFeeFix] = useState(0);
    const [minAmount, setMinAmount] = useState(0);
    const [minAmountFix, setMinAmountFix] = useState(0);
    const [transactionId, setTransactionId] = useState('');
    const [image, setImage] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const Id = localStorage.getItem("Login");
        if (Id !== "Admin") {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        // console.log(con)
        setCountry(con);
    }, [con]);

    const fetchTransactionFee = async () => {
        // console.log(countryObject[country]?.urlName)
        // console.log(countryObject[country])
        // console.log(country)
        // console.log(con)
        try {
            const response = await fetch(`https://pay.moonpayx.com/static/${countryObject[country]?.urlName}/one`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log(data.TransactionFee, data.NetworkFee, data.MinAmount)
            setTransactionFee(data.TransactionFee);
            setTransactionFeeFix(data.TransactionFee);
            setNetworkFee(data.NetworkFee);
            setNetworkFeeFix(data.NetworkFee);
            setMinAmount(data.MinAmount);
            setMinAmountFix(data.MinAmount);
            setId(data._id);
            // console.log(data._id)
            // setTransactionId(data.TransactionId);
            // setImage(data.QRCode);
        } catch (error) {
            console.log('Error fetching transaction fee');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactionFee();
    }, [country]);

    const handleFeeUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://pay.moonpayx.com/static/${countryObject[country]?.urlName}/put/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ TransactionFee: transactionFee }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Transaction fee updated successfully');
            fetchTransactionFee();
        } catch (error) {
            setError('Error updating transaction fee');
        } finally {
            setLoading(false);
        }
    };

    const handleNetworkFeeUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://pay.moonpayx.com/static/${countryObject[country]?.urlName}/put/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ NetworkFee: networkFee }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Network fee updated successfully');
            fetchTransactionFee();
        } catch (error) {
            setError('Error updating transaction fee');
        } finally {
            setLoading(false);
        }
    };

    const handelMinAmountUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://pay.moonpayx.com/static/${countryObject[country]?.urlName}/put/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ MinAmount: minAmount }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Minimum Amount updated successfully');
            fetchTransactionFee();
        } catch (error) {
            setError('Error updating transaction ID');
        } finally {
            setLoading(false);
        }
    };


    return (
        <DashboardContainer>
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <Section>
                    <Title>Transaction Management ({country})</Title>
                    <Paragraph>Manage and review the transaction details here.</Paragraph>
                    {loading ? (
                        <Paragraph>Loading...</Paragraph>
                    ) : error ? (
                        <Paragraph>{error}</Paragraph>
                    ) : (
                        <>
                            <Form onSubmit={handleFeeUpdate}>
                                <FeeDisplay>Current Processing Fee: {countryObject[country]?.symbol}{transactionFeeFix}</FeeDisplay>
                                <label>
                                    <Paragraph>Update Fee:</Paragraph>
                                    <Input
                                        type="number"
                                        value={transactionFee}
                                        onChange={(e) => setTransactionFee(e.target.value)}
                                    />
                                </label>
                                <Button type="submit">Update Fee</Button>
                            </Form>

                            <Form onSubmit={handleNetworkFeeUpdate}>
                                <FeeDisplay>Current Network Fee: {countryObject[country]?.symbol}{networkFeeFix}</FeeDisplay>
                                <label>
                                    <Paragraph>Update Fee:</Paragraph>
                                    <Input
                                        type="number"
                                        value={networkFee}
                                        onChange={(e) => setNetworkFee(e.target.value)}
                                    />
                                </label>
                                <Button type="submit">Update Fee</Button>
                            </Form>

                            <Form onSubmit={handelMinAmountUpdate}>
                                <FeeDisplay>Current Minimum Amount: {countryObject[country]?.symbol}{minAmountFix}</FeeDisplay>
                                <label>
                                    <Paragraph>Update Minimum Amount:</Paragraph>
                                    <Input
                                        type="number"
                                        value={minAmount}
                                        onChange={(e) => setMinAmount(e.target.value)}
                                    />
                                </label>
                                <Button type="submit">Update Amount</Button>
                            </Form>
                        </>
                    )}
                </Section>
            </Content>
        </DashboardContainer>
    );
};

export default AdminTransactionFee;
