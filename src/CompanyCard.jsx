import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function CompanyCard({ company }) {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">{company.name}</CardTitle>
                <CardText>{company.description}</CardText>
                <Link to={`/companies/${company.handle}`}>
                    <Button>View Company</Button>
                </Link>
            </CardBody>
        </Card>
    );
}

export default CompanyCard;
