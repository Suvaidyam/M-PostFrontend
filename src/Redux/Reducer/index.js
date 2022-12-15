import { combineReducers } from 'redux'
import ProfileReducer from './ProfileReducer';
import CollectionEditReducer from './CollectionEditReducer';
import AddRequestReducer from './AddRequestReducer';
import AddFromReducer from './FromReducer';
import TabsReducer from "./Tabs";

const rootReducer = combineReducers({
    ProfileReducer,
    CollectionEditReducer,
    AddRequestReducer,
    AddFromReducer,
    TabsReducer
});

export default rootReducer;