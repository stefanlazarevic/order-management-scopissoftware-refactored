import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

// Local components
import THead from './ItemsTable/THead.jsx';
import TFoot from './ItemsTable/TFoot.jsx';
import TBody from './ItemsTable/TBody.jsx';

class ItemsTable extends Component {
    getItems = () => this.tbody.getItems();

    render = () => (
        <Table responsive>
            <THead ref={ thead => (this.thead = thead) } total={ this.props.items.length } />
            <TFoot />
            <TBody  ref={ tbody => (this.tbody = tbody) }
                    items={ this.props.items }
                    onItemAdded={ () => this.thead.incrementTotal() }
                    onItemRemoved={ () => this.thead.decrementTotal() }
                    onUpdate={ items => this.props.onChange(items) } />
        </Table>
    )
};

export default ItemsTable;
