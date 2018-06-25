import * as OrderActionTypes from '../ActionTypes/Orders';

const _orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};

const DEFAULT_STATE = {
    orders: _orders,
    orders_id: Object.keys(_orders),
    orderBy: '',
    filterBy: '',
};

const orderSort = (orderIds, orders = {}, orderBy = '') => {
    return orderIds.sort((id, id2) => {
        const order1 = orders[id];
        const order2 = orders[id2];

        switch (orderBy) {
            case 'id': {
                if (id === id2) {
                    return 0;
                }
                if (typeof id === typeof id2) {
                    return id < id2 ? -1 : 1;
                }
                return typeof id < typeof id2 ? -1 : 1;
            }
            case 'price': return order1.price - order2.price;
            case 'date': return new Date(order1.date) - new Date(order2.date);
            default: return 0;
        }
    });
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case OrderActionTypes.SAVE_ORDER: {
            const order = action.payload;

            const orders = {
                ...state.orders,
                [order.id]: {
                    ...order
                },
            };

            const orders_id = [
                ...state.orders_id,
                order.id
            ];

            if (state.orderBy !== '') {
                orderSort(orders_id, orders, state.orderBy);
            }

            localStorage.setItem('RFE-orders', JSON.stringify(orders));

            return {
                ...state,
                orders_id,
                orders,
             };
        }
        case OrderActionTypes.DELETE_ORDER: {
            const orders = Object.assign({}, state.orders);
            let orders_id = [];

            if (typeof action.payload === 'string') {
                const index = state.orders_id.indexOf(action.payload);

                orders_id = [
                    ...state.orders_id.slice(0, index),
                    ...state.orders_id.slice(index + 1)
                ];

                delete orders[action.payload];
            } else if (Object.prototype.toString.call(action.payload) === '[object Array]') {
                action.payload.forEach(id => {
                    delete orders[id];
                });

                orders_id = Object.keys(orders);
            }

            localStorage.setItem('RFE-orders', JSON.stringify(orders));

            return {
                ...state,
                orders_id,
                orders
            };
        }
        case OrderActionTypes.SET_ORDER_BY: {
            const orderBy = action.payload;
            const { orders_id } = state;

            orderSort(orders_id, state.orders, orderBy);

            return Object.assign({}, {
                ...state,
                orders_id,
                orderBy,
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
