import { Link, useParams } from "react-router-dom"
import { Container, ListGroup } from "react-bootstrap";

function ManageProfile() {
   const {id} = useParams()
    return(<>
     <div className="col-md-6 mx-auto text-center">
    <Container>
      <ListGroup>
       <Link to={`/user_upload_profile/${id}`}> <ListGroup.Item>update profile picture </ListGroup.Item> </Link>
       <Link to={`/user_update_socials/${id}`}> <ListGroup.Item>update my social media accounts</ListGroup.Item>  </Link>


      </ListGroup>

    </Container>
    </div>
    
    </>)
}

export default ManageProfile