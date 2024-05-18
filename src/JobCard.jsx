import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function JobCard({ job, applyToJob, applied }) {
    const handleApply = async () => {
        const response = await applyToJob(job.id);
    };

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">{job.title}</CardTitle>
                <CardText>
                    Company:{" "}
                    <Link to={`/companies/${job.companyHandle}`}>
                        <b>{job.companyName}</b>
                    </Link>
                </CardText>
                <CardText>
                    Salary: <b>{job.salary}</b>
                </CardText>
                <CardText>
                    Equity: <b>{job.equity}</b>
                </CardText>

                {applied ? (
                    <Button>Applied!</Button>
                ) : (
                    <Button color="primary" onClick={handleApply}>
                        Apply
                    </Button>
                )}
            </CardBody>
        </Card>
    );
}

export default JobCard;
