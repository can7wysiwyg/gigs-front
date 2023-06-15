import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import "./home.css";

function ItemsFromCat() {
const{id} = useParams()
const [posts, setPosts] = useState([]);

useEffect(() => {

    const getItems = async() => {

        const res = await axios.get(`https://apigigs.onrender.com/subject/show_single_cat/sc?cat=${id}`)

        setPosts(res.data.subjectsCat);

    }

    getItems()

}, [id])


if(posts.length === 0) {
    return(<>
    <h1 className="text-center"> hmm two things... </h1>
    <h1 style={{textAlign: "center"}}>posts are loading 😏😏😏😍 or</h1>
    <h2 style={{textAlign: "center"}}> this category has no posts as of yet...</h2>
    <img src="https://www.singulart.com/images/artworks/v2/cropped/27721/main/zoom/1799638_de40de4b95ae502bf8695248595c2a60.jpeg" className="img-fluid" alt="daffy duck" />
    </>)
} 

    return(<>


{posts?.map((post, index) => (
        <ShowOurPosts key={index} post={post} />
      ))}

    

    </>)
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
            <div className="card">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  {" "}
                 
                  <div className="d-flex flex-column ml-2">
                    {" "}
                    <span className="font-weight-bold">{person.fullname}</span>{" "}
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
          <div className="card">
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
                  <span className="font-weight-bold">  {person.fullname}   </span>{" "}
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




export default ItemsFromCat