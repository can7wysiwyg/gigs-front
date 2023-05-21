import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";


function Register() {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    securityAnswer: "",
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post("/auth/register", { ...values });

    localStorage.setItem("firstLogin", true);

    alert(res.data.msg);

    window.location.href = "/login";
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h4>Register For An Account To Post For Your Tutoring Services </h4>
          <Form onSubmit={handleSubmit}>
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
                placeholder="enter your username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Control
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder="enter your phone number"
              />
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
