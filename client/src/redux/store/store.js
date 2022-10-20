import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducer/reducer';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
)

export default store;