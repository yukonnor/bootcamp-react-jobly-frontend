import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function Home({ user }) {
    return (
        <div>
            <h1>React Jobly</h1>
            <p className="lead">All the jobs in one convenient place.</p>
            {user.token ? (
                <h2> {`Welcome, ${user.username}!`} </h2>
            ) : (
                <p>
                    <Link to="/login" className="btn btn-secondary me-3">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary">
                        Sign Up
                    </Link>
                </p>
            )}
        </div>
    );
}

export default Home;
