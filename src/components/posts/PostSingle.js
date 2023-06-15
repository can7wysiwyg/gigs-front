import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom"



function PostSingle() {
    const{id} = useParams()
    
    const[single, setSingle] = useState([])
    


    useEffect(() => {
        const getPosts = async () => {
          const res = await axios.get(`https://apigigs.onrender.com/subject/single/${id}`);
    
          setSingle(res.data.singled);
        
            
        };
    
        getPosts();
      }, [id]);

    

      const{ subjectName, subjectPrice, subjectCommentary} = single

    
      
    return(<>
    <div className="col-md-6 mx-auto d-flex justify-content-center">
    
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