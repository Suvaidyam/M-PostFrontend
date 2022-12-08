const initialstate = {
    url:{}
}
const ProfileReducer = (state= initialstate, action)=>{
    console.log(state)
    switch(action.type){
        case "PROFILE_URL" :
            return{
                ...state,
                url: action.payload
            }
        default:
            return state;

    }
}

export default ProfileReducer;