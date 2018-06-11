import React, { Component } from 'react';

class TFoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: props.price || 0
        }
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

    updateTotalPrice = price => this.setState({ price });

    render() {
        return (
            <tfoot>
                <tr>
                    <td colSpan={3}></td>
                    <td className="text-right">
                        <ul style={ { listStyle: 'none' } }>
                            <li><strong>Total Price:</strong> { this.state.price.toFixed(2) }</li>
                            <li><strong>Tax:</strong> { (this.state.price * 0.15).toFixed(2) }</li>
                            <li><strong>Grand Total:</strong> { (this.state.price * 0.15 + this.state.price).toFixed(2) }</li>
                        </ul>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        );
    }
}

export default TFoot;
