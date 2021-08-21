//Mark does this
// logout - profile - CREATE POTLUCK.JS - ATTEND POTLUCK - 
import { Link } from "react-router-dom";

export default function NavBar() {

    return (<nav>
        <h1 className='mainHeader'>POTLUCK PLANNER</h1>
        <div className='navBarLinks'>
            <Link to='/profile'>Profile</Link>
            <Link to="/createpotluck">Create a Potluck</Link>
            <Link to="/potlucklist">Join a Potluck</Link>
            <Link to="/">LogOut</Link>
        </div>
    </nav>)
}
