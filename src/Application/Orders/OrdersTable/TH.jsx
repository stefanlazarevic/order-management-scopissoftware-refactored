import React from 'react';

export default props => (
    <th className={ props.textRight ? 'text-right' : 'text-left' }
        onClick={ props.orderable ? () => props.setOrderBy(props.orderBy) : () => {} }>
        <span>{ props.text } </span>
        {
            props.orderable ?
                <span className={`caret ${props.orderedBy === props.orderBy ? 'text-danger' : ''}`}></span>
                : null
        }
    </th>
);
