import { combineReducers, createStore } from 'redux'
import rootReducer from '../reducer/rootReducer'

const reducers = combineReducers({
    root: rootReducer
})

export type RootState = ReturnType<typeof reducers>;
const store = createStore(reducers);


export default store;