import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function PostATutorService() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [values, setValues] = useState({
    subjectName: "",
    subjectPrice: "",
    subjectCommentary: "",
    subjectCategory: ""
  });

  const[categories, setCategories] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

useEffect(() => {

const getCats = async() => {

  const res = await axios.get('https://apigigs.onrender.com/admin/show_categories')

  setCategories(res.data.results);

}

getCats()


}, [])


  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(
      "https://apigigs.onrender.com/subject/create_subject",
      { ...values },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = "/my_services";
  };




  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h4>post a tutoring service </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicSubjectName">
                <Form.Control
                  type="text"
                  name="subjectName"
                  value={values.subjectName}
                  onChange={handleChange}
                  placeholder="write the name of the subject"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSubjectPrice">
                <Form.Control
                  type="number"
                  name="subjectPrice"
                  value={values.subjectPrice}
                  onChange={handleChange}
                  placeholder="write how much you are charging"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategories">
                <Form.Label>select subject category</Form.Label>
                <Form.Select
                  name="subjectCategory"
                  value={values.subjectCategory}
                  onChange={handleChange}
                >
                  <option value="">Please select a category</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.catName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            


              <Form.Group className="mb-3" controlId="formBasicLinkedInLink">



              
                <Form.Control
                
                  as="textarea"
                  rows="3"
                  name="subjectCommentary"
                  value={values.subjectCommentary}
                  onChange={handleChange}
                  placeholder="write a short text if this service is negotiable and about how flexible you are in teaching times"
                />
              </Form.Group>

              <Button variant="warning" type="submit">
                Create Tutor Service
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostATutorService;
