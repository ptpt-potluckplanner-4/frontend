//Mark does this
// logout - profile - CREATE POTLUCK.JS - ATTEND POTLUCK - 
import { Link } from "react-router-dom";
import styled from 'styled-components';


const StyledNav = styled.nav`
  background-color: papayawhip;
  font-size: 1 rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  justify-content: space-around;
  align-items: center;

  }
`;

const StyledP = styled.p`
  color: #11324D;
  font-size: 1 rem;
  display: flex;
  text-transform: uppercase;
  textDecoration: none;
  transition: all .2s ease-in-out;
  &:hover {
    text-decoration: none;
    color: #6B7AA1;
    border: 1px solid #11324D;
    border-radius: 2px;
    transform: scale(1.1);
  }
`;



export default function NavBar() {

    return (<nav>

        <StyledNav className='navBarLinks'>
            <h1 className='mainHeader'>POTLUCK PLANNER</h1>
            <Link style={{ textDecoration: 'none' }} to='/profile'><StyledP>Profile</StyledP></Link>
            <Link style={{ textDecoration: 'none' }} to="/createpotluck"><StyledP>Create a Potluck</StyledP></Link>
            <Link style={{ textDecoration: 'none' }} to="/potlucklist"><StyledP>Join a Potluck</StyledP></Link>
            <Link style={{ textDecoration: 'none' }} to="/"><StyledP>LogOut</StyledP></Link>

        </StyledNav>
    </nav>)
}

