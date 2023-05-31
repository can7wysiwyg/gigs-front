import { useContext, useEffect, useState } from "react";
import "./personProfile.css";
import { GlobalState } from "../../GlobalState";
import { Link, useParams } from "react-router-dom";



function ViewUser() {

    const[user, setUser] = useState({})
    const state = useContext(GlobalState)
    const[users] = state.usersApi.users
    const{id} = useParams()

    useEffect(() => {
        if(id) {
            users?.forEach((person) => {
                if(person._id === id) setUser(person)
            })
        }

    }, [id, users])

  
    
if(Object.keys(user).length <= 0 ) {
    return(<>
    <p>😉😉😁 user is loading</p>
    </>)
}
    

const picture = user.userImage.data.data ;

const base64String = window.btoa(
  new Uint8Array(picture).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  )
);




    return(<>

<div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              {" "}
              <img
                src={`data:image/jpg;base64, ${base64String}`}
                alt="profilePic"
                height="100"
                width="100"
              />
            </button>
            <span className="name mt-3">{user.fullname}</span>
            <span className=" mt-3">  <i className="fa fa-phone"></i> {user.phoneNumber}</span>
            <span className=" mt-3">  <i className="fa fa-envelope"></i> {user.email}</span>
         <Link to={`/qualifications_view/${user._id}`} style={{textDecorationLine: "none"}}> 
           <span className="idd">Qualifications</span> </Link>

           <Link to={`/delete_user/${user._id}`} style={{textDecorationLine: "none"}}> 
           <span className="idd">Delete User</span> </Link>

            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            </div>{" "}
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
             <Link to={`/subjects_view/${user._id}`} style={{textDecorationLine: "none"}}> <span className="number">
                Tutor's Subjects 
              </span>
              </Link>
            </div>
                      
                      
             <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              {" "}
              <span>
              <a href={user.twitterLink}>  <i className="fa fa-twitter"></i> </a>
              </span>{" "}
              <span>
              <a href={user.facebookLink}> <i className="fa fa-facebook-f"></i> </a>
              </span>{" "}
              <span>
              <a href={`https://wa.me/${user.whatsappLink}`}>  <i className="fa fa-whatsapp"></i> </a>
              </span>{" "}
              <span>
              <a href={user.linkedInLink}>  <i className="fa fa-linkedin"></i> </a>
              </span>{" "}
            </div>{" "}
          
          </div>{" "}
        </div>
      </div>
    
    
    </>)
}

export default ViewUser