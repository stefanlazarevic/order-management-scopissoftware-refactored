import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

export default props => (
    <ButtonToolbar style={ { backgroundColor: '#eee', padding: '10px 0' } }>
        <Button onClick={ props.onSave } bsStyle="primary">Save</Button>
        <Button onClick={ props.onCancel }>Cancel</Button>
    </ButtonToolbar>
);
