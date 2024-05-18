import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";

function NavBar({ user, setUser }) {
    const handleLogOut = () => setUser({});

    return (
        <Navbar expand="md">
            <NavLink exact="true" to="/" className="navbar-brand">
                Jobly
            </NavLink>

            {user.token ? (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/jobs">Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/" onClick={handleLogOut}>
                            {`Log Out (${user.username})`}
                        </NavLink>
                    </NavItem>
                </Nav>
            ) : (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/signup">Signup</NavLink>
                    </NavItem>
                </Nav>
            )}
        </Navbar>
    );
}

export default NavBar;
