import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginBox = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://147.93.20.176:8000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ LoginId:email, Password:password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Login successful!');
                navigate('/admin/dashboard');
                setError('');
                localStorage.setItem('Login', data.Id);
            } else {
                setError(data.message || 'Login failed.');
                setSuccessMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <LoginContainer>
            <LoginBox>
                <Title>Login</Title>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="UserName"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {successMessage && <p>{successMessage}</p>}
                    <Button type="submit">Login</Button>
                </form>
            </LoginBox>
        </LoginContainer>
    );
};

export default AdminLogin;
