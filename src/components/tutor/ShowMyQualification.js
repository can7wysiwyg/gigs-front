import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Card } from "react-bootstrap";

function ShowMyQualification() {


  const state = useContext(GlobalState);
  const token = state.token;

  const [userQualification, setUserQualification] = useState([]);

  useEffect(() => {
    const getSingleUser = async () => {
      const res = await axios.get("https://apigigs.onrender.com/qualification/owner_view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserQualification(res.data.owned);
    };

    getSingleUser();
  }, [token]);

  if (userQualification.length === 0) {
    return (
      <>
        <h1 className="text-center">
          please create your qualifications for better success
        </h1>
        <Link to={`/create_qualification`}>create here</Link>
      </>
    );
  }

  return (
    <>
    <h1 className="text-center">My Qualification(s)</h1>
      {userQualification?.map((userQ, index) => (
        <div style={{padding: "10px"}}>
        <DisplayMyQualification key={index} userQ={userQ} />
        </div>
      ))}
    </>
  );
}

const DisplayMyQualification = ({ userQ }) => {
  const picture = userQ.qualificationImage.data.data;

  const base64String = window.btoa(
    new Uint8Array(picture).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return (
    <div className="col-md-6 mx-auto text-center">
      <Card>
        <Card.Img
          src={`data:image/jpg;base64, ${base64String}`}
          style={{ width: "100%", height: "100%" }}
          variant="top"
        />
        <Card.Body>
          <Card.Title as="div">
            qualification name: {userQ.qualification}
          </Card.Title>
          <Card.Text as="p">my Specialty: {userQ.tutorSpecialty1}</Card.Text>
          <Card.Text as="p"> {userQ.tutorSpecialty2}</Card.Text>
          <Card.Text as="p"> {userQ.tutorSpecialty3}</Card.Text>
          <Card.Link href={`/delete_qualification/${userQ._id}`} className="d-block p-2">
            delete qualification{" "}
          </Card.Link>
          <Card.Link href="/my_profile" className="d-block p-2">
            back to profile{" "}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShowMyQualification;
