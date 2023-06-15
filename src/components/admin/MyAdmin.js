import { useContext, useEffect, useState } from "react";
import "./personProfile.css";
import { GlobalState } from "../../GlobalState";



function MyAdmin() {
    const[user, setUser] = useState({})
    const state = useContext(GlobalState)
    const[users] = state.usersApi.users
    const[owner] = state.userApi.owner

    useEffect(() => {
        if(owner) {
            users?.forEach((person) => {
                if(person._id === owner) setUser(person)
            })
        }

    }, [owner, users])


    
if(Object.keys(user).length <= 0 ) {
    return(<>
    <p>😉😉😁 admin is loading</p>
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
    <div className="container mt-4 mb-4 p-4 d-flex justify-content-center body">
    
    <div >
        
        <div className="col-md-7">
            
            <div className="card p-3 py-4 blanket">
                
                <div className="text-center">
                    <img src={`data:image/jpg;base64, ${base64String}`} alt="imagio" width="100" className="rounded-circle" />
                </div>
                
                <div className="text-center mt-3">
                   
                    <h5 className="mt-2 mb-0"> {user.fullname} </h5>
                    <span>Admin</span>
                    
                    {/* <p className="mt-2 mb-0">{user.phoneNumber}</p>

                    
                    
                     <ul className="social-list">
                        <li>  <a href={user.facebookLink}> <i className="fa fa-facebook-f"></i> </a>  </li>
                        <li>  <a href={`https://wa.me/${user.whatsappLink}`}>  <i className="fa fa-whatsapp"></i> </a> </li>
                        <li>  <a href={user.linkedInLink}>  <i className="fa fa-linkedin"></i> </a>   </li>
                        <li> <a href={user.twitterLink}>  <i className="fa fa-twitter"></i> </a>  </li>
                       
                    </ul> */}
                   
                    <div className=" butts">
                  
                        
                      
                    </div>
          

              
                    
                </div>
                
               
                
                
            </div>
            
        </div>
        
    </div>
    
</div>
    
    
    </>)
}

export default MyAdmin