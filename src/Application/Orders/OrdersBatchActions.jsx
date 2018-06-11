import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

class OrdersBatchActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            records: props.records || 0,
            toDelete: 0,
        };
    }

    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this);
        }
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined);
        }
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

    render() {
        return (
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
        );
    }
}

export default OrdersBatchActions;
