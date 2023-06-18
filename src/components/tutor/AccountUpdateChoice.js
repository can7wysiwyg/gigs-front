import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";



function AccountUpdateChoice() {
    return(<>
    <div className="col-md-6 mx-auto text-center">
        <Container>
            <ListGroup>
            <Link to={`/user_update_socials`}> <ListGroup.Item>update all my social media accounts </ListGroup.Item> </Link>
       <Link to={`/whatsapp_update`}> <ListGroup.Item>Update WhatsApp Account</ListGroup.Item>  </Link>
       <Link to={`/facebook_update`}> <ListGroup.Item>Update Facebook Account</ListGroup.Item>  </Link>
       <Link to={`/twitter_update`}> <ListGroup.Item>Update Twitter Account</ListGroup.Item>  </Link>
       <Link to={`/linkedin_update`}> <ListGroup.Item>Update linkedIn Account</ListGroup.Item>  </Link>






            </ListGroup>



        </Container>




    </div>
    
    
    
    </>)
}

export default AccountUpdateChoice