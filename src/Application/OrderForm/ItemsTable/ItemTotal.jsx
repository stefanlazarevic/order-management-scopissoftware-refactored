import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemTotal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: this.props.total,
        };
    }

    updateTotal = total => this.setState(state => ({ total }));

    render = () => <span>{ this.state.total }</span>
};

ItemTotal.propTypes = {
    total: PropTypes.number,
};

ItemTotal.defaultProps = {
    total: 0,
};

export default ItemTotal;
