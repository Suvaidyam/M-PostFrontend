import { createStore } from 'redux'
import rootReducer from './Redux/Reducer/index';

const store = createStore(rootReducer)

export default store;