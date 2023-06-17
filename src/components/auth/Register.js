import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'



function Register() {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    securityAnswer: "",
  });

  const[phoneNumber, setPhoneNumber] = useState("")


  const[userImage, setUserImage] = useState("")

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append("userImage", userImage)
    formData.append("fullname", values.fullname)
    formData.append("username", values.username)
    formData.append("email", values.email)
    formData.append("password", values.password)
    formData.append("phoneNumber", phoneNumber)
    formData.append("securityAnswer", values.securityAnswer)

    

    const res = await axios.post("https://apigigs.onrender.com/auth/register", formData);

    localStorage.setItem("firstLogin", true);

    alert(res.data.msg);

    window.location.href = "/login";
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h4>Register For An Account To Post For Your Tutoring Services </h4>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <hr />
          <Form.Group className="mb-3" controlId="formBasicUserImage">
        <label>upload your profile picture</label>
        <Form.Control
          type="file"
          onChange={event => setUserImage(event.target.files[0])}
        />
      </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicFullname">
              <Form.Control
                type="text"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
                placeholder="enter your fullname"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                pattern=".{6,}"
                title="username should have more than 6 characters"
                placeholder="enter your username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput placeholder="write your phone number"  name="phoneNumber"
                  value={phoneNumber}
                  onChange={setPhoneNumber}  /> 

              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicQuestion">
              <Form.Control
                type="text"
                name="securityAnswer"
                value={values.securityAnswer}
                onChange={handleChange}
                placeholder="enter your favourite word to help in password reset "
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                name="password"
                value={values.password}
                onChange={ handleChange}
                pattern=".{8,}"
                title="password should have more than 8 characters"
                placeholder="enter your password"
              />
            </Form.Group>
            
            <Button variant="warning" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          have an account?
          <Link to="/login">login</Link>
        </Col>
        <Col className="text-right">
          <Link to="/forgot">Forgot Password</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
