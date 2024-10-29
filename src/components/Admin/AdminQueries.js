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
  /* max-width: calc(100vw - 250px); */
  margin-top: 1.5rem;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  max-height: 70vh; /* Limit the height of the container */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px /* Ensure the table has a minimum width for scrolling */
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

const AdminQueries = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const Id = localStorage.getItem("Login");
    if (Id !== "Admin") {
      navigate('/admin/login');
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('https://crypto-tusv.onrender.com/contacts/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactions(data.reverse());
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateStatus = async(que) =>{
    // console.log(que)
    try {
        const response = await fetch(`https://crypto-tusv.onrender.com/contacts/update/${que._id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Status: !que.Status })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        toast.success('Updated Successfully');
        fetchTransactions();
    } catch (error) {
        toast.success('Error while Updating');
        console.error('Error updating transaction status:', error);
      }
  }


  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Content>
        <Section>
          <Title>Your Queries</Title>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>MobileNo</th>
                  <th>Message</th>
                  <th>Resolved</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{transaction.Name}</td>
                    <td>{transaction.Email}</td>
                    <td>{transaction.MobileNo}</td>
                    <td>{transaction.Message}</td>
                    <td>{transaction.Status?"Complete":"Pending"}</td>
                    <td>{transaction.Status?<Button onClick={()=>updateStatus(transaction)}>Mark as Pending</Button>:<Button onClick={()=>updateStatus(transaction)}>Mark as Done</Button>}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Section>
        <ToastContainer/>
      </Content>
    </DashboardContainer>
  );
};

export default AdminQueries;
