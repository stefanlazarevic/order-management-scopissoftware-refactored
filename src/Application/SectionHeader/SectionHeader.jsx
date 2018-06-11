import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

const SectionHeader = props => {
    const actionDiv = props.includeActionButton ?
        <Col md={ 6 } className="text-right">
            <Button className="section-header__button" onClick={ props.onActionButtonClick } style={{ marginTop: 10 }}>
                <Glyphicon glyph="plus" />
                <span> { props.actionButtonText }</span>
            </Button>
        </Col> : null;

    return (
        <Row className="section-header__row">
            <Col md={ props.includeActionButton ? 6 : 12 }>
                { React.createElement(`h${props.headingType}`, { style: { margin: '10px 0px' } }, props.title) }
            </Col>
            { actionDiv }
        </Row>
    );
};

SectionHeader.propTypes = {
    actionButtonText: PropTypes.string,
    onActionButtonClick: PropTypes.func,
    headingType: PropTypes.number,
    title: PropTypes.string,
    includeActionButton: PropTypes.bool,
};

SectionHeader.defaultProps = {
    headingType: 3,
};

export default SectionHeader;
