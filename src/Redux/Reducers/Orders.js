import * as OrderActionTypes from '../ActionTypes/Orders';

const _orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};

export default (state = { orders: _orders }, action) => {
    switch(action.type) {
        case OrderActionTypes.FETCH_ORDERS: {
            const orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};

            return { orders };
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

            return { orders };
        }
        case OrderActionTypes.DELETE_ORDER: {
            const orders = Object.assign({}, state.orders);

            if (typeof action.payload === 'string') {
                delete orders[action.payload];
            } else if (Object.prototype.toString.call(action.payload) === '[object Array]') {
                action.payload.forEach(id => delete orders[id]);
            }

            localStorage.setItem('RFE-orders', JSON.stringify(orders));

            return { orders };
        }
        default: return state;
    }
}
