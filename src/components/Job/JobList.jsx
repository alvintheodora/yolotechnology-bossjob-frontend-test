import React from 'react';
import './Job.css';
import moment from 'moment';
import Pagination from '../../shared/components/Pagination';

const JobList = ({ data, onPageChange }) => (
    <div>                  
        {                     
            data.jobs.map((jobValue)=>{return (
            <div key={jobValue.id}>
                <div className="flex">
                <div className="jobTitle">{jobValue.job_title}</div>
                <div className="flexRight bold">{`₱${toCurrency(jobValue.salary_range_from)}`} - {`₱${toCurrency(jobValue.salary_range_to)}`}</div>
                </div>
                <div className="jobDetailContainer">
                <div className="flex">                    
                    <div className="jobDetail">
                        <img src="https://assets.bossjob.com/website/pin.svg" alt="pin" width="13" height="13" style={{marginRight: 10}}/>
                        <span>{jobValue.job_location}</span>
                    </div>
                    <div className="jobDetail">
                        <img src="https://assets.bossjob.com/website/briefcase.svg" alt="briefcase" width="13" height="13" style={{marginRight: 10}}/>
                        <span>{jobValue.xp_lvl}</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="jobDetail">
                        <img src="https://assets.bossjob.com/website/education.svg" alt="education" width="13" height="13" style={{marginRight: 10}}/>
                        <span>{jobValue.degree}</span>
                    </div>
                    <div className="jobDetail">
                        <img src="https://assets.bossjob.com/website/clock.svg" alt="clock" width="13" height="13" style={{marginRight: 10}}/>
                        <span>{jobValue.job_type}</span>
                    </div>
                </div>
                </div>
                <div className="flexCenter">
                <div className="companyDetailContainer">
                    <img className="coverImg" width="50" height="50" src={jobValue.company_logo} alt={jobValue.company_name}/>
                    <div className="companyName">{jobValue.company_name}</div>
                </div>
                <div className="flexRight timestamp">{toRelativeTimestamp(jobValue.created_at)}</div>                          
                </div>
                <hr className="divider"/>
            </div>
            )})
        }                

        {/* Pagination */}  
        {
            data.total_num>0 &&
            <Pagination page={data.page} pages={data.total_pages} onPageChange={onPageChange}/>
        }      
    </div>  
)

function toRelativeTimestamp (date){
    const dateFormatted = new Date(date);
    return moment(dateFormatted).fromNow();
}
function toCurrency (labelValue){
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "b"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "m"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "k"

    : Math.abs(Number(labelValue));
}

export default JobList;