import React, { Component } from 'react';

// Local components.
import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import Orders from './Orders.jsx';

class OrderRoot extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div>
                <SectionHeader headingType={2}
                               title="Orders"
                               includeActionButton={ true }
                               actionButtonText={ 'Create New' }
                               onActionButtonClick={ this.props.onCreateNewClick }/>
                <Orders />
            </div>
        );
    }
};

export default OrderRoot;
