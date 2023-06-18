import { Link, useParams } from "react-router-dom"
import { Container, ListGroup } from "react-bootstrap";

function ManageProfile() {
   const {id} = useParams()
    return(<>
     <div className="col-md-6 mx-auto text-center">
    <Container>
      <ListGroup>
       <Link to={`/user_upload_profile/${id}`}> <ListGroup.Item>update profile picture </ListGroup.Item> </Link>
       <Link to={`/account_update`}> <ListGroup.Item>choose social media account to update</ListGroup.Item>  </Link>


      </ListGroup>

    </Container>
    </div>
    
    </>)
}

export default ManageProfile