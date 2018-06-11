import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder } from '../../../Redux/Actions/Orders';
import { addTab, removeTab } from '../../../Redux/Actions/Tabs';

// Local components.
import OrderRow from './OrderRow.jsx';

// Part of sortAlphaNum method.
const reA = /[^a-zA-Z]/g;
const reN = /[^0-9]/g;

/**
 * ...
 *
 * @class TBody
 * @extends Component
 */
class TBody extends Component {
    constructor(props) {
        super(props);

        // Mutable container for all filtered order ids.
        this.ids = [];

        // Object that contains references to all inner row components.
        this.orderRows = {};

        this.state = {
            orderBy: 'id',
            filterBy: '',
        };
    }

    /**======================================
     * React life cycle events.
     ======================================*/
    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this);
        }

        this.props.onOrdersUpdate(this.getFilteredOrders());
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined);
        }
    }

    componentDidUpdate() {
        this.props.onOrdersUpdate(this.getFilteredOrders());
    }

    /**======================================
     * Component getters and setters.
     ======================================*/
    getOrderBy = orderBy => this.state.orderBy;

    setOrderBy = orderBy => this.setState({ orderBy });

    getFilterBy = filterBy => this.state.filterBy;

    setFilterBy = filterBy => this.setState({ filterBy });

    getOrders = () => this.props.orders;

    getOrdersAsArray = () => Object.keys(this.props.orders).map(id => this.orderRows[id].getValue());

    getFilteredOrders = () => this.ids.map(id => this.orderRows[id].getValue());

    getOrderRows = () => Object.keys(this.orderRows).map(id => this.orderRows[id]);

    getOrderRowsAsArray = () => Object.keys(this.orderRows).map(id => this.orderRows[id].getValue());

    /**======================================
     * Component action listeners.
     ======================================*/
    _handleOrderLinkClick = orderId => this.props.addTab(orderId);

    _handleSingleOrderDeletion = (checked, id) => {
        this.deleteOrders('single', id);
        this.props.removeTab(id);
        this.props.onOrderDeleting(checked, id); // Callback function for order deletion.
    }

    _handleOrderLocking = (locked, id) => {
        if (locked) {
            this.props.removeTab(id);
            this.props.onOrderLocking(locked, id); // Callback function for order locking.
        }
    }

    _handleOrderChecking = (checked, id) => {
        this.checkedAll = false;
        this.props.onOrderChecking(checked, id);
    }

    /**======================================
     * Order filtration functions.
     ======================================*/
    _handleOrdering = (orderBy, ids) => {
        switch (orderBy) {
            case 'id': return ids.sort(this._sortAlphaNum);
            case 'price': return ids.sort((id, id2) => {
                const o1 = this.props.orders[id];
                const o2 = this.props.orders[id2];

                return o1.price - o2.price;
            });
            case 'date': return ids.sort((id, id2) => {
                const o1 = this.props.orders[id];
                const o2 = this.props.orders[id2];

                return new Date(o1.date) - new Date(o2.date);
            });
            default: return ids;
        }
    }

    _sortAlphaNum = (a, b) => {
        const aA = a.replace(reA, '');
        const bA = b.replace(reA, '');
        if (aA === bA) {
            const aN = parseInt(a.replace(reN, ''), 10);
            const bN = parseInt(b.replace(reN, ''), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    }

    _handleFiltering = (filterPattern, ids) => {
        const regexp = new RegExp(`^${filterPattern.toUpperCase()}|ORD-${filterPattern}`);
        return ids.filter(id => regexp.test(id));
    }

    _prepareOrdersForRendering() {
        let ids = Object.keys(this.props.orders);
        ids = this._handleFiltering(this.state.filterBy, ids);
        ids = this._handleOrdering(this.state.orderBy, ids);
        return ids;
    }

    /**
     * Perform deleting of an orders, if type is single it deletes order with id.
     * If type is multiple then function collects ids of all selected unlocked orders
     * and dispatch to redux reducer.
     *
     * @param batchType [String] - Possible values 'single', 'multiple'
     * @param ids [String|Null] - Order ID.
     */
    deleteOrders = (batchType = 'single', id) => {
        if (batchType === 'single') {
            this.props.deleteOrder(id);
            this.removeRowReference(id);
        } else if (batchType === 'multiple') {
            const ids = this.getOrderRowsAsArray().filter(order => order.checked && !order.locked).map(order => order.id);

            this.props.deleteOrder(ids);
            this.removeRowReference(ids);
        }
    }

    pushRowReference = row => {
        if (typeof row !== 'undefined') {
            this.orderRows[row.props.id] = row;
        }
    }

    removeRowReference = rowId => {
        if (Object.prototype.toString.call(rowId) === '[object Array]') {
            rowId.forEach(id => {
                delete this.orderRows[id];
            });
        }

        if (typeof rowId === 'string') {
            delete this.orderRows[rowId];
        }

        return this.orderRows;
    }

    checkAllRows = checked => this.getOrderRows().forEach(order => order.setCheckedStatus(checked));

    render() {
        this.ids = this._prepareOrdersForRendering();

        return (
            <tbody>
                {
                    this.ids.map((order, index) => {
                        const _order = this.props.orders[order];
                        return (
                            <OrderRow key={ _order.id }
                                    id={ _order.id }
                                    date={ _order.date }
                                    price={ _order.price }
                                    onRef={ node => this.pushRowReference(node) }
                                    onLinkClick={ this._handleOrderLinkClick }
                                    onCheckStatusChange={ this._handleOrderChecking }
                                    onDelete={ this._handleSingleOrderDeletion }
                                    onLockedStatusChange={ this._handleOrderLocking }
                            />
                        )})
                }
            </tbody>
        );
    }
};

TBody.propTypes = {
    onOrdersUpdate: PropTypes.func,
    onOrderDeleting: PropTypes.func,
    onOrderLocking: PropTypes.func,
    onOrderChecking: PropTypes.func,
};

TBody.defaultProps = {
    onOrdersUpdate: () => undefined,
    onOrderDeleting: () => undefined,
    onOrderLocking: () => undefined,
    onOrderChecking: () => undefined,
};

const mapStateToProps = state => ({ orders: state.orders.orders });

export default connect(mapStateToProps, { deleteOrder, addTab, removeTab })(TBody);
