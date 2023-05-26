import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import {  Col, Row } from "react-bootstrap";

function SubjectsView() {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState({});
  const state = useContext(GlobalState);
  const [users] = state.usersApi.users;

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`/subject/show_users/${id}`);

      setSubjects(res.data.subjects);
    };

    getPosts();
  }, [id]);

  useEffect(() => {
    if (id) {
      users?.forEach((person) => {
        if (person._id === id) setUser(person);
      });
    }
  }, [id, users]);

  

  return (
    <>
      <div className="container">
        <h3 className="text-center">
          tutoring subjects being offered by{" "}
          <span style={{ color: "red" }}> {user.fullname} </span>
        </h3>
        <div style={{ padding: "10px" }}>
          <Row>
            {subjects?.map((subject, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <DisplayTutorServices subject={subject} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

const DisplayTutorServices = ({ subject }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  const {subjectCommentary} = subject

  
  const maxChars = 20

  const shouldShowSeeMore = subjectCommentary.length > maxChars;


    
  return (
    <>

<div className="card" style={{width: "18rem"}}>
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

export default SubjectsView;
