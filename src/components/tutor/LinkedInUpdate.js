import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function LinkedInUpdate() {
    const state = useContext(GlobalState);
    const token = state.token;
    const[owner] = state.userApi.owner
    const[linkedInLink, setLinkedInLink] = useState("")


    const handleChange = (event) => {
        setLinkedInLink(event.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        
        await axios.put(
          `https://apigigs.onrender.com/user/update_socials/${owner}`,
          { linkedInLink },
          
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
            <h4>update my LinkedIn account </h4>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formlinkedInLink">
              <Form.Control
                  type="text"
                  name="linkedInLink"
                  value={linkedInLink}
                  onChange={handleChange}
                  placeholder=" paste your linkedIn profile link"
                />
                
               
                
              </Form.Group>

              <Button variant="warning" type="submit">
                Update LinkedIn Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



    
    
    </>)
}

export default LinkedInUpdate