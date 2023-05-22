import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./home.css";
import moment from "moment/moment";
const { useEffect, useContext, useState } = require("react");

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/subject/show_all");

      setPosts(res.data.subject);
    };

    getPosts();
  }, []);

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
      {posts?.map((post, index) => (
        <ShowOurPosts key={index} post={post} />
      ))}
    </>
  );
}

const ShowOurPosts = ({ post }) => {
  const state = useContext(GlobalState);
  const [users] = state.usersApi.users;
  const [person, setPerson] = useState({});

  useEffect(() => {
    if (post.subjectOwner) {
       
      users.forEach((user) => {
        if (user._id === post.subjectOwner) setPerson(user);
      });
    }
  }, [post.subjectOwner, users]);


if(Object.keys(person).length < 15) {

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
              {post.subjectName}
            </h4>
            <span className="text-justify">MK{post.subjectPrice}</span>
            <p className="text-justify">
              {post.subjectCommentary}
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

  const picture = person.userImage.data.data

const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );



  return (
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
                <span className="font-weight-bold">{person.fullname}</span>{" "}
                <small className="text-primary">tutor</small>{" "}
              </div>
            </div>
            <div className="d-flex flex-row mt-1 ellipsis">
              {" "}
              <small className="mr-2">{ moment(post.updatedAt).format('LT')}</small>{" "}
              
            </div>
          </div>{" "}
        
          <div className="p-2">
          <h4 className="text-justify">
              {post.subjectName}
            </h4>
            <span className="text-justify">MK{post.subjectPrice}</span>
            <p className="text-justify">
              {post.subjectCommentary}
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
  );
};

export default Home;
