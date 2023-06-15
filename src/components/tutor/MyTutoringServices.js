import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import _ from "lodash"


const pageSize = 3;


function MyTutoringService() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [subjects, setSubjects] = useState([]);
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const getMyServices = async () => {
      const res = await axios.get("https://apigigs.onrender.com/subject/owner_view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data.subjects);
      setPaginated(_(res.data.subjects).slice(0).take(pageSize).value());

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

  const pageCount = subjects ? Math.ceil(subjects.length / pageSize) : 0;



  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(subjects).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }


  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>my tutoring subjects</h1>
      <div style={{ padding: "10px" }}>
        <Row>
          {paginated?.map((subject, index) => (
            <Col key={index} sm={4} >
              <DisplayMyServices subject={subject} />
            </Col>
          ))}

<nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
            <p className="page-link" onClick={() => pagination(page)} > {page} </p>
            </li>
          ))}
        </ul>
      </nav>


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

  
  const maxChars = 90

  const shouldShowSeeMore = subjectCommentary.length > maxChars;


  return (
    <>

<div className="card" style={{width: "16rem"}} >
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
    <a href={`/manage_subject/${subject._id}`} className="card-link">manage subject</a>
    
  </div>
</div>



    </>
  );
};

export default MyTutoringService;
