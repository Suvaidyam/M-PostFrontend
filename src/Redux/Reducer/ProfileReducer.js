const initialstate = {
    url:{}
}
const ProfileReducer = (state= initialstate, action)=>{
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