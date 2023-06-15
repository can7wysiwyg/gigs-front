import { Container,  Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";


function DeleteUser() {
   const {id} = useParams()
   const state = useContext(GlobalState)
   const token = state.token
   
   const deleteUser = async() => {

    await axios.delete(`https://apigigs.onrender.com/admin/delete_user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } )

    window.location.href = "/my_users"

   }



    return(<>
    <Container>
    <Row className="justify-content-md-center text-center">
        <Col xs={12} md={6}>
          <h1 className="text-danger ">Delete User</h1>

          <Button variant="danger" type="submit" onClick={deleteUser}>
              Delete User
            </Button>

          </Col>
          </Row>
      
          </Container>
    
    </>)
}

export default DeleteUser