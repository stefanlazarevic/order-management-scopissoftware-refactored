import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxStore from './Redux/store';
import Root from './Application/Root.jsx';
import { Grid, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider store={ ReduxStore }>
        <Grid style={ { marginTop: 20 } }>
            <Row>
                <Col xs={12}>
                    <Root />
                </Col>
            </Row>
        </Grid>
    </Provider>,
    document.getElementById('root')
);
