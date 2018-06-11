import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

/**
 * OrderRow is component that represent table row in orders component. This component determine if order can be deleted
 * based on locked status or if it is selected.
 *
 * List of possible properties:
 * id,
 * price,
 * quantity,
 * locked,
 * checkedAll
 * checked,
 * onRef,
 * onLinkClick,
 * onCheckStatusChange,
 * onLockedStatusChange,
 * onDelete
 *
 * @class OrderRow
 * @extends Component
*/
class OrderRow extends Component {
    constructor(props) {
        super(props);

         /**======================================
         * Initital component state.
         ======================================*/
        this.state = {
            locked: this.props.locked,
            checked: this.props.checked,
        };
    }

    /**======================================
     * React life cycle events.
     ======================================*/
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

    /**======================================
     * Geters and setters.
     ======================================*/
    getLockedStatus = () => this.state.locked;

    getCheckedStatus = () => this.state.checked;

    getValue = () => ({
        id: this.props.id,
        price: this.props.price,
        quantity: this.props.quantity,
        locked: this.state.locked,
        checked: this.state.checked,
    });

    setCheckedStatus = checked => {
        if (!this.state.locked && checked !== this.state.checked) {
            this.setState(state => ({ checked }))
            this.props.onCheckStatusChange(checked, this.props.id);
        }
    };

    /**======================================
     * Component event listeners.
     ======================================*/
    _changeCheckedStatus = () => {
        this.setState(state => ({ checked: this.checkbox.checked }))
        this.props.onCheckStatusChange(this.checkbox.checked, this.props.id); // Callback function for changed 'checked' status.
    }

    _changeLockedStatus = () => {
        const locked = !this.state.locked;

        this.setState(state => ({
            locked,
            checked: false,
        }));

        this.props.onLockedStatusChange(locked, this.props.id); // Callback function for 'locked' changed status.
    }

    _handleLinkClick = () => this.state.locked ? undefined : this.props.onLinkClick(this.props.id);

    _handleOrderDeletion = () => this.state.locked ? undefined : this.props.onDelete(this.state.checked, this.props.id);

    /**======================================
     * Component Render method.
     ======================================*/
    render() {
        return (
            <tr ref="order">
                <td>
                    <Checkbox inputRef={ref => { this.checkbox = ref }}
                            checked={ this.state.checked && !this.state.locked }
                            onChange={ this._changeCheckedStatus }
                            disabled={ this.state.locked }
                    />
                </td>
                <td>
                    <a onClick={ this._handleLinkClick }>{ this.props.id }</a>
                </td>
                <td>
                    <time>{ this.props.date }</time>
                </td>
                <td className="text-right">
                    <span>{ this.props.price.toFixed(2) }</span>
                </td>
                <td className="text-right">
                    <ButtonGroup>
                        <Button onClick={ this._changeLockedStatus }>
                            <Glyphicon glyph={ `lock ${this.state.locked ? 'text-danger' : ''}` }/>
                        </Button>
                        {
                            this.state.locked ?
                                null :
                                <Button onClick={ this._handleOrderDeletion }>
                                    <Glyphicon glyph="trash"/>
                                </Button>
                        }
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
};

OrderRow.defaultProps = {
    locked: false,
    checked: false,
    price: 0,
    quantity: 0,
    date: 'N/A',
    onLinkClick: () => { console.warn('OrderRow.jsx@onLinkClick property is not defined.') },
    onCheckStatusChange: () => { console.warn('OrderRow.jsx@onCheckStatusChange property is not defined.') },
    onLockedStatusChange: () => { console.warn('OrderRow.jsx@onLockedStatusChange property is not defined.') },
    onDelete: () => { console.warn('OrderRow.jsx@onDelete property is not defined.') },
};

OrderRow.propTypes = {
    id: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    checked: PropTypes.bool,
    price: PropTypes.number,
    quantity: PropTypes.number,
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    onLinkClick: PropTypes.func,
    onCheckStatusChange: PropTypes.func,
    onLockedStatusChange: PropTypes.func,
    onDelete: PropTypes.func,
};

export default OrderRow;
