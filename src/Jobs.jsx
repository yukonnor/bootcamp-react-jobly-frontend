import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, Input, Row, Col } from "reactstrap";
import JoblyApi from "../api";
import JobList from "./JobList";

function Jobs({ user, applyToJob }) {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [searchParams, setSearchParams] = useState({});
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    /* useEffect to get jobs from API upon inital render */

    useEffect(() => {
        async function getJobs() {
            let response = await JoblyApi.request("jobs");
            setJobs(response.jobs);
            return response;
        }
        getJobs();
        setIsLoading(false);
    }, []);

    /* handleSearch updates the company list based on the search team submitted */

    const handleSearch = async (evt) => {
        evt.preventDefault();

        const searchParams = { title: formData.search };

        const response = await JoblyApi.request("jobs", searchParams);

        // if jobs returned, set jobs
        response.jobs && setJobs(response.jobs);

        // clear search form
        setFormData(INITIAL_STATE);
    };

    /* Update local state w/ current state of input element */

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    // if user is logged out, redirect to home screen
    if (!user.token) {
        return <Navigate to="/" />;
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <h1>Jobs</h1>
            <Form onSubmit={handleSearch}>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search..."
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <Button>Search</Button>
                    </Col>
                </Row>
            </Form>
            <JobList jobs={jobs} applyToJob={applyToJob} />
        </div>
    );
}

export default Jobs;
