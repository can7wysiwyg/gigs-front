import { Link, useParams } from "react-router-dom"
import { Container, ListGroup } from "react-bootstrap";

function ManageSubject() {
   const {id} = useParams()
    return(<>
     <div className="col-md-6 mx-auto text-center">
    <Container>
      <ListGroup>
       <Link to={`/tutor_update_subject/${id}`}> <ListGroup.Item>update subject </ListGroup.Item> </Link>
       <Link to={`/tutor_delete_subject/${id}`}> <ListGroup.Item>delete subject</ListGroup.Item>  </Link>


      </ListGroup>

    </Container>
    </div>
    
    </>)
}

export default ManageSubject