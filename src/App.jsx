import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import JoblyApi from "../api.js";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

// Context
import AppliedJobsContext from "./AppliedJobsContext.jsx";

// Route Components
import NavBar from "./NavBar";
import Home from "./Home";
import Companies from "./Companies.jsx";
import CompanyDetail from "./CompanyDetail.jsx";
import Jobs from "./Jobs.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import UserProfile from "./UserProfile.jsx";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useLocalStorage("user", {});
    const [appliedJobs, setAppliedJobs] = useState([]);

    /* useEffect to get get list of applied jobs upon initial render */

    useEffect(() => {
        async function getAppliedJobs(username) {
            if (user.username) {
                console.log("In getAppliedJobs...username found.");
                const response = await getUser(user.username, user.token);
                const appliedJobs = response.applications;
                setAppliedJobs(appliedJobs);
            }
            setIsLoading(false);
            console.log("App re-rendered from scratch!!!");
        }
        getAppliedJobs(user.username);
    }, []);

    useEffect(() => {
        console.log("user state updated:", user);
    }, [user]);

    useEffect(() => {
        console.log("appliedJobs state updated:", appliedJobs);
    }, [appliedJobs]);

    /* authUser to authenticate username + password from Login form*/

    async function authUser(username, password) {
        let response = await await JoblyApi.authenticate(username, password);
        if (response && response.token) {
            setUser((user) => ({ username, ...response }));
        }
        return response;
    }

    /* registerUser to create a user from Signup form
    /  userObj is: { username, password, firstName, lastName, email } */

    async function registerUser(userObj) {
        let response = await await JoblyApi.register(userObj);
        if (response && response.token) {
            setUser((user) => ({ username: userObj.username, ...response }));
        }
        return response;
    }

    /* getUser to get a user from backend from a username
    /  userObj is: { username, password, firstName, lastName, email } */

    async function getUser(username, token) {
        let response = await await JoblyApi.getUser(username, token);
        return response;
    }

    /* updateUser to update a user from Profile form
    /  userObj is: { username, password, firstName, lastName, email } */

    async function updateUser(username, token, dataToUpdate) {
        let response = await await JoblyApi.updateUser(username, token, dataToUpdate);
        return response.user;
    }

    /* applyToJob allows the current user to create a job application for a job
    /  userObj is: { username, password, firstName, lastName, email }
    /  returns: {"applied": jobId}
     */

    async function applyToJob(jobId) {
        let response = await await JoblyApi.applyToJob(user.username, user.token, jobId);
        if (response && response.applied) {
            setAppliedJobs((appliedJobs) => [...appliedJobs, response.applied]);
        }
        return response;
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar user={user} setUser={setUser} />
                <main>
                    <AppliedJobsContext.Provider value={appliedJobs}>
                        <Routes>
                            <Route exact path="/" element={<Home user={user} />} />
                            <Route exact path="/companies" element={<Companies user={user} />} />
                            <Route
                                exact
                                path="/companies/:companyHandle"
                                element={<CompanyDetail user={user} applyToJob={applyToJob} />}
                            />
                            <Route
                                exact
                                path="/jobs"
                                element={<Jobs user={user} applyToJob={applyToJob} />}
                            />
                            <Route
                                exact
                                path="/login"
                                element={<Login user={user} authUser={authUser} />}
                            />
                            <Route
                                exact
                                path="/signup"
                                element={<Signup user={user} registerUser={registerUser} />}
                            />
                            <Route
                                exact
                                path="/profile"
                                element={
                                    <UserProfile
                                        user={user}
                                        getUser={getUser}
                                        updateUser={updateUser}
                                    />
                                }
                            />
                        </Routes>
                    </AppliedJobsContext.Provider>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
