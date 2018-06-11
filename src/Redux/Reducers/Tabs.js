import * as TabActionTypes from '../ActionTypes/Tabs';

export default (state = { tabs: [], activeTabIndex: -1 }, action) => {
    switch(action.type) {
        case TabActionTypes.ADD_TAB: {
            const tabIndex = state.tabs.indexOf(action.payload);

            if (tabIndex >= 0) {
                return {
                    ...state,
                    activeTabIndex: tabIndex,
                }
            }

            return {
                ...state,
                tabs: state.tabs.concat(action.payload)
            }
        }
        case TabActionTypes.REMOVE_TAB: {
            const tabIndex = state.tabs.indexOf(action.payload);

            if (tabIndex >= 0) {
                const tabs = [
                    ...state.tabs.slice(0, tabIndex),
                    ...state.tabs.slice(tabIndex + 1),
                ];

                return {
                    ...state,
                    tabs,
                    activeTabIndex: state.activeTabIndex > -1 ? state.activeTabIndex - 1 : -1,
                };
            } else {
                return state;
            }
        }
        case TabActionTypes.OPEN_TAB: {
            const tabIndex = state.tabs.indexOf(action.payload);

            if (tabIndex >= 0) {
                return {
                    ...state,
                    activeTabIndex: tabIndex,
                }
            } else {
                return {
                    ...state,
                    activeTabIndex: -1,
                }
            }
        }
        default: return state;
    }
}
