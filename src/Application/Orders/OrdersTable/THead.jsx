import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

// Local components.
import TH from './TH.jsx';

class THead extends Component {
    state = {
        orderBy: '',
    }

    componentDidMount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this)
        }
    }

    componentWillUnmount() {
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(undefined)
        }
    }

    setOrderBy = orderBy => {
        this.setState(state => ({ orderBy }));
        this.props.onOrdering(orderBy);
    };

    render() {
        return (
            <thead>
                <tr>
                    <th>
                        <Checkbox inputRef={ref => { this.checkbox = ref }}
                                  onChange={ () => this.props.onCheckboxChange(this.checkbox.checked) }/>
                    </th>
                    <TH text="Order Number" orderable={true} orderBy="id" orderedBy={ this.state.orderBy } setOrderBy={ this.setOrderBy }/>
                    <TH text="Date" orderable={true} orderBy="date" orderedBy={ this.state.orderBy } setOrderBy={ this.setOrderBy }/>
                    <TH textRight={ true } text="Price" orderable={true} orderBy="price" orderedBy={ this.state.orderBy } setOrderBy={ this.setOrderBy }/>
                    <TH textRight={ true } text="Actions" />
                </tr>
            </thead>
        );
    };
};

THead.propTypes = {
    onCheckboxChange: PropTypes.func,
    onOrdering: PropTypes.func,
};

THead.defaultProps = {
    onCheckboxChange: () => console.warn('THead onCheckboxChange is not defined.'),
    onOrdering: () => console.warn('THead onOrdering is not defined.'),
};

export default THead;
