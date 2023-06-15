import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import {  Col, Row } from "react-bootstrap";
import _ from "lodash"


const pageSize = 3;


function SubjectsView() {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState({});
  const state = useContext(GlobalState);
  const [users] = state.usersApi.users;
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`https://apigigs.onrender.com/subject/show_users/${id}`);

      setSubjects(res.data.subjects);
      setPaginated(_(res.data.subjects).slice(0).take(pageSize).value());
      
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


  const pageCount = subjects ? Math.ceil(subjects.length / pageSize) : 0;



  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(subjects).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }


  

  return (
    <>
      <div className="container">
        <h3 className="text-center">
          tutoring subjects being offered by{" "}
          <span style={{ color: "red" }}> {user.fullname} </span>
        </h3>
        <div style={{ padding: "10px" }}>

          <Row>
            {paginated?.map((subject, index) => (
              <Col key={index} sm={4}   >
                <DisplayTutorServices subject={subject} />
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
    </>
  );
}

const DisplayTutorServices = ({ subject }) => {

  const state = useContext(GlobalState);
  const[owner] = state.userApi.owner

  

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  const {subjectCommentary} = subject

  
  const maxChars = 20

  const shouldShowSeeMore = subjectCommentary.length > maxChars;


    
  return (
    <>

<div className="card"  style={{width: "16rem"}}>
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
   { owner === subject.subjectOwner ? <a href={`/manage_subject/${subject._id}`} className="card-link">manage subject</a>  : <a href={`/person_profile/${subject.subjectOwner}`} className="card-link">back to profile</a> }
    
  </div>
</div>


      
    </>
  );
};

export default SubjectsView;
