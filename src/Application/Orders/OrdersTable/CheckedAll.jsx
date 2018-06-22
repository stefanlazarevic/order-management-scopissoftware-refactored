import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';

class CheckedAll extends Component {
    state = {
        checked: false,
    }

    check = () => this.setState({ checked: true });

    uncheck = () => this.setState({ checked: false });
    
    render = () => (
         <Checkbox  inputRef={ ref => { this.checkbox = ref } } 
                    onClick={ () => this.state.checked ? 
                                    (this.uncheck() || this.props.onCheckStatusChange(false)) : 
                                    (this.check() || this.props.onCheckStatusChange(true)) }
        />
    )
}

export default CheckedAll;