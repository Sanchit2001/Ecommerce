import {createStore, applyMiddleware,combineReducers} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools, compseWithDevTools} from 'redux-devtools-extension';
import { productDetailsReducer, productReducer } from './reducer/productReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
});
let initialState={};
const middleware = [Thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;