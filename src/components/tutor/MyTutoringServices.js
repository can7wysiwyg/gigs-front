import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

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
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <DisplayMyServices subject={subject} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

const DisplayMyServices = ({ subject }) => {
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
          <Card.Link href={`/manage_subject/${subject._id}`}>
            manage subject{" "}
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyTutoringService;
