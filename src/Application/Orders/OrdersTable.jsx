import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

// Local components.
import THead from './OrdersTable/THead.jsx';
import TFoot from './OrdersTable/TFoot.jsx';
import TBody from './OrdersTable/TBody.jsx';

/**
 * OrdersTable component contains Table with all order records.
 * From this component you can access following references to inner components.
 *
 * tbody - TBody component reference.
 * tfoot - TFoot component reference.
 *
 * @class OrdersTable
 * @extends {Component}
 */
class OrdersTable extends Component {
    constructor() {
        super();

        this.checkedAll = false;
    }

    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this)
        }
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined)
        }
    }

    setCheckedAll = checkedAll => {
        this.checkedAll = checkedAll;
        this.tbody.checkAllRows(checkedAll);
    }

    getCheckedAll = () => this.checkedAll;

    _calculateTotalPrice = orders => orders.reduce((acc, order) => acc + order.price, 0);

    render() {
        return (
            <Table responsive>
                <THead onRef={ thead => (this.thead = thead) }
                       onOrdering={ orderBy => this.tbody.setOrderBy(orderBy) }
                       onCheckboxChange={ checked => this.setCheckedAll(checked) }
                />
                <TFoot onRef={ tfoot => (this.tfoot = tfoot) } />
                <TBody onRef={ tbody => (this.tbody = tbody) }
                       checkedAll={ this.checkedAll }
                       onOrdersUpdate={ orders => {
                            this.tfoot.updateTotalPrice(this._calculateTotalPrice(orders));
                            this.props.onOrdersUpdate(orders);
                       }}
                       onOrderChecking={ this.props.onOrderChecking }
                       onOrderLocking={ this.props.onOrderLocking }
                       onOrderDeleting={ this.props.onOrderDeleting }
                />
            </Table>
        );
    }
};

export default OrdersTable;
