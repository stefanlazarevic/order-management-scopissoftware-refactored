import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

// Local components.
import OrderSearchForm from './SearchForm/OrderSearchForm.jsx';
import OrdersTable from './OrdersTable.jsx';
import OrdersBatchActions from './OrdersBatchActions.jsx';

/**
 * Orders component is a main wrapper for all orders.
 * From this component you can access following references to inner components.
 *
 * ordersTable - OrdersTable component reference.
 * batch - OrdersBatchActions component reference.
 *
 * @class Orders
 * @extends {Component}
 */
class Orders extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={4} xsOffset={12} mdOffset={8}>
                    <OrderSearchForm onSearch={ (term) => this.ordersTable.tbody.setFilterBy(term) }/>
                </Col>
                <Col xs={12}>
                    <OrdersBatchActions onRef={ batch => (this.batch = batch) }
                                        onButtonClick={ () => this.ordersTable.tbody.deleteOrders('multiple') } />
                    <OrdersTable onRef={ ordersTable => ( this.ordersTable = ordersTable ) }
                                 onOrderChecking={ checked => checked ? this.batch.incrementToDelete() : this.batch.decrementToDelete() }
                                 onOrderLocking={ locked => locked ? this.batch.decrementToDelete() : undefined }
                                 onOrderDeleting={ checked => checked ? this.batch.decrementToDelete() : undefined }
                                 onOrdersUpdate={ orders => {
                                    this.batch.setRecords(orders.length)
                                    this.batch.setToDelete(orders.reduce((acc, order) => { return acc += order.checked ? 1 : 0 }, 0 ));
                                 }}
                    />
                </Col>
            </Row>
        );
    }
};

export default Orders;
