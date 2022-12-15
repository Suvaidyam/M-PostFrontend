const Tabs = (state = [], action) => {
    switch (action.type) {
        case "TABS":
            return action.payload
        default:
            return state;
    }
}

export default Tabs;