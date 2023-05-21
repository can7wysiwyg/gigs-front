import { Link, useParams } from "react-router-dom"
import { Container, ListGroup } from "react-bootstrap";

function TutorUpdateSubject() {
   const {id} = useParams()
    return(<>
     <div className="col-md-6 mx-auto text-center">
    <Container>
      <ListGroup>
       <Link to={`/tutor_update_commentary/${id}`}> <ListGroup.Item>update subject commentary </ListGroup.Item> </Link>
       <Link to={`/tutor_update_name/${id}`}> <ListGroup.Item>update subject name</ListGroup.Item>  </Link>
       <Link to={`/tutor_update_price/${id}`}> <ListGroup.Item>update subject price</ListGroup.Item>  </Link>



      </ListGroup>

    </Container>
    </div>
    
    </>)
}

export default TutorUpdateSubject