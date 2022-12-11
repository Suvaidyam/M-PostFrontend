const initialstate = {
    request:[]
}
const AddRequestReducer = (state= initialstate, action)=>{
    switch(action.type){
        case "ADD_REQUEST" :
            return{
                ...state,
                request:[...state.request, action.payload]
            }
        default:
            return state;

    }
}

export default AddRequestReducer;