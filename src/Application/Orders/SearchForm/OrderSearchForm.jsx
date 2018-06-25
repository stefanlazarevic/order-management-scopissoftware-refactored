import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilterBy } from '../../../Redux/Actions/Orders';

class OrderSearchForm extends Component {

    shouldComponentUpdate = nextProps => this.props.filterBy !== nextProps.filterBy;

    /**========================================================
     * If component is removed, make sure to clear timer for search.
     ========================================================*/
    componentWillUnmount = () => this.timeout ? clearTimeout(this.timeout) : undefined;

    /**========================================================
     * Main searching function. To prevent execution on each value change, add timeout < 500ms.
     * After timeout execute onSearch method passed as a property to component with value of search
     * input as paramether.
     ========================================================*/
    search = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.props.setFilterBy(this.searchInput.value.trim());
        }, 450);
    }

    /**========================================================
     * Component render method.
     ========================================================*/
    render = () => (
        <FormControl type="text"
                    placeholder="Search"
                    inputRef={ input => (this.searchInput = input) }
                    onChange={ this.search } />
    )
};

const mapStateToProps = state => ({ filterBy: state.orders.filterBy });

export default connect(mapStateToProps, { setFilterBy })(OrderSearchForm);
