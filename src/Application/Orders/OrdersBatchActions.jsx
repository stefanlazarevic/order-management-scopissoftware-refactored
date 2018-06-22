import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

class OrdersBatchActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            records: props.records,
            toDelete: 0,
        };
    }

    /**========================================================
     * Getters and Setters.
     ========================================================*/
    getRecords = () => this.state.records;

    getToDelete = () => this.state.toDelete;

    setRecords = records => this.setState({ records });

    setToDelete = toDelete => this.setState({ toDelete });

    /**========================================================
     * Helper inc/dec functions for faster manipulation of toDelete state.
     ========================================================*/
    incrementToDelete = () => this.setState(state => ({ toDelete: state.toDelete + 1 }));

    decrementToDelete = () => this.setState(state => ({ toDelete: state.toDelete > 0 ? state.toDelete - 1 : 0 }));

    render = () => (
        <Row>
            <Col md={6}>
                Records: { this.state.records }
            </Col>
            <Col md={6} className="text-right" style={ { marginTop: 20 } }>
                <Button onClick={ () => {
                    this.props.onButtonClick()
                    this.setToDelete(0);
                    } }>({ this.state.toDelete }) Delete</Button>
            </Col>
        </Row>
    )
}

OrdersBatchActions.propTypes = {
    records: PropTypes.number
};

OrdersBatchActions.defaultProps = {
    records: 0,
};

export default OrdersBatchActions;
