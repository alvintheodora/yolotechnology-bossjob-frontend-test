import axios from "axios";


export function getAllJob(options={}) {  
    return (dispatch, getState) => {
      dispatch({
        type: "GET_ALL_JOB",      
        payload: axios.get(
          `https://search.bossjob.com/api/v1/search/job_filter`,    
          {
            params: options,
            headers: {'accept': 'application/json'},        
          },
        )   
      })     
    }    
  }