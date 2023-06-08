import { useContext,  useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";



function CreateCategory() {

    const state = useContext(GlobalState);
    const token = state.token;

    const[catName, setCatName] = useState("")
    
    const handleChange = (event) => {
        setCatName(event.target.value)
    }


    const handleSubmit = async (event) => {

        event.preventDefault()

        await axios.post("/admin/create_category", {catName}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        window.location.href = '/category_list'

    }

    return(<>

<Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h4>Create Subjects Category </h4>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <hr />
          <Form.Group className="mb-3" controlId="formBasicCreateCategory">
          <Form.Control
                type="text"
                name="catName"
                value={catName}
                onChange={handleChange}
                placeholder="write category name"
              />

</Form.Group>
        
        <Button variant="warning" type="submit">
              Create Category
            </Button>
      

      </Form>
      </Col>
      </Row>
      </Container>
    
    
    
    </>)
}

export default CreateCategory