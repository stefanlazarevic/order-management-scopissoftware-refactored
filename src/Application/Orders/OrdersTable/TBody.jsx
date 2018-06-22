import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTab, removeTab } from '../../../Redux/Actions/Tabs';
import { deleteOrder } from '../../../Redux/Actions/Orders';

import OrderRow from './OrderRow.jsx';

class TBody extends Component {
    orderReferences = {};

    shouldComponentUpdate = nextProps => {
        return this.props.orderBy !== nextProps.orderBy ||
               this.props.orders.length !== nextProps.orders.length ||
               this.props.filterBy !== nextProps.filterBy;
    }

    componentDidUpdate() {
        this.props.onOrdersUpdate(this.props.orders);
    }

    /**
     * Logic behind order locking.
     * - Once order is locked deleting order should be imposible (Even through batch delete).
     * - Once order is locked order cannot be opened for editing and if tab is open it should close.
     * - Once order is locked it should be unchecked.
     */
    handleOrderLocking = (locked, id) => {
        if (locked) {
            this.props.removeTab(id);
            this.props.onOrderLocking(locked, id); // Callback function for order locking.
        }
    }

    handleOrderChecking = (checked, id) => {
        this.props.onOrderChecking(checked, id);
    }

    handleOrderDeletion = (batchType = 'single', id) => {
        if (batchType === 'single') {
            const order = this.orderReferences[id];
            this.props.deleteOrder(id);
            this.removeRowReference(id);
            this.props.onOrderDeleting(order.state.checked); // Callback function for order deleting.
        } else if (batchType === 'multiple') {
            const ids = Object.keys(this.orderReferences).filter(id => {
                const order = this.orderReferences[id];
                return order.state.checked && !order.state.locked;
            }).map(order => order.id);
            this.props.deleteOrder(ids);
            this.removeRowReference(ids);
        }
    }

    removeRowReference = ids => {
        if (typeof ids === 'string') {
            delete this.orderReferences[ids];
        } 

        if (Object.prototype.toString.call(ids) === '[object Array]') {
            ids.forEach(id => delete this.orderReferences[id]);
        }
    }

    setCheckedStatusToAllOrders = checked => {
        Object.keys(this.orderReferences).forEach(id => {
            const order = this.orderReferences[id]
            if (order) {
                order.setCheckedStatus(checked);   
            }
        });
    }

    render = () => (
        <tbody>
            { 
                this.props.orders.map(order => <OrderRow key={ order.id }
                                                        id={ order.id }
                                                        ref={ o => { this.orderReferences[order.id] = o } }
                                                        date={ order.date } 
                                                        price={ order.price } 
                                                        onLinkClick={ () => this.props.addTab(order.id) }
                                                        onLockedStatusChange={ this.handleOrderLocking }
                                                        onCheckStatusChange={ this.handleOrderChecking }
                                                        onDelete={ () => this.handleOrderDeletion('single', order.id) } 
                                                />)
            }
        </tbody>
    );      
}

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

const mapStateToProps = state => {
    const orders = Object.keys(state.orders.orders).filter(id => {
        const filterPattern = state.orders.filterBy;
        const regexp = new RegExp(`^${filterPattern.toUpperCase()}|ORD-${filterPattern}`);
        return regexp.test(id);
    }).sort((id, id2) => {
        const order1 = state.orders.orders[id];
        const order2 = state.orders.orders[id2];

        switch (state.orders.orderBy) {
            case 'price': return order1.price - order2.price;
            case 'date': return new Date(order1.date) - new Date(order2.date);
            default: return 0;
        }
    }).map((id, index) => {
        return state.orders.orders[id];
    });

    return { 
        orderBy: state.orders.orderBy,
        filterBy: state.orders.filterBy,
        orders 
    };
}

export default connect(mapStateToProps, { addTab, removeTab, deleteOrder }, null, { withRef: true })(TBody);