import * as OrderActionTypes from '../ActionTypes/Orders';

const _orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};

const DEFAULT_STATE = {
    orders: _orders,
    orderBy: '',
    filterBy: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case OrderActionTypes.FETCH_ORDERS: {
            const orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};

            return {
                ...state,
                orders
            };
        }
        case OrderActionTypes.SAVE_ORDER: {
            const order = action.payload;

            const orders = {
                ...state.orders,
                [order.id]: {
                    ...order
                },
            };

            localStorage.setItem('RFE-orders', JSON.stringify(orders));

            return {
                ...state,
                orders,
             };
        }
        case OrderActionTypes.DELETE_ORDER: {
            const orders = Object.assign({}, state.orders);

            if (typeof action.payload === 'string') {
                delete orders[action.payload];
            } else if (Object.prototype.toString.call(action.payload) === '[object Array]') {
                action.payload.forEach(id => delete orders[id]);
            }

            localStorage.setItem('RFE-orders', JSON.stringify(orders));

            return {
                ...state,
                orders
            };
        }
        case OrderActionTypes.SET_ORDER_BY: {
            return Object.assign({}, {
                ...state,
                orderBy: action.payload,
            });
        }
        case OrderActionTypes.SET_FILTER_BY: {
            return Object.assign({}, {
                ...state,
                filterBy: action.payload,
            });
        }
        default: return state;
    }
}
