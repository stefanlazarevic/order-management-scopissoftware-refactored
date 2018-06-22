import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local components
import ItemRow from './ItemRow.jsx';

function generateUID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

class TBody extends Component {
    constructor(props) {
        super(props);

        this.itemComponents = [];

        this.state = {
            items: this.props.items || [],
        };
    }

    addItemRef = (node, index) => {
        if (node) {
            this.itemComponents[index] = node;
        } else {
            this.itemComponents.length = this.itemComponents.length - 1;
        }
    }

    getItems = () => this.itemComponents.map(item => item.getValue());

    addItem = () => {
        const item = {
            id: generateUID(),
            product: '',
            quantity: 0,
            price: 0,
        };

        this.setState(state => {
            const items = [
                item,
                ...state.items,
            ];
            return { items };
        });

        if (typeof this.props.onItemAdded === 'function') {
            this.props.onItemAdded(item);
        }
    }

    removeItem = index => {
        this.setState(state => {
            const items = [
                ...state.items.slice(0, index),
                ...state.items.slice(index + 1)
            ];

            return { items };
        });

        if (typeof this.props.onItemRemoved === 'function') {
            this.props.onItemRemoved();
        }
    }

    componentDidUpdate = () => this.props.onUpdate(this.getItems());

    renderItemsView = () => {
        const thisRef = this;
        return this.state.items.map((item, index) => {
            return <ItemRow key={ item.id }
                            id={ item.id }
                            ref={ node => thisRef.addItemRef(node, index) }
                            product={ item.product }
                            quantity={ item.quantity }
                            price={ item.price }
                            onDataChange={ data => this.props.onUpdate(this.getItems()) }
                            onDelete={ () => this.removeItem(index) } />
        });
    }

    renderNoItemsView = () => (
        <tr>
            <td colSpan={5}>
                <h4>No items.</h4>
                <button onClick={ this.addItem }>Add item</button>
            </td>
        </tr>
    );

    render = () => (
        <tbody>
            { this.state.items.length ? this.renderItemsView() : this.renderNoItemsView() }
        </tbody>
    );
};

TBody.propTypes = {
    onItemAdded: PropTypes.func,
    onItemRemoved: PropTypes.func,
};

export default TBody;
