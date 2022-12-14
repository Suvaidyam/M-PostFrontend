const initialstate = {
    url:{},
    type:{}
}
const AddFromReducer = (state= initialstate, action)=>{
    switch(action.type){
        case "ADD_TYPE" :
            return {
                ...state,
                type:action.payload
            }
        case "ADD_URL" :
            return {
                ...state,
                url:action.payload
            }
        default:
            return state;

    }
}

export default AddFromReducer;