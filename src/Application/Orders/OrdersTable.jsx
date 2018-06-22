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
    _calculateTotalPrice = orders => orders.reduce((acc, order) => acc + order.price, 0);

    render = () => (
        <Table responsive>
            <THead  ref={ thead => (this.thead = thead) }
                    onCheckedAllStatusChange={ checked => this.tbody.wrappedInstance.setCheckedStatusToAllOrders(checked) }
            />
            <TFoot ref={ tfoot => (this.tfoot = tfoot) } />
            <TBody ref={ tbody => (this.tbody = tbody) }
                   onOrderChecking={ this.props.onOrderChecking }
                   onOrderDeleting={ this.props.onOrderDeleting }
                   onOrdersUpdate={ orders => {
                            this.tfoot.updateTotalPrice(this._calculateTotalPrice(orders));
                            this.props.onOrdersUpdate(orders);
                        }
                   }
            />
        </Table>
    )
};

export default OrdersTable;
