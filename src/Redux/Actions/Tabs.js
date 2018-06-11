import * as TabActionTypes from '../ActionTypes/Tabs';

export const addTab = id => dispatch => {
    dispatch({
        type: TabActionTypes.ADD_TAB,
        payload: id,
    });
}

export const removeTab = id => dispatch => {
    dispatch({
        type: TabActionTypes.REMOVE_TAB,
        payload: id,
    });
}

export const openTab = id => dispatch => {
    dispatch({
        type: TabActionTypes.OPEN_TAB,
        payload: id,
    });
}
