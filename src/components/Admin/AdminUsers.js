import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

// Styled components for AdminUsers
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
  margin: 1.5rem 0; /* Margin to ensure spacing */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse; /* Collapse table borders */

  thead {
    background-color: #f1f1f1;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd; /* Add border to table cells */
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

const NestedTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* Collapse table borders */
  margin: 0; /* Remove margin for nested table */
  
  th, td {
    padding: 0.5rem;
    border: none; /* Remove borders for nested table cells */
  }

  th {
    font-weight: normal; /* Different style for nested table header */
    background-color: #f9f9f9;
    text-align: center; /* Center align the header text */
  }

  td {
    text-align: center; /* Center align the data in cells */
  }
`;

const AccountTitle = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const AdminUsers = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const Id = localStorage.getItem("Login");
        if (Id !== "Admin") {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://147.93.20.176:8000/users/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.reverse());
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <DashboardContainer>
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <Section>
                    <Title>Manage Users</Title>
                    <Paragraph>Here you can manage and view all users in the system.</Paragraph>
                    <TableContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>MobileNo</th>
                                    {/* <th>Accounts</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <React.Fragment key={user._id}>
                                        <tr>
                                            <td>{user.Email}</td>
                                            <td>{user.MobileNo}</td>
                                            {/* <td>
                                                {user.Accounts.length > 0 ? (
                                                    <NestedTable>
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Country</th>
                                                                <th>Bank Name</th>
                                                                <th>Account Number</th>
                                                                <th>IFSC</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {user.Accounts.map((account, index) => (
                                                                <tr key={index}>
                                                                    <td>{account.Name}</td>
                                                                    <td>{account.Country}</td>
                                                                    <td>{account.BankName}</td>
                                                                    <td>{account.AccountNumber}</td>
                                                                    <td>{account.IFSC}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </NestedTable>
                                                ) : 'No Accounts'}
                                            </td> */}
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                </Section>
            </Content>
        </DashboardContainer>
    );
};

export default AdminUsers;
