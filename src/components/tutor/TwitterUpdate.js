import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function TwitterUpdate() {
    const state = useContext(GlobalState);
    const token = state.token;
    const[owner] = state.userApi.owner
    const[twitterLink, setTwitterLink] = useState("")


    const handleChange = (event) => {
        setTwitterLink(event.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        
        await axios.put(
          `https://apigigs.onrender.com/user/update_socials/${owner}`,
          { twitterLink },
          
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
            <h4>update my Twitter account </h4>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formtwitterLink">
              <Form.Control
                  type="text"
                  name="twitterLink"
                  value={twitterLink}
                  onChange={handleChange}
                  placeholder=" paste your twitter profile link"
                />
                
               
                
              </Form.Group>

              <Button variant="warning" type="submit">
                Update Twitter Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



    
    
    </>)
}

export default TwitterUpdate