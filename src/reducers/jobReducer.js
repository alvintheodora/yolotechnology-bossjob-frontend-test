const initialState = {};

export default function(state=initialState, action){  
    switch(action.type){        
        case 'GET_ALL_JOB_PENDING':
            return {...state, fetchingGetAllJob: true, fetchedGetAllJob: false};
        case 'GET_ALL_JOB_REJECTED':
            return {...state, fetchingGetAllJob: false, 
                error: action.payload.response && action.payload.response.data, 
                jobData: null}
        case 'GET_ALL_JOB_FULFILLED':            
            return {...state, fetchingGetAllJob: false, fetchedGetAllJob: true, 
                jobData: action.payload.data.data};
        default:
            return state;
    }      
}