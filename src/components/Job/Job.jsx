import React, { Component } from 'react';
import './Job.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import qs from 'qs';
import { getAllJob } from '../../actions/JobActions';
import loaderGif from '../../assets/images/loader.gif';
import JobSearch from './JobSearch';
import JobList from './JobList';

const size = 12;

class Job extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: qs.parse(this.props.location.search.substr(1)).query || '',   
    }
  }
  componentDidMount(){  
    const options = {size, query: this.state.query, page: qs.parse(this.props.location.search.substr(1)).page};
    this.props.dispatch(getAllJob(options));
  }
  componentDidUpdate(prevProps, prevState) {
   //check if query param changed
   if( JSON.stringify(qs.parse(this.props.location.search.substr(1))) !== JSON.stringify(qs.parse(prevProps.location.search.substr(1))) ){        
        this.setState({
            query: qs.parse(this.props.location.search.substr(1)).query || ''
        }, ()=> {
            const options = {size, query: this.state.query, page: qs.parse(this.props.location.search.substr(1)).page};
            this.props.dispatch(getAllJob(options));
        })        
   }
  }
  handleChangeQuery = (e) => {
    const query = e.target.value;
    this.setState({query})
  }
  handleKeyDown = (e) => {
    if(e.key==='Enter'){
      this.handleFilter();
    }
  }
  handleFilter = () => { 
    this.props.history.push(`${process.env.PUBLIC_URL}?query=${this.state.query}`);    
  }
  handlePageChange = (page) => {
    this.props.history.push(`${process.env.PUBLIC_URL}?page=${page}&query=${this.state.query}`);
  }
  
  render() {
    const { jobData, fetchingGetAllJob } = this.props;
    return (
      <div>        
        <JobSearch 
          handleFilter={this.handleFilter}
          placeholder="Search for job title or company name"
          value={this.state.query}           
          onChange={this.handleChangeQuery}   
          onKeyDown={this.handleKeyDown}       
        />

        {/* Job */}
        {
          jobData && 
          <div className="innerContainer">
            <div className="bold">{jobData.total_num} jobs found</div>
            <hr className="divider"/>
            
            {
              fetchingGetAllJob?
              <img className="loaderGif" width="50" height="50" src={loaderGif} alt="loader gif"/>
              :
              <JobList data={jobData} onPageChange={this.handlePageChange}/>
            } 

          </div>
        }                        
      </div>     
    );
  }
}


function mapStateToProps(state) {
  return {
      jobData: state.job.jobData,
      fetchingGetAllJob: state.job.fetchingGetAllJob,
  };
}

export default withRouter(connect(mapStateToProps)(Job));
