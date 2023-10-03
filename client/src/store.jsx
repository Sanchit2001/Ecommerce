import {createStore, applyMiddleware,combineReducers} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools, compseWithDevTools} from 'redux-devtools-extension';
import { productDetailsReducer, productReducer} from './reducer/productReducer';
import {userReducer} from './reducer/userReducer';
import {cartReducer} from './reducer/cartReducer';
const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
    cart:cartReducer,
});
let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?
        JSON.parse(localStorage.getItem("shippingInfo")):{},
    }
};
const middleware = [Thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;