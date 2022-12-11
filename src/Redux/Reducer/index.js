import { combineReducers} from 'redux'
import ProfileReducer from './ProfileReducer';
import CollectionEditReducer from './CollectionEditReducer';
import AddRequestReducer from './AddRequestReducer';

const rootReducer = combineReducers({
    ProfileReducer,
    CollectionEditReducer,
    AddRequestReducer
});

export default rootReducer;