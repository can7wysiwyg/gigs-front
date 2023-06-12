import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

function MyTutoringService() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getMyServices = async () => {
      const res = await axios.get("/subject/owner_view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data.subjects);
    };

    getMyServices();
  }, [token]);

  if (subjects.length === 0) {
    return (
      <>
        <h1 className="text-center">
          {" "}
          you have not made any tutoring post(s){" "}
        </h1>
        <Link to="/post_tutor_service">click here to make one...</Link>
      </>
    );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>my tutoring subjects</h1>
      <div style={{ padding: "10px" }}>
        <Row>
          {subjects?.map((subject, index) => (
            <Col key={index} sm={4} >
              <DisplayMyServices subject={subject} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

const DisplayMyServices = ({ subject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  const {subjectCommentary} = subject

  
  const maxChars = 20

  const shouldShowSeeMore = subjectCommentary.length > maxChars;


  return (
    <>

<div className="card" >
  <div className="card-body">
    <h5 className="card-title">{subject.subjectName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">MK{subject.subjectPrice}</h6>
    <p className="card-text">

    {isExpanded ? subjectCommentary : subjectCommentary.slice(0, maxChars)}
        {shouldShowSeeMore && (
          <span onClick={toggleExpansion}>
            {isExpanded ? `` : <a href={`/post_single/${subject._id}`}>see more</a> }
          </span>
        )}

    </p>
    <a href={`/person_profile/${subject.subjectOwner}`} className="card-link">back to profile</a>
    
  </div>
</div>



    </>
  );
};

export default MyTutoringService;
