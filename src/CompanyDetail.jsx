import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobList from "./JobList";

function CompanyDetail({ user, applyToJob }) {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const { companyHandle } = useParams();

    /* useEffect to get company details from API upon inital render */

    useEffect(() => {
        async function getCompany() {
            let response = await await JoblyApi.getCompany(companyHandle);

            // redirect home if company not found
            if (!response || response.status === 404) {
                setRedirectToHome(true);
                return;
            }

            setCompany(response);
            setJobs(response.jobs);
            return response;
        }
        getCompany();
        setIsLoading(false);
    }, []);

    // redirect home if company handle not found

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    // if user is logged out, redirect to home screen
    if (!user.token) {
        return <Navigate to="/" />;
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="CompanyDetail">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <JobList jobs={jobs} applyToJob={applyToJob} />
        </div>
    );
}

export default CompanyDetail;
