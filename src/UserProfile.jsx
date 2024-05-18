import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

/** Form for creating a user
 *
 */

const UserProfile = ({ user, getUser, updateUser }) => {
    const INITIAL_STATE = { username: "", firstName: "", lastName: "", email: "" };
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [submitMsg, setSubmitMsg] = useState();
    const navigate = useNavigate();

    /* useEffect to get user info from db.json upon inital render and fill form */

    useEffect(() => {
        async function setProfileInfo() {
            const userInfo = await getUser(user.username, user.token);
            setIsLoading(false);
            setFormData({
                ...formData,
                username: userInfo.username,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
            });
        }
        setProfileInfo();
    }, []);

    /** Send user object { username, firstName, lastName, password, email } to parent for updating.
     *  Username cannot be updated but that is removed in parent.
     *  If successful: show success message
     *  If error: show error message */

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const dataToUpdate = { ...formData };
        delete dataToUpdate.username;

        console.log("handleSubmit args: ", user.username, user.token, dataToUpdate);
        const response = await updateUser(user.username, user.token, dataToUpdate);

        // based on response, navigate home or show error
        if (response && response.username) {
            setSubmitMsg({ alertType: "success", message: ["Profile updated!"] });
        } else {
            console.log("response: ", response);
            setSubmitMsg({ alertType: "danger", message: response.message });
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

    // if user is logged out, redirect to home screen
    if (!user.token) {
        return <Navigate to="/" />;
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
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
                            value={user.username}
                            disabled
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

                    {submitMsg ? (
                        <Alert color={submitMsg.alertType}>
                            {submitMsg.message.map((m) => (
                                <p key={m}>{m}</p>
                            ))}
                        </Alert>
                    ) : null}

                    <Button color="primary">Update Profile</Button>
                </Form>
            </Card>
        </>
    );
};

export default UserProfile;
