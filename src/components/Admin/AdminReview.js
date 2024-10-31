import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './Sidebar';


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

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    resize: vertical; /* Allow vertical resizing */
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const ReviewList = styled.ul`
    list-style: none;
    padding: 0;
`;

const ReviewItem = styled.li`
    background-color: #f9f9f9;
    padding: 15px;
    margin: 10px 0;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ReviewTitle = styled.h3`
    margin: 0;
    color: #333;
`;

const ReviewQuote = styled.p`
    font-style: italic;
    color: #555;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ReviewImage = styled.img`
    width: 100px;
`;

const AdminReview = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ Name: '', Title: '', Quote: '' });
    const [image, setImage] = useState(null)
    const [editId, setEditId] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8000/reviews/all');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataMain = new FormData();
        formDataMain.append('Name', formData.Name);
        formDataMain.append('Title', formData.Title);
        formDataMain.append('Quote', formData.Quote);
        if (image) {
            formDataMain.append('Image', image); // Include QRCode if uploaded
        }
        try {
            if (editId) {
                await axios.put(`http://localhost:8000/reviews/update/${editId}`, formDataMain);
            } else {
                await axios.post('http://localhost:8000/reviews/add', formDataMain);
            }
            setFormData({ Name: '', Title: '', Quote: '' });
            setEditId(null);
            fetchReviews();
        } catch (error) {
            console.error('Error saving review:', error);
        }
    };

    const handleEdit = (review) => {
        setFormData({ Name: review.Name, Title: review.Title, Quote: review.Quote });
        setEditId(review._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/reviews/delete/${id}`);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <DashboardContainer>
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <Container>
                    <Title>Reviews</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Input
                            type="text"
                            name="Title"
                            value={formData.Title}
                            onChange={handleChange}
                            placeholder="Title"
                            required
                        />
                        <Textarea
                            name="Quote"
                            value={formData.Quote}
                            onChange={handleChange}
                            placeholder="Message"
                            rows="4"
                            required
                        />
                        <Button type="submit">{editId ? 'Update Review' : 'Add Review'}</Button>
                    </Form>

                    <ReviewList>
                        {reviews.map((review) => (
                            <ReviewItem key={review._id}>
                                <div style={{display:"flex", gap:"16px"}}>
                                    <ReviewImage src={`http://localhost:8000/uploads/${review.Image}`} alt={review.Name} />
                                    <div>
                                        <ReviewTitle>{review.Name}</ReviewTitle>
                                        <ReviewQuote style={{ fontStyle: "italic", fontSize: "13px" }}>{review.Title}</ReviewQuote>
                                        <ReviewQuote>{review.Quote}</ReviewQuote>
                                    </div>
                                </div>
                                <ButtonGroup>
                                    <Button onClick={() => handleEdit(review)}>Edit</Button>
                                    <Button onClick={() => handleDelete(review._id)}>Delete</Button>
                                </ButtonGroup>
                            </ReviewItem>
                        ))}
                    </ReviewList>
                </Container>
            </Content>
        </DashboardContainer>
    );
};

export default AdminReview;
