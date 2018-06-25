import * as OrderActionTypes from '../ActionTypes/Orders';

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

export const setOrderBy = columnName => dispatch => {
    dispatch({
        action: OrderActionTypes.SET_ORDER_BY,
        type: OrderActionTypes.SET_ORDER_BY,
        payload: columnName,
    });
}

export const setFilterBy = pattern => dispatch => {
    dispatch({
        action: OrderActionTypes.SET_FILTER_BY,
        type: OrderActionTypes.SET_FILTER_BY,
        payload: pattern,
    });
}
