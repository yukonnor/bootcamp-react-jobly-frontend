import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` };
        const params = method === "get" ? data : {};

        try {
            const response = await axios({ url, method, data, params, headers });
            return response.data;
        } catch (err) {
            console.log("API request retured error or failed...");
            console.log(err);
            let message = err.response.data.error.message;
            return err.response.data.error;
            // throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Authenticate user
     *  returns: {token}) */

    static async authenticate(username, password) {
        let res = await this.request("auth/token", { username, password }, "post");
        return res;
    }

    /** Register user
     *  accepts: userObj { username, password, firstName, lastName, email }
     *  returns: {token} */

    static async register(userObj) {
        let res = await this.request("auth/register", userObj, "post");
        return res;
    }

    /** Get user
     *  accepts: username, token
     *  returns: { applications, username, firstName, lastName, email, isAdmin } */

    static async getUser(username, token) {
        this.token = token;
        let res = await this.request(`users/${username}`, {}, "get");
        return res.user;
    }

    /** Update user
     *  accepts: username, token, { firstName, lastName, password, email }
     *  returns: { username, firstName, lastName, email, isAdmin } */

    static async updateUser(username, token, dataToUpdate) {
        this.token = token;
        let res = await this.request(`users/${username}`, dataToUpdate, "patch");
        return res;
    }

    /** Apply to Job
     *  accepts: username, jobId, token
     *  returns: {"applied": jobId}*/

    static async applyToJob(username, token, jobId) {
        this.token = token;
        let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
        return res;
    }
}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
