import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./home.css";
import moment from "moment/moment";
import _ from "lodash"
import { Link } from "react-router-dom";
const { useEffect, useContext, useState } = require("react");


const pageSize = 8;


function Home() {
  const [posts, setPosts] = useState([]);
  const [paginated, setPaginated] = useState();
 

  const [currentPage, setCurrentPage] = useState(1);



    


  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("https://apigigs.onrender.com/subject/show_all");

      setPosts(res.data.subject);
      setPaginated(_(res.data.subject).slice(0).take(pageSize).value());
        
    };

    getPosts();
  }, []);


 
  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;



  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(posts).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }






  if (posts.length === 0) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          please wait 😉😉😍. as posts load...{" "}
        </h1>
      </>
    );
  }

  
  return (
    <>
   
    
      {paginated?.map((post, index) => (
        <ShowOurPosts key={index} post={post} />
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

    </>
  );
}

const ShowOurPosts = ({ post }) => {
  const state = useContext(GlobalState);
  const [users] = state.usersApi.users;
  const [person, setPerson] = useState({});

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  useEffect(() => {
    if (post.subjectOwner) {
       
      users.forEach((user) => {
        if (user._id === post.subjectOwner) setPerson(user);
      });
    }
  }, [post.subjectOwner, users]);


  function displayz() {
    if(Object.keys(person).length < 15 ) {

      return(
  
  <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-6">
          <div className="mycard">
            <div className="d-flex justify-content-between p-2 px-3">
              <div className="d-flex flex-row align-items-center">
                {" "}
               
                <div className="d-flex flex-column ml-2">
                  {" "}
                  <a href={`/person_profile/${person._id}`} className="card-link">  <span className="font-weight-bold">{person.fullname}</span> </a> {" "}
                  <small className="text-primary">tutor</small>{" "}
                </div>
              </div>
              <div className="d-flex flex-row mt-1 ellipsis">
                {" "}
                <small className="mr-2">{ moment(post.updatedAt).startOf('hour').fromNow()}</small>{" "}
                
              </div>
            </div>{" "}
          
            <div className="p-2">
            <h4 className="text-justify">
            <Link to={`/post_single/${post._id}`} style={{textDecorationLine: "none"}}>  {post.subjectName} </Link>
              </h4>
              <span className="text-justify">MK{post.subjectPrice}</span>
              <p className="text-justify">
                {post.subjectCommentary }
              </p>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row icons d-flex align-items-center">
                  {" "}
                  
                </div>
                <div className="d-flex flex-row muted-color">
                  {" "}
                  
                </div>
              </div>
              <hr />
            
            </div>
          </div>
        </div>
      </div>
      )
  
      }

     
      if(Object.keys(person).length <=  100) {

        const picture = person.userImage.data.data

const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const {subjectCommentary} = post
  const maxChars = 90

  const shouldShowSeeMore = subjectCommentary.length > maxChars;

  
        return(<>
        
        
    <div className="row d-flex align-items-center justify-content-center">
      <div className="col-md-6">
        <div className="mycard">
          <div className="d-flex justify-content-between p-2 px-3">
            <div className="d-flex flex-row align-items-center">
              {" "}
              <img
                src={`data:image/jpg;base64, ${base64String}`}
                alt={person.fullname}
                width="50"
                className="rounded-circle"
              />
              <div className="d-flex flex-column ml-2">
                {" "}
                <a href={`/person_profile/${person._id}`} className="card-link">   <span className="font-weight-bold">  {person.fullname}   </span> </a> {" "}
                <small className="text-primary">{ moment(post.updatedAt).format('LLLL')} </small>{" "}
              </div>
            </div>
            
          </div>{" "}
        
          <div className="p-2">
          <h4 className="text-justify">
             <Link to={`/post_single/${post._id}`} style={{textDecorationLine: "none"}}> {post.subjectName} </Link>
            </h4>
            <span className="text-justify">MK{post.subjectPrice}</span>
            <p className="text-justify">
            
            {isExpanded ? subjectCommentary : subjectCommentary.slice(0, maxChars)}
        {shouldShowSeeMore && (
          <span onClick={toggleExpansion}>
            {isExpanded ? `` : <a href={`/post_single/${post._id}`}>see more</a> }
          </span>
        )}

            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row icons d-flex align-items-center">
                {" "}
                
              </div>
              <div className="d-flex flex-row muted-color">
                {" "}
                
              </div>
            </div>
            <hr />
          
          </div>
        </div>
      </div>
    </div>           
        </>)
      }
  
  
  
  
  

  }





  



  return (<>
  
  {displayz()}
  
  </>
     );
};

export default Home;