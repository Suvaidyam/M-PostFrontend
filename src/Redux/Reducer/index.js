import { combineReducers } from 'redux'
import ProfileReducer from './ProfileReducer';
import AddRequestReducer from './AddRequestReducer';
import TabsReducer from "./Tabs";

const rootReducer = combineReducers({
    ProfileReducer,
    AddRequestReducer,
    TabsReducer
});

export default rootReducer;