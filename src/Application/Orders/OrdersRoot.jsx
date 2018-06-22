import React from 'react';

// Local components.
import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import Orders from './Orders.jsx';

export default props => (
    <div>
        <SectionHeader  headingType={2}
                        title="Orders"
                        includeActionButton={ true }
                        actionButtonText={ 'Create New' }
                        onActionButtonClick={ props.onCreateNewClick }/>
        <Orders />
    </div>
);
