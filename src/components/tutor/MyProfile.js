import { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Card } from "react-bootstrap";


function MyProfile() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [user, setUser] = useState([]);
 


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    };

    getUser();
  }, [token]);

  if (user.length === 0) return null;

  if( Object.keys(user).length !== 15 ) {
    return(<>
    <div className="col-md-6 mx-auto text-center">

<Card >
  
<Card.Body>
<Card.Link href={`/user_upload_profile/${user._id}`} >upload profile picture</Card.Link>  
<Card.Title as="div">{user.fullname}</Card.Title>
<Card.Text as="p">username: {user.username}</Card.Text>
<Card.Text as="p">email: {user.email}</Card.Text>
<Card.Text as="p">phone number: {user.phoneNumber}</Card.Text>
<Card.Text as="p">security answer: {user.securityAnswer}</Card.Text>
<Card.Link href={`/show_my_qualifications/${user._id}`} className="d-block p-2" >view my qualifications </Card.Link>
<Card.Link href={`/manage_my_profile/${user._id}`} className="d-block p-2" >manage my profile </Card.Link>



</Card.Body>

</Card>







  </div>
    

    </>)
  }
  



  const picture = user.userImage.data.data ;

  const base64String = window.btoa(
    new Uint8Array(picture).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );



 
  return <div className="col-md-6 mx-auto text-center">

<Card >
 <Card.Img src={`data:image/jpg;base64, ${base64String}`} style={{width: "100%", height: "100%"}} variant="top" /> 
<Card.Body>
<Card.Title as="div">{user.fullname}</Card.Title>
<Card.Text as="p">username: {user.username}</Card.Text>
<Card.Text as="p">email: {user.email}</Card.Text>
<Card.Text as="p">phone number: {user.phoneNumber}</Card.Text>
<Card.Text as="p">security answer: {user.securityAnswer}</Card.Text>
<Card.Link href={`/show_my_qualifications/${user._id}`} className="d-block p-2" >view my qualifications </Card.Link>
<Card.Link href={`/manage_my_profile/${user._id}`} className="d-block p-2" >manage my profile </Card.Link>
<Card.Link href={"/view_my_socials"} className="d-block p-2" >my social media accounts </Card.Link>


</Card.Body>

</Card>







  </div>;
}

export default MyProfile;
