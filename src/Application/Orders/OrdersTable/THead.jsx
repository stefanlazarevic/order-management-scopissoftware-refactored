import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local components.
import TH from './TH.jsx';
import CheckedAll from './CheckedAll.jsx';

class THead extends Component {
    render = () => (
        <thead>
            <tr>
                <th>
                    <CheckedAll ref={ checkAll => (this.checkAll = checkAll) } 
                                onCheckStatusChange={ checked => this.props.onCheckedAllStatusChange(checked) } />
                </th>
                <TH text="Order Number" orderable={true} orderBy="id" orderedBy={ this.props.orderBy } setOrderBy={ this.props.setOrderBy }/>
                <TH text="Date" orderable={true} orderBy="date" orderedBy={ this.props.orderBy } setOrderBy={ this.props.setOrderBy }/>
                <TH textRight={ true } text="Price" orderable={true} orderBy="price" orderedBy={ this.props.orderBy } setOrderBy={ this.props.setOrderBy }/>
                <TH textRight={ true } text="Actions" />
            </tr>
        </thead>
    )
};

THead.propTypes = {
    onCheckboxChange: PropTypes.func,
};

THead.defaultProps = {
    onCheckboxChange: () => console.warn('THead onCheckboxChange is not defined.'),
};

export default THead;
