import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState"
import axios from "axios"
import { Card } from "react-bootstrap";


function QualificationsView() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const[users] = state.usersApi.users
    const[user, setUser] = useState({})
    const [userQualifications, setUserQualifications] = useState([]);


    useEffect(() => {
        if(id) {
            users?.forEach((person) => {
                if(person._id === id) setUser(person)
            })
        }

    }, [id, users])

    useEffect(() => {

        const getQualis = async() => {
            const res = await axios.get(`/qualification/show_all/${id}`)

            setUserQualifications(res.data.owner);

        }

        getQualis()

    }, [id])

    if(userQualifications.length === 0) {
        return(<>
        <h1 className="text-center">{user.fullname} has no qualifications</h1>
        
        </>)
    }

    


    return(<>
    <h4>these are qualifications of <span style={{color: "red"}}> {user.fullname} </span> </h4>

    {
        userQualifications?.map((userQualification, index) => (
            <div key={index}>
            <DisplayToVisitor userQualification={userQualification} />
            </div>
        ))
    }
    </>)
}


const DisplayToVisitor = ({userQualification}) => {
    const{id} = useParams()

    if(Object.keys(userQualification).length < 10) {
        alert("something wrong happened. please contact us to solve this issue..")
    } 

    const picture = userQualification.qualificationImage.data.data;

  const base64String = window.btoa(
    new Uint8Array(picture).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );


    return(<>
    <div className="col-md-6 mx-auto text-center">
      <Card>
        <Card.Img
          src={`data:image/jpg;base64, ${base64String}`}
          style={{ width: "100%", height: "100%" }}
          variant="top"
        />
        <Card.Body>
          <Card.Title as="div">
            qualification name: {userQualification.qualification}
          </Card.Title>
          <Card.Text as="p">my Specialty: {userQualification.tutorSpecialty1}</Card.Text>
          <Card.Text as="p"> {userQualification.tutorSpecialty2}</Card.Text>
          <Card.Text as="p"> {userQualification.tutorSpecialty3}</Card.Text>
            <Card.Link href={`/person_profile/${id}`} className="d-block p-2">
            back to profile{" "}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
    
    
    
    </>)
}

export default QualificationsView