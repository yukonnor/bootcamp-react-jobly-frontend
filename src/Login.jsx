import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

/** Form for authenticating / logging in a user
 *
 */

const Login = ({ user, authUser }) => {
    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState();
    const navigate = useNavigate();

    /** Send user object to parent for authentication.
     *  If successful: redirect to home page as logged in user
     *  If error: show error message */

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const { username, password } = formData;

        const response = await authUser(username, password);

        console.log("handleSubmit login response: ", response);

        // based on response, navigate home or show error
        if (response.token) {
            navigate("/");
        } else {
            setError(response.message);
        }
    };

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

                    {error ? (
                        <Alert color="danger">
                            {error.map((e) => (
                                <p key={e}>{e}</p>
                            ))}
                        </Alert>
                    ) : null}

                    <Button color="primary">Login</Button>
                </Form>
            </Card>
        </>
    );
};

export default Login;
