import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TFoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: props.price
        };
    }

    updateTotalPrice = price => price !== this.state.price ? this.setState({ price }) : void 0;

    render = () => (
        <tfoot>
            <tr>
                <td colSpan={3}></td>
                <td className="text-right">
                    <ul style={ { listStyle: 'none' } }>
                        <li>
                            <strong>Total Price:</strong> { this.state.price.toFixed(2) }
                        </li>
                        <li>
                            <strong>Tax:</strong> { (this.state.price * 0.15).toFixed(2) }
                        </li>
                        <li>
                            <strong>Grand Total:</strong> { (this.state.price * 0.15 + this.state.price).toFixed(2) }
                        </li>
                    </ul>
                </td>
                <td></td>
            </tr>
        </tfoot>
    )
}

TFoot.propTypes = {
    price: PropTypes.number,
};

TFoot.defaultProps = {
    price: 0,
};

export default TFoot;
