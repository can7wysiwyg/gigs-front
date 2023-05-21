import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function TutorUpdateSubjectPrice() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const[subjectPrice, setSubjectPrice] = useState("")

    const handleChange = (event) => {
        setSubjectPrice(event.target.value)
    }

    
      const handleSubmit = async(event) => {
             event.preventDefault()



             await axios.put(`/subject/edit_subject/${id}`, {subjectPrice}, {
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
              
            
                <Form.Control
                  type="text"
                  name="subjectPrice"
                  value={subjectPrice}
                  onChange={handleChange}
                  placeholder="write new price"
                required/>
              <Button variant="warning" type="submit">
                Update Subject Price
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    
    
    </>)
}

export default TutorUpdateSubjectPrice