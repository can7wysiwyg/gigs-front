import { Link, useParams } from "react-router-dom"
import { Container, ListGroup } from "react-bootstrap";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";



function MoreInfo() {
    const {id} = useParams()

   const state = useContext(GlobalState)

   const[isAdmin] = state.userApi.isAdmin

   console.log(isAdmin);

  
    return(<>
    <div className="col-md-6 mx-auto text-center">
    <Container>
      <ListGroup>
      <Link to={`/qualifications_view/${id}`} style={{textDecorationLine: "none"}}> Qualifications </Link>
    { isAdmin === true ? <Link to={`/delete_user/${id}`} style={{textDecorationLine: "none"}}> Delete User </Link> : "" }


      

      </ListGroup>

    </Container>
    </div>
    
    
    
    </>)
}

export default MoreInfo