//Mark does this
// logout - profile - CREATE POTLUCK.JS - ATTEND POTLUCK - 
import { Link } from "react-router-dom";
import styled from 'styled-components';





const StyledNav = styled.nav`
  ${'' /* background-color: papayawhip; */}
  background-color: #6B7AA1; 
  font-size: 1 rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  border-bottom: .5px solid black;
	box-shadow: 0px 2px 2px grey;
  }
`;

const StyledH1 = styled.h1`
  color: whitesmoke;
  font-size: 1.5rem;
  ${'' /* box-shadow: 0px 5px 5px grey; */}
  &:hover {
    text-decoration: none;
    color: black;
    transform: scale(1.05);
   
  }
`;


const StyledP = styled.p`
  color: black; 
  font-weight: 550;
  font-size: .8 rem;
  display: flex;
  text-transform: uppercase;
  textDecoration: none;
  transition: all .2s ease-in-out;
  ${'' /* box-shadow: 0px 5px 5px grey; */}
  &:hover {
    text-decoration: none;
    color: whitesmoke;
    transform: scale(1.1);
    
    textDecoration: none;
  }
`;


// const mobileNavHamburger = document.getElementById("linesHamburgerImage");
// const mobileNav = document.getElementById("hamburger");
// const body = document.getElementsByName("body");

// function openNav() {
//   if (StyledNavMObile.style.display === "none") {
//     StyledNavMObile.style.display = "block";
//   } else {
//     StyledNavMObile.style.display = "none";
//   }
// }

// function closeOpenNav() {
//   if (window.outerWidth > 729) {
//     StyledNav.style.display = "none";
//   }
// }



export default function NavBar() {

  return (<nav>
    {/* onResize={(window.outerWidth > 729) ? { display: "block" } : { display: "none" } */}
    <StyledNav className='navBarLinks'>
      <StyledH1 className='mainHeader'>POTLUCK PLANNER</StyledH1>
      <Link style={{ textDecoration: 'none' }} to='/profile'><StyledP>Profile</StyledP></Link>
      <Link style={{ textDecoration: 'none' }} to="/createpotluck"><StyledP>Create a Potluck</StyledP></Link>
      <Link style={{ textDecoration: 'none' }} to="/potlucklist"><StyledP>Join a Potluck</StyledP></Link>
      <Link style={{ textDecoration: 'none' }} to="/"><StyledP ><span style={{ border: "1.75px solid black", padding: "5px", boxShadow: "0px 2px 2px black", }} >LogOut</span></StyledP></Link>
    </StyledNav>

    {/* <StyledNavMObile className='navBarLinks' style={(window.outerWidth > 729) ? { display: "none" } : { display: "block" }}>
      <h1 className='mainHeader'>POTLUCK PLANNER</h1>
      <img id="linesHamburgerImage" src='../../public/Hamburger_icon.svg' alt="Open NAV"></img>
      <section>
        <Link style={{ textDecoration: 'none' }} to='/profile'><StyledP>Profile</StyledP></Link>
        <Link style={{ textDecoration: 'none' }} to="/createpotluck"><StyledP>Create a Potluck</StyledP></Link>
        <Link style={{ textDecoration: 'none' }} to="/potlucklist"><StyledP>Join a Potluck</StyledP></Link>
        <Link style={{ textDecoration: 'none' }} to="/"><StyledP>LogOut</StyledP></Link>
      </section>
    </StyledNavMObile> */}

  </nav >)
}



// <!-- hamburger NAV -->  
//     <img onclick="openNav()" id="linesHamburgerImage" src="assets/Hamburger_icon.svg.png" alt="Open NAV">
//     <section id="hamburger">
//       <a href="index.html"><p></p>Home</p></a>
//       <div class="hr-line"></div>
//       <a href="about.html"><p>About</p></a>
//       <div class="hr-line"></div>
//       <a href="contact.html"><p>Contact</p></a>
//       <div class="hr-line"></div>
//       <a href="projects.html"><p>Projects</p></a>
//     </section>
// </header>

