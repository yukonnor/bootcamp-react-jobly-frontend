import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import JoblyApi from "../api";
import CompanyList from "./CompanyList";

function Companies({ user }) {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [searchParams, setSearchParams] = useState({});
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    /* useEffect to get companies from API upon inital render */

    useEffect(() => {
        async function getCompanies() {
            let response = await JoblyApi.request("companies");
            setCompanies(response.companies);
            return response;
        }
        getCompanies();
        setIsLoading(false);
    }, []);

    /* handleSearch updates the company list based on the search team submitted */

    const handleSearch = async (evt) => {
        evt.preventDefault();

        const searchParams = { name: formData.search };

        const response = await JoblyApi.request("companies", searchParams);

        setCompanies(response.companies);
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
            <h1>Companies</h1>
            <Form onSubmit={handleSearch}>
                <Input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                />
                <Button>Search</Button>
            </Form>
            <CompanyList companies={companies} />
        </div>
    );
}

export default Companies;
