import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import contact from '../assets/contact.png';
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ChevronLeft } from "lucide-react";

const ContactUsContainer = styled.div`
  background-color: black;
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding-top: 60px;

`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Para = styled.p`
  width: 100%;
  text-align: center;
  @media (max-width: 480px) {
  text-align: left;

  }

`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }
`;

const IllustrationSection = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex: 1;
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const Illustration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Person = styled.div`
  background-image: url(${contact});
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Description = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  display: flex;
  justify-content: center;
`;

const Info = styled.p`
  width: 100%;
  text-align: center;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 500px;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 0.5rem;
  font-size: 17px;
  border: none;
  border-radius: 25px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const Label = styled.label`
  margin-bottom: 1.3rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  div{
    display: flex;
    flex-direction: row;
  }
`;

const Asterisk = styled.span`
  color: red;
  margin-right: 4px;
`;

const OptionalText = styled.span`
  color: lightgrey;
  font-size: 0.9rem;
  margin-left: 4px;
`;

const Text = styled.textarea`
  height: 100px;
  margin-top: 10px;
  padding: 0.5rem;
  border: none;
  font-size: 17px;
  border-radius: 15px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const SubmitButton = styled.button`
  background-color: #fbbf24;
  color: black;
  border: none;
  padding: 0.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  max-width: 200px;
  align-self: center;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #ffa500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    MobileNo: "",
    Message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Name.trim()) {
      newErrors.Name = "Name is required";
    }

    if (!formData.Email.trim()) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Invalid email format";
    }

    if (!formData.MobileNo.trim()) {
      newErrors.MobileNo = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.MobileNo)) {
      newErrors.MobileNo = "Invalid phone number (10 digits required)";
    }

    // if (!formData.Message.trim()) {
    //   newErrors.Message = "Message is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://crypto-backend-main.onrender.com/contacts/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          //console.log("Form submitted successfully");
          setFormData({ Name: "", Email: "", MobileNo: "", Message: "" });
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
        } else {
          console.error("Form submission failed");
          // You might want to add an error message for the user here
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // You might want to add an error message for the user here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <ContactUsContainer>
      <Title>
          <BackButton onClick={() => window.history.back()}>
            <ChevronLeft />
          </BackButton>
          <Para>Contact Us</Para>
        </Title>
        <Content>
          <IllustrationSection>
            <Illustration>
              <Person></Person>
            </Illustration>
            <Description>
              <Info>
                We're here to assist you with any inquiries or concerns you may
                have. Whether you have questions about account registration, deposit
                and withdrawal processes, trading features, or anything else related
                to our platform, our dedicated support team is ready to help.
              </Info>
            </Description>
          </IllustrationSection>
          <FormSection>
            <Form onSubmit={handleSubmit}>
              <Label>
                <div>
              Name&nbsp;<Asterisk>*</Asterisk>
              </div>
                <Input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  // required
                />
                {errors.Name && <ErrorMessage>{errors.Name}</ErrorMessage>}
              </Label>
              <Label>
                <div>
            Email&nbsp;<Asterisk>*</Asterisk></div>
                <Input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  // required
                />
                {errors.Email && <ErrorMessage>{errors.Email}</ErrorMessage>}
              </Label>
              <Label>
                <div>
                Contact no&nbsp;<Asterisk>*</Asterisk>
                </div>
                <Input
                  type="tel"
                  name="MobileNo"
                  placeholder="Phone"
                  value={formData.MobileNo}
                  onChange={handleChange}
                  required
                />
                {errors.MobileNo && <ErrorMessage>{errors.MobileNo}</ErrorMessage>}
              </Label>
              <Label>
                <div>
                Message<OptionalText>(optional)</OptionalText></div>
                <Text
                  name="Message"
                  placeholder="Message"
                  value={formData.Message}
                  onChange={handleChange}
                />
                {errors.Message && <ErrorMessage>{errors.Message}</ErrorMessage>}
              </Label>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </SubmitButton>
            </Form>
            {showSuccess && (
              <SuccessMessage>
                <h3>Your form has been successfully submitted</h3>
                <p>Thank You for reaching out to Moon Pay. We will take absolute Pleasure to assist you. Our Customer Executive will contact you soon.</p>
              </SuccessMessage>
            )}
          </FormSection>
        </Content>
      </ContactUsContainer>
      {/* <Footer /> */}
    </>
  );
};

export default ContactUs;
