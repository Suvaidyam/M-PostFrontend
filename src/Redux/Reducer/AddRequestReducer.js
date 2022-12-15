const initialstate = null
const AddRequestReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_REQUEST":
            return action.payload
        case "TABS":
            return action.payload

        default:
            return state;

    }
}

export default AddRequestReducer;