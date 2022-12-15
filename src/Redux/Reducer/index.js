import { combineReducers} from 'redux'
import ProfileReducer from './ProfileReducer';
import CollectionEditReducer from './CollectionEditReducer';
import AddRequestReducer from './AddRequestReducer';
import AddFromReducer from './FromReducer';

const rootReducer = combineReducers({
    ProfileReducer,
    CollectionEditReducer,
    AddRequestReducer,
    AddFromReducer
});

export default rootReducer;