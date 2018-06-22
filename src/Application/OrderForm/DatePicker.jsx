import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const monthStartDate = moment().startOf('month');
const monthEndDate = moment().endOf('month');

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date ? moment(this.props.date) : moment(),
        };
    }

    onChange = date => this.setState(state => ({ date }));

    getDate = () => this.state.date.format('MM-DD-YYYY');

    render() {
        return <ReactDatePicker fixedHeight className="form-control"
                minDate={ monthStartDate }
                maxDate={ monthEndDate }
                selected={ this.state.date }
                onChange={ this.onChange }
                style={ { marginTop: 20 } } />
    }
};

DatePicker.propTypes = {
    date: PropTypes.string,
};

export default DatePicker;
