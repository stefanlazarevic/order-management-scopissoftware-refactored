import * as OrderActionTypes from '../ActionTypes/Orders';

export const fetchOrders = () => dispatch => {
    dispatch({
        action: OrderActionTypes.FETCH_ORDERS,
        type: OrderActionTypes.FETCH_ORDERS,
        payload: null,
    });
}

export const saveOrder = data => dispatch => {
    dispatch({
        action: OrderActionTypes.SAVE_ORDER,
        type: OrderActionTypes.SAVE_ORDER,
        payload: data,
    });
}

export const deleteOrder = id => dispatch => {
    dispatch({
        action: OrderActionTypes.DELETE_ORDER,
        type: OrderActionTypes.DELETE_ORDER,
        payload: id,
    });
}