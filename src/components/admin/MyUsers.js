import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import _ from "lodash"


const pageSize = 8;


function MyUsers() {
  const[users, setUsers] = useState([])
  const [paginated, setPaginated] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {

    const getUsers = async() => {
      const res = await axios.get('https://apigigs.onrender.com/auth/users')
      setUsers(res.data)
      setPaginated(_(res.data).slice(0).take(pageSize).value());

      

    }

    getUsers()

  }, [])

  const pageCount = users ? Math.ceil(users.length / pageSize) : 0;



  const pages = _.range(1, pageCount + 1);


  const pagination = (pageNo) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize
    const paginate = _(users).slice(startIndex).take(pageSize).value()
    setPaginated(paginate)


  }




  if(users?.length <= 0) {
    return(<>
    
    <h1 style={{textAlign: "center"}}>there are no users at the moment...</h1>
    </>)
  }





  return (
    <>
    {
      paginated?.map((person, index) => (
        <MineUsers key={index} person={person} />
      ))
    }

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

const MineUsers = ({person}) => {

  const picture = person.userImage.data.data

const base64String =  window.btoa(
    new Uint8Array(picture)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );


  return(<>
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row justify-content-md-center">
          <div className="col-sm-6">
            <div className="list list-row block">
              <div className="list list-row block">
               
                <div className="list-item" data-id="7">
                  <div>
                  
                      <span className="w-48 avatar gd-primary">
                        <img
                          src={`data:image/jpg;base64, ${base64String}`}
                          alt={person.fullname}
                        />
                      </span>
                    
                  </div>
                  <div className="flex">
                    <a
                      href={`/view_user/${person._id}`}
                      className="item-author text-color"
                      data-abc="true"
                    >
                      {person.fullname}
                    </a>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
  
  </>)
}

export default MyUsers;
