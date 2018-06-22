import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOrderBy } from '../../../Redux/Actions/Orders';

class TH extends Component {
    shouldComponentUpdate = nextProps => {
        return this.props.orderable && (this.props.orderBy === this.props.orderedBy || this.props.orderBy === nextProps.orderedBy);
    }

    render = () => (
        <th className={ this.props.textRight ? 'text-right' : 'text-left' }
            onClick={ this.props.orderable ? () => this.props.setOrderBy(this.props.orderBy) : () => {} }>
            <span>{ this.props.text } </span>
            {
                this.props.orderable ?
                    <span className={`caret ${this.props.orderedBy === this.props.orderBy ? 'text-danger' : ''}`}></span>
                    : null
            }
        </th>
    );
}

TH.propTypes = {
    textRight: PropTypes.bool,
    orderable: PropTypes.bool,
    text: PropTypes.string.isRequired,
    orderBy: PropTypes.string,
};

TH.defaultProps = {
    textRight: false,
    orderable: false,
    orderBy: '',
};

const mapStateToProps = state => ({ orderedBy: state.orders.orderBy, });

export default connect(mapStateToProps, { setOrderBy })(TH);