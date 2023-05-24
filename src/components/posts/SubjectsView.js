import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { Card, Col, Row } from "react-bootstrap";

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
    
  return (
    <>
      <Card className="my-3 p-2 rounded   flex-fill h-100  ">
        <Card.Body>
          <Card.Title as="p">
            <strong>{subject.subjectName}</strong>
          </Card.Title>

          <Card.Text as="p">
            <strong>MK {subject.subjectPrice}</strong>
          </Card.Text>

          <Card.Text as="div">
            <strong>{subject.subjectCommentary}</strong>
          </Card.Text>
          <Card.Link href={`/person_profile/${subject.subjectOwner}`}>back to profile</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SubjectsView;
