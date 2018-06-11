import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

class OrderSearchForm extends Component {
    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this)
        }
    }

    /**========================================================
     * If component is removed, make sure to clear timer for search.
     ========================================================*/
    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined)
        }
    }

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
            this.props.onSearch(this.searchInput.value);
        }, 450);
    }

    /**========================================================
     * Component render method.
     ========================================================*/
    render() {
        return (
            <FormControl type="text"
                        placeholder="Search"
                        inputRef={ input => (this.searchInput = input) }
                        onChange={ this.search } />
        );
    };
};

OrderSearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default OrderSearchForm;
