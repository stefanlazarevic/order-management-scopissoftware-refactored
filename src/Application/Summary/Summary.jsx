
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Summary extends Component {
    constructor(props) {
        super(props);

        this.summary = {
            length: this.props.length || 0,
            tax: this.props.tax || 0,
            price: this.props.price || 0
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

    update = items => {
        const summary = {};

        summary.length = items.length;

        summary.price = items.reduce((acc, item) => {
            return acc += item.quantity * item.price;
        }, 0);

        summary.tax = summary.price * 0.15;

        this.summary = summary;
        this.forceUpdate();
    }

    render() {
        const { length, tax, price } = this.summary;

        return (
            <div className="Summary">
                <h3 style={{ margin: 0 }}>Totals</h3>
                <table className="Summary__table" style={{ width: '100%', marginTop: 15 }}>
                    <tfoot>
                        <tr>
                            <td>Total Value:</td>
                            <td>{ (price + tax).toFixed(2) }</td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Ext. Price:</td>
                            <td>{ price.toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Tax:</td>
                            <td>{ tax.toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
                <h5>Total items in Order: { length }</h5>
            </div>
        );
    }
};

Summary.propTypes = {
    length: PropTypes.number,
    price: PropTypes.number,
    tax: PropTypes.number,
};

export default Summary;
