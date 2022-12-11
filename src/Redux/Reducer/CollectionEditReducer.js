
const CollectionEditReducer = (state= false, action)=>{
    switch(action.type){
        case "COLLECTION_EDIT" :
            return action.payload
            
        default:
            return state;

    }
}

export default CollectionEditReducer;