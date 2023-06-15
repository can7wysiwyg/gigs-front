import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";


function UploadProfile() {
      const{id} = useParams()
      const[userImage, setUserImage] = useState("")
      const state = useContext(GlobalState);
      const token = state.token;

      const handleSubmit = async(event) => {
        event.preventDefault()

        let formData = new FormData();

        formData.append("userImage", userImage)

        await axios.put(`https://apigigs.onrender.com/user/update_profile_pic/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } )

        window.location.href = "/my_profile"



      }

    return(<>
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>update your profile picture</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicUserImage">
        
                <Form.Control
                  type="file"
                  onChange={event => setUserImage(event.target.files[0])}
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                update your profile picture
              </Button>
              </Form>
              </Col>
              </Row>
              </Container>


    
    
    </>)
}

export default UploadProfile