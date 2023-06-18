import { useContext, useState } from "react";

import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'


function WhatsAppUpdate() {
    const state = useContext(GlobalState);
    const token = state.token;
    const[owner] = state.userApi.owner
    const[whatsappLink, setWhatsAppLink] = useState()


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        
        await axios.put(
          `https://apigigs.onrender.com/user/update_socials/${owner}`,
          { whatsappLink},
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        window.location.href = "/view_my_socials";
      };
    

  

    return(<>
     <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h4>update my WhatsApp account </h4>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formBasicWhatsAppLink">
                
               <PhoneInput placeholder="write your whatsapp number"  name="whatsappLink"
                  value={whatsappLink}
                  onChange={setWhatsAppLink}  /> 

                
              </Form.Group>

              <Button variant="warning" type="submit">
                Update WhatsApp Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    
    
    </>)
}

export default WhatsAppUpdate