import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

function UpdateSocials() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const token = state.token;
  const [values, setValues] = useState({
    facebookLink: "",
    twitterLink: "",
    linkedInLink: "",
  });

  const[whatsappLink, setWhatsAppLink] = useState()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    await axios.put(
      `https://apigigs.onrender.com/user/update_socials/${id}`,
      {...values, whatsappLink},
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = "/view_my_socials";
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h4>update your social media account(s) </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFacebookLink">
                <label>*optional</label>
                <Form.Control
                  type="text"
                  name="facebookLink"
                  value={values.facebookLink}
                  onChange={handleChange}
                  placeholder="copy and paste your facebook profile link"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTwitterLink">
                <label>*optional</label>
                <Form.Control
                  type="text"
                  name="twitterLink"
                  value={values.twitterLink}
                  onChange={handleChange}
                  placeholder="copy and paste your twitter profile link"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLinkedInLink">
                <label>*optional</label>
                <Form.Control
                  type="text"
                  name="linkedInLink"
                  value={values.linkedInLink}
                  onChange={handleChange}
                  placeholder="copy and paste your LinkedIn profile link"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicWhatsAppLink">
                
               <PhoneInput placeholder="write your phone number"  name="whatsappLink"
                  value={whatsappLink}
                  onChange={setWhatsAppLink}  /> 

                
              </Form.Group>

              <Button variant="warning" type="submit">
                Update Socials
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateSocials;
