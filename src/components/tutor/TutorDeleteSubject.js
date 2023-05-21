import { useContext } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import axios from "axios"

function TutorDeleteSubject() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token

    const handleDelete = async(event) => {
        event.preventDefault()

        await axios.delete(`/subject/delete_subject/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        window.location.href = "/my_services"


    }


    return(<>
    <Container>
    <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
            <h3 className="text-danger">Are you sure that you would like to delete this subject?</h3>
            <br>
            </br>
            <Button variant="warning" type="submit" onClick={handleDelete}>delete subject</Button>

            </Col>
            </Row>

    </Container>
    
    </>)
}

export default TutorDeleteSubject