import React, { Component } from 'react';

class THead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: this.props.total || 0,
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

    incrementTotal = () => this.setState(state => ({ total: state.total + 1 }));

    decrementTotal = () => this.setState(state => ({ total: state.total - 1 }));

    setTotal = total => this.setState(state => ({ total }));

    render() {
        return (
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
        );
    }
};

export default THead;
