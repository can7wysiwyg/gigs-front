import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function FacebookUpdate() {
    const state = useContext(GlobalState);
    const token = state.token;
    const[owner] = state.userApi.owner
    const[facebookLink, setFacebookLink] = useState("")


    const handleChange = (event) => {
        setFacebookLink(event.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        
        await axios.put(
          `https://apigigs.onrender.com/user/update_socials/${owner}`,
          { facebookLink },
          
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
            <h4>update my Facebook account </h4>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formBasicfacebookLink">
              <Form.Control
                  type="text"
                  name="facebookLink"
                  value={facebookLink}
                  onChange={handleChange}
                  placeholder=" paste your facebook profile link"
                />
                
               
                
              </Form.Group>

              <Button variant="warning" type="submit">
                Update Facebook Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



    
    
    </>)
}

export default FacebookUpdate