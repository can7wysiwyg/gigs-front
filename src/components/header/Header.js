import { useContext } from "react";
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { GlobalState } from "../../GlobalState";



function Header() {
   
    const state = useContext(GlobalState);
    // const token = state.token;
    const [isLogged] = state.userApi.isLogged;
    const [isUser] = state.userApi.isUser;
    // const [owner] = state.userApi.owner;
    const [isAdmin] = state.userApi.isAdmin;

    const logoutUser = async () => {
        localStorage.removeItem('token')
    
         
        window.location.href = "/";
    
      
      };

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
            <NavItem>
              <LinkContainer to="/our_users">
                <Nav.Link>
                our users
                </Nav.Link>
                
                </LinkContainer>
            </NavItem>

        )
      }

      

      const figureOut = () => {

        if(isUser) {
            return userRouter()
        } else if(isAdmin) {
            return adminRoute()
        }


      }



    return(<>
    <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>tutor-finder</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle  />
          <Navbar.Collapse >
            
            
            <Nav className="ml-auto">
              
                  {figureOut()}
        
        
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