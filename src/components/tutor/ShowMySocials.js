import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../GlobalState"
import { ListGroup, Container } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"


function ShowMySocials() {
    const state= useContext(GlobalState)
    const token = state.token
    const[user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get("https://apigigs.onrender.com/auth/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            setUser(res.data);
          };
      
          getUser();


    }, [token])


    return(<>
    <div className="col-md-6 mx-auto text-center">
    <Container>
      <ListGroup>
    <Link to={user.facebookLink}>    <ListGroup.Item>Facebook: {user.facebookLink} </ListGroup.Item> </Link>
    <Link to={user.twitterLink}>   <ListGroup.Item>Twitter: {user.twitterLink}</ListGroup.Item> </Link>
    <Link to={user.linkedInLink}>   <ListGroup.Item>LinkedIn: {user.linkedInLink}</ListGroup.Item>  </Link>
    <Link to={`https://wa.me/${user.whatsappLink}`}>  <ListGroup.Item>WhatsApp: +{user.whatsappLink}</ListGroup.Item> </Link>



      </ListGroup>

      <Link to="/my_profile">back to profile</Link>

    </Container>
    </div>
    
    
    </>)
}

export default ShowMySocials