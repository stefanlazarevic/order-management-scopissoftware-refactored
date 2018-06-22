import React, { Component } from 'react';

class THead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: this.props.total || 0,
        };
    }

    incrementTotal = () => this.setState(state => ({ total: state.total + 1 }));

    decrementTotal = () => this.setState(state => ({ total: state.total - 1 }));

    setTotal = total => this.setState(state => ({ total }));

    render = () => (
        <thead>
            <tr className="tr--gray">
                <th colSpan={5}>Records: { this.state.total }</th>
            </tr>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="text-right">Extended Price</th>
                <th></th>
            </tr>
        </thead>
    )
};

export default THead;
