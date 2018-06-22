import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import UniqueIdGenerator from '../../Helpers/UniqueIdGenerator';

// Local components
import FormActionSection from './FormActionSection.jsx';
import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import DatePicker from './DatePicker.jsx';
import ItemsTable from './ItemsTable.jsx';
import Summary from '../Summary/Summary.jsx';

class FormRoot extends Component {
    /**========================================================
     * Before component mount, determine what would be next id based on the current list of orders.
     ========================================================*/
    componentWillMount() {
        const orders = JSON.parse(localStorage.getItem('RFE-orders')) || {};
        this.generator = UniqueIdGenerator(orders);

        const newOrder = {
            id: this.generator.getId(),
            date: null,
            price: 0,
            items: [],
        };

        this.order = orders[this.props.id] || newOrder;
    }

    /**========================================================
     * Generate order data in form based on the items and date.
     ========================================================*/
    getFormData() {
        const items = this.itemsTable.getItems();

        const price = items.reduce((acc, item) => {
            return acc += item.total;
        }, 0);

        this.order.date = this.datepicker.getDate();
        this.order.items = items;
        this.order.price = price;

        return this.order;
    }

    /**========================================================
     * Save form data.
     ========================================================*/
    save = () => {
       this.props.onSave(this.getFormData());
       this.generator.generate();
    }

    /**========================================================
     * Component render method.
     ========================================================*/
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <FormActionSection onSave={ this.save } onCancel={ this.props.onCancel }/>
                    <Row style={ { marginTop: 20 } }>
                        <Col xs={12} md={8}>
                            <FormGroup controlId="formHorizontalOrder">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Order No.:
                                </Col>
                                <Col sm={9}>
                                    <FormControl.Static>{ this.order.id }</FormControl.Static>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalDate">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Date:
                                </Col>
                                <Col sm={9}>
                                    <DatePicker date={ this.order.date } ref={ datepicker => (this.datepicker = datepicker) }/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalTax">
                                <Col componentClass={ ControlLabel } sm={3}>
                                    Tax:
                                </Col>
                                <Col sm={9}>
                                    <FormControl.Static>15%</FormControl.Static>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={4}>
                            <Summary ref={ summary => (this.summary = summary) }/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SectionHeader headingType={4}
                                title={ 'Items' }
                                includeActionButton={ true }
                                actionButtonText={ 'New Item' }
                                onActionButtonClick={ () => this.itemsTable.tbody.addItem() } />
                            <ItemsTable items={ this.order.items }
                                        ref={ itemsTable => (this.itemsTable = itemsTable) }
                                        onChange={ items => this.summary.update(items) }/>
                        </Col>
                    </Row>
                    <FormActionSection onSave={ this.save } onCancel={ this.props.onCancel }/>
                </Col>
            </Row>
        );
    }
};

export default FormRoot;
