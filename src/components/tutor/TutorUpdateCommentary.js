import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function TutorUpdateCommentary() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const[subjectCommentary, setSubjectCommentary] = useState("")

    const handleChange = (event) => {
        setSubjectCommentary(event.target.value)
    }

    
      const handleSubmit = async(event) => {
             event.preventDefault()



             await axios.put(`https://apigigs.onrender.com/subject/edit_subject/${id}`, {subjectCommentary}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             })
             window.location.href="/my_services"

      }

     
    


    return(<>
     <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h4>update a tutoring service </h4>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formBasicLinkedInLink">
                <label>*optional</label>
                <Form.Control
                
                  as="textarea"
                  rows="3"
                  name="subjectCommentary"
                  value={subjectCommentary}
                  onChange={handleChange}
                  placeholder="write a short text if this service is negotiable and about how flexible you are in teaching times"
                required/>
              </Form.Group>

              <Button variant="warning" type="submit">
                Update Tutor Service
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    
    
    </>)
}

export default TutorUpdateCommentary