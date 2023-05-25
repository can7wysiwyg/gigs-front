import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom"



function PostSingle() {
    const{id} = useParams()
    // const [posts, setPosts] = useState([]);
    const[single, setSingle] = useState([])
    const[readMore] = useState(false);


    useEffect(() => {
        const getPosts = async () => {
          const res = await axios.get(`/subject/single/${id}`);
    
          setSingle(res.data.singled);
        
            
        };
    
        getPosts();
      }, [id]);

    

      const{ subjectName, subjectPrice, subjectCommentary} = single

    
      
    return(<>
    <div className="col-md-6 mx-auto text-center">
    
   <Card>
        
        <Card.Body>
          <Card.Title as="h1">{subjectName}</Card.Title>
          <Card.Text as="h4">price: {subjectPrice}</Card.Text>
          <Card.Text as="p"> { subjectCommentary  }</Card.Text>
          

        <Card.Link href={`/person_profile/${single.subjectOwner}`} className="d-block p-2">
            view tutor{" "}
          </Card.Link>
        </Card.Body>
      </Card>  

    </div>
    
    
    </>)
}

export default PostSingle