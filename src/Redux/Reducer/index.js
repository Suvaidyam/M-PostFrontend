import { combineReducers } from 'redux'
import ProfileReducer from './ProfileReducer';
import AddRequestReducer from './AddRequestReducer';
import TabsReducer from "./Tabs";
import OpenEnvReducer from './OpenEnvReducer';

const rootReducer = combineReducers({
    ProfileReducer,
    AddRequestReducer,
    TabsReducer,
    OpenEnvReducer
});

export default rootReducer;