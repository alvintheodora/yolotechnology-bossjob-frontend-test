import React from 'react'
import './Job.css'

const JobSearch = ({ handleFilter, ...rest }) => (
    <div className="searchContainer">
        <input className="searchBox" type="text" {...rest} />
        <hr className="divider"/>
        <button className="fullWidthButton" onClick={handleFilter} type="button">
        <div className="flexCenter">
            <span>Filter results</span>
        </div>                
        </button>
    </div>
)

export default JobSearch;