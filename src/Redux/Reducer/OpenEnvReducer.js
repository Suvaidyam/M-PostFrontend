const initialstate = null
const OpenEnvReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "OPEN_ENV":
            return action.payload
        default:
            return state;

    }
}

export default OpenEnvReducer;