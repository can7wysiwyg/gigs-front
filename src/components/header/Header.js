import { useContext, useEffect, useState } from "react";
import { Navbar, Nav,   Container, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useNavigate } from "react-router-dom";



function Header() {
   
    const state = useContext(GlobalState);
    const token = state.token;
    const [isLogged] = state.userApi.isLogged;
    const [isUser] = state.userApi.isUser;
    const [isAdmin] = state.userApi.isAdmin;
    const [user, setUser] = useState([]);
    const[categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

      const getCats = async() => {
      
        const res = await axios.get('/admin/show_categories')
      
        setCategories(res.data.results);
      
      }
      
      getCats()
      
      
      }, [])
      
      const handleCategory = (event) => {
    console.log(event.target.value);
    
        navigate(`/items_from_cat/${event.target.value}`)
    
      }
       
    
    
      
  
  
    
 


    useEffect(() => {
      const getUser = async () => {
        const res = await axios.get("/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(res.data); }

        getUser()
      

    }, [token])
 
    
  
    const logoutUser = async () => {
        localStorage.removeItem('token')
    
         
        window.location.href = "/";
    
      
      };

      

      function webName() {

        if(isLogged !== true) {
          return(<>
          <LinkContainer to="/">
            <Navbar.Brand>tutor-finder</Navbar.Brand>
          </LinkContainer>

          </>)


        } else if(isLogged === true) {

          const picture = user.userImage.data.data ;

     const base64String = window.btoa(
    new Uint8Array(picture).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );


          return(<>
          
          <LinkContainer to="/">
            <Navbar.Brand> <img src={`data:image/jpg;base64, ${base64String}`} alt={user.username} width="25" />  </Navbar.Brand>
          </LinkContainer>
          
          </>)
        }


      }

      const loggedRouter = () => {
        return (
            <Nav>
              
              <NavItem>
                <LinkContainer to="/" onClick={logoutUser}>
                  <Nav.Link>logout</Nav.Link>
                </LinkContainer>
              </NavItem>
            </Nav>
          );

      }


      const userRouter =  () => {

        return(<Nav>
            <NavItem>
              <LinkContainer to="/my_profile">
                <Nav.Link>
                my profile
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>

            <NavItem>
              <LinkContainer to="/create_qualification">
                <Nav.Link>
                 create my qualification
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>

            <NavItem>
              <LinkContainer to="/post_tutor_service">
                <Nav.Link>
                 create a tutoring post
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>


            <NavItem>
              <LinkContainer to="/my_services">
                <Nav.Link>
                  my tutoring subjects
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>






        </Nav>)
      }


      const adminRoute = () => {

        return(
          <Nav>         
               <NavItem>
              <LinkContainer to="/my_users">
                <Nav.Link>
                Our Users
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>

            <NavItem>
              <LinkContainer to="/create_category">
                <Nav.Link>
                Create Categories
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>

            <NavItem>
              <LinkContainer to="/category_list">
                <Nav.Link>
                Manage Categories
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>


            </Nav>


        )
      }

      

      const figureOut = () => {
        if(isUser && user.role === 1) {
          return(<>
          <NavItem>
              <LinkContainer to="/appeal">
                <Nav.Link>
                my appeal
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>

          
          </>)
        }
         else if(isUser) {
            return userRouter()
        } else if(isAdmin) {
            return adminRoute()
        }   


      }

     


    return(<>
    <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {webName()}
          <Navbar.Toggle  />
          <Navbar.Collapse >
            
            
            <Nav className="ml-auto">
              
                  {figureOut()}
        
                  <select name="categories" value={categories}  onChange={handleCategory} >
                    <option value=''>All Categories</option>
                    {
                        categories?.map(categor => (
                            <option value={ categor._id} key={categor._id}>
                                {categor.catName}
                            </option>
                        ))
                    }
                </select>

             


        { isLogged ? (
          loggedRouter()
        ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login ✥ Register
                  </Nav.Link>
                </LinkContainer> )}
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        
    </header>


    
    
    </>)
}

export default Header