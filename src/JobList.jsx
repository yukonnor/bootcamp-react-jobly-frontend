import { useContext } from "react";
import JobCard from "./JobCard";
import AppliedJobsContext from "./AppliedJobsContext";

function JobList({ jobs, applyToJob }) {
    const appliedJobs = useContext(AppliedJobsContext);

    return (
        <div className="JobList">
            {jobs.map((job) => {
                return (
                    <JobCard
                        key={job.id}
                        job={job}
                        applyToJob={applyToJob}
                        applied={appliedJobs.includes(job.id)}
                    />
                );
            })}
        </div>
    );
}

export default JobList;
