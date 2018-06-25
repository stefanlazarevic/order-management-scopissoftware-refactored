import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import OrdersReducer from './Reducers/Orders';
import TabsReducer from './Reducers/Tabs';

const customMiddlewares = [thunk];

const reduxDevToolsMiddleware = window.devToolsExtension && window.devToolsExtension();

const reducers = combineReducers({
    orders: OrdersReducer,
    tabs: TabsReducer,
});

const ReduxStore = createStore(
    reducers,
    compose(
        applyMiddleware(...customMiddlewares),
        reduxDevToolsMiddleware
    ),
);

export default ReduxStore;
