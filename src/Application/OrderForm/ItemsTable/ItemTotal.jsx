import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemTotal extends Component {
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

    updateTotal = total => this.setState(state => ({ total }));

    render() {
        return (
            <span>{ this.state.total }</span>
        );
    }
};

ItemTotal.propTypes = {
    onRef: PropTypes.func.isRequired,
};

export default ItemTotal;
