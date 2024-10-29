import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Sidebar from './Sidebar'; // Adjust the path if necessary

// Styled components (as before)
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
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;
  background: white;
  margin-top: 4rem; /* Space for header on mobile */

  @media (min-width: 768px) {
    margin-top: 0; /* No top margin needed for larger screens */
  }
`;

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OtherPrice = () => {
  const [formData, setFormData] = useState({
    TransactionFee: '',
    NetworkFee: '',
    LoginId: '',
    Password: '',
    Wazirx: { Average: '', Min: '', Max: '' },
    Binance: { Average: '', Min: '', Max: '' },
    Coinbase: { Average: '', Min: '', Max: '' },
    Kraken: { Average: '', Min: '', Max: '' }
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://crypto-tusv.onrender.com/static/get/66c445a358802d46d5d70dd4');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('https://crypto-tusv.onrender.com/static/put/66c445a358802d46d5d70dd4', formData);
      alert('Data updated successfully');
      //console.log(response.data);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Content>
        <Container>
          <h1>Update Static Data</h1>
          <Form onSubmit={handleSubmit}>
            <h2>Wazirx</h2>
            <Label htmlFor="Wazirx_Average">Average</Label>
            <Input
              type="number"
              id="Wazirx_Average"
              name="Wazirx_Average"
              value={formData.Wazirx.Average}
              onChange={(e) => handleChange({ target: { name: 'Wazirx', value: { ...formData.Wazirx, Average: e.target.value } } })}
            />
            <Label htmlFor="Wazirx_Min">Min</Label>
            <Input
              type="number"
              id="Wazirx_Min"
              name="Wazirx_Min"
              value={formData.Wazirx.Min}
              onChange={(e) => handleChange({ target: { name: 'Wazirx', value: { ...formData.Wazirx, Min: e.target.value } } })}
            />
            <Label htmlFor="Wazirx_Max">Max</Label>
            <Input
              type="number"
              id="Wazirx_Max"
              name="Wazirx_Max"
              value={formData.Wazirx.Max}
              onChange={(e) => handleChange({ target: { name: 'Wazirx', value: { ...formData.Wazirx, Max: e.target.value } } })}
            />

            <h2>Binance</h2>
            <Label htmlFor="Binance_Average">Average</Label>
            <Input
              type="number"
              id="Binance_Average"
              name="Binance_Average"
              value={formData.Binance.Average}
              onChange={(e) => handleChange({ target: { name: 'Binance', value: { ...formData.Binance, Average: e.target.value } } })}
            />
            <Label htmlFor="Binance_Min">Min</Label>
            <Input
              type="number"
              id="Binance_Min"
              name="Binance_Min"
              value={formData.Binance.Min}
              onChange={(e) => handleChange({ target: { name: 'Binance', value: { ...formData.Binance, Min: e.target.value } } })}
            />
            <Label htmlFor="Binance_Max">Max</Label>
            <Input
              type="number"
              id="Binance_Max"
              name="Binance_Max"
              value={formData.Binance.Max}
              onChange={(e) => handleChange({ target: { name: 'Binance', value: { ...formData.Binance, Max: e.target.value } } })}
            />

            <h2>Coinbase</h2>
            <Label htmlFor="Coinbase_Average">Average</Label>
            <Input
              type="number"
              id="Coinbase_Average"
              name="Coinbase_Average"
              value={formData.Coinbase.Average}
              onChange={(e) => handleChange({ target: { name: 'Coinbase', value: { ...formData.Coinbase, Average: e.target.value } } })}
            />
            <Label htmlFor="Coinbase_Min">Min</Label>
            <Input
              type="number"
              id="Coinbase_Min"
              name="Coinbase_Min"
              value={formData.Coinbase.Min}
              onChange={(e) => handleChange({ target: { name: 'Coinbase', value: { ...formData.Coinbase, Min: e.target.value } } })}
            />
            <Label htmlFor="Coinbase_Max">Max</Label>
            <Input
              type="number"
              id="Coinbase_Max"
              name="Coinbase_Max"
              value={formData.Coinbase.Max}
              onChange={(e) => handleChange({ target: { name: 'Coinbase', value: { ...formData.Coinbase, Max: e.target.value } } })}
            />

            <h2>Kraken</h2>
            <Label htmlFor="Kraken_Average">Average</Label>
            <Input
              type="number"
              id="Kraken_Average"
              name="Kraken_Average"
              value={formData.Kraken.Average}
              onChange={(e) => handleChange({ target: { name: 'Kraken', value: { ...formData.Kraken, Average: e.target.value } } })}
            />
            <Label htmlFor="Kraken_Min">Min</Label>
            <Input
              type="number"
              id="Kraken_Min"
              name="Kraken_Min"
              value={formData.Kraken.Min}
              onChange={(e) => handleChange({ target: { name: 'Kraken', value: { ...formData.Kraken, Min: e.target.value } } })}
            />
            <Label htmlFor="Kraken_Max">Max</Label>
            <Input
              type="number"
              id="Kraken_Max"
              name="Kraken_Max"
              value={formData.Kraken.Max}
              onChange={(e) => handleChange({ target: { name: 'Kraken', value: { ...formData.Kraken, Max: e.target.value } } })}
            />

            {/* Handle other fields like TransactionFee, NetworkFee, LoginId, and Password as needed */}

            <Button type="submit">Update</Button>
          </Form>
        </Container>
      </Content>
    </DashboardContainer>
  );
};

export default OtherPrice;
//https://crypto-rust-phi.vercel.app/
