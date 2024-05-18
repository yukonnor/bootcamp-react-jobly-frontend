import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";

function CompanyList({ companies }) {
    return (
        <div className="CompanyList">
            {companies.map((company) => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </div>
    );
}

export default CompanyList;
