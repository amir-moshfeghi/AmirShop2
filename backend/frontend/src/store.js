import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productListReducer, productReviewCreateReducer} from './reducers/productReducers'
import {cartReducers} from "./reducers/cartReducers";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from "./reducers/userReducers";
import {orderCreateReducer, orderDetailsReducer, orderPayReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducers,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPayReducer:orderPayReducer,
    productReviewCreate:productReviewCreateReducer
})
const cartItemFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart:{cartItems: cartItemFromStorage,
    shippingAddress:shippingAddressFromStorage
    },
    userLogin:{userInfo:userInfoFromStorage}
}
const midlleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...midlleware)))

export default store