import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import axios from "axios"

function DeleteQualification() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
    const[user, setUser] = useState({})

    useEffect(() => {

        const getUser = async () => {
            const res = await axios.get("/auth/user", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
              setUser(res.data);

        }

        getUser()

    }, [token])



    const handleDelete = async(event) => {
        event.preventDefault()

        await axios.delete(`/qualification/owner_delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        window.location.href = `/show_my_qualifications/${user._id}`


    }


    return(<>
    <Container>
    <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
            <p className="text-danger">Are you sure that you would like to delete your qualification?</p>
            <br>
            </br>
            <Button variant="warning" type="submit" onClick={handleDelete}>delete subject</Button>

            </Col>
            </Row>

    </Container>
    
    </>)
}

export default DeleteQualification