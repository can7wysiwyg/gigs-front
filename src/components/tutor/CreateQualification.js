import axios from "axios";
import { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function CreateQualification() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [qualificationn, setQualification] = useState({
    qualification: "",
    tutorSpecialty1: "",
    tutorSpecialty2: "",
    tutorSpecialty3: "",
  });

  const [qualificationImage, setQualificationImage] = useState("");


  const handleChangeInput = (event) => {

    const { name, value } = event.target;
    setQualification({ ...qualificationn, [name]: value });
  
};

const handleSubmit = async (event) => {
    event.preventDefault();

    

    let formData = new FormData();

    formData.append("qualification", qualificationn.qualification);
    formData.append("tutorSpecialty1", qualificationn.tutorSpecialty1);
    formData.append("tutorSpecialty2", qualificationn.tutorSpecialty2);
    formData.append("tutorSpecialty3", qualificationn.tutorSpecialty3 );
    formData.append("qualificationImage", qualificationImage);
    
    const res = await axios.post("https://apigigs.onrender.com/qualification/create_qualification", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(res.data.msg);
    window.location.href = "/my_services";
  };




  return(<>
   <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicQualificationImage">
                <Form.Label>upload your qualification image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={event => setQualificationImage(event.target.files[0])}
                required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicQualification">
                
                <Form.Control
                  type="text"
                  name="qualification"
                  value={ qualificationn.qualification }
                  onChange={handleChangeInput}

                  placeholder="write about the field of your skills e.g sciences"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTutorSpecialty1">
                
                <Form.Control
                  type="text"
                  name="tutorSpecialty1"
                  value={qualificationn.tutorSpecialty1}
                  onChange={handleChangeInput}
                
                  placeholder="write your main specialty e.g mathematics"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTutorSpecialty2">
                
                <Form.Control
                  type="text"
                  name="tutorSpecialty2"
                  value={qualificationn.tutorSpecialty2}
                  onChange={handleChangeInput}
                
                  placeholder="write your second optional specialty e.g english"
                
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTutorSpecialty3">
                
                <Form.Control
                  type="text"
                  name="tutorSpecialty3"
                  value={qualificationn.tutorSpecialty3}
                  onChange={handleChangeInput}
                
                  placeholder="write your third optional specialty e.g chichewa"
                  
                />
              </Form.Group>

              <Button variant="warning" type="submit">
                create your qualification
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>


  
  
  
  
  </>);
}

export default CreateQualification;
