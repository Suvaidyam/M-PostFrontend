export const CollectionEdit = (edit)=>{
    console.log(edit)
    return{
        type: 'COLLECTION_EDIT',
        payload: edit
    }
}