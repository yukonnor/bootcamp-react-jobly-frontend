import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

/** Form for creating a user
 *
 */

const Signup = ({ user, registerUser }) => {
    const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState();
    const navigate = useNavigate();

    /** Send user object to parent for authentication.
     *  If successful: redirect to home page as logged in user
     *  If error: show error message */

    async function handleSubmit(evt) {
        evt.preventDefault();

        const userObj = formData;

        const response = await registerUser(userObj);

        // based on response, navigate home or show error
        if (response.token) {
            navigate("/");
        } else {
            setError(response.message);
        }
    }

    /** Update local state w/ current state of input element */

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    // if user is logged in, redirect to home screen
    if (user.token) {
        return <Navigate to="/" />;
    }

    /** Render form. After form submitted, show a success alert with link to home page. */

    return (
        <>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                        ></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        ></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                        ></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        ></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                        ></Input>
                    </FormGroup>

                    {error ? (
                        // <p>Error.</p>
                        <Alert color="danger">
                            {Array.isArray(error) ? (
                                error.map((e) => <p key={e}>{e}</p>)
                            ) : (
                                <p>{error}</p>
                            )}
                        </Alert>
                    ) : null}

                    <Button color="primary">Sign Up</Button>
                </Form>
            </Card>
        </>
    );
};

export default Signup;
