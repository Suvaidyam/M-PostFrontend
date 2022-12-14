const initialstate = {
    request:[]
}
const AddRequestReducer = (state= initialstate, action)=>{
    switch(action.type){
        case "ADD_REQUEST" :
            const itemIndex = state.request.findIndex((item) => item._id === action.payload._id)
            if (itemIndex >= 0) {
                state.request[itemIndex].NA = 1
            } else {

                return {
                    ...state,
                    request: [...state.request, action.payload]
                }
            }
        default:
            return state;

    }
}

export default AddRequestReducer;