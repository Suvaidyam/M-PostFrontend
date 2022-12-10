import { combineReducers} from 'redux'
import ProfileReducer from './ProfileReducer';
import CollectionEditReducer from './CollectionEditReducer';

const rootReducer = combineReducers({
    ProfileReducer,
    CollectionEditReducer
});

export default rootReducer;