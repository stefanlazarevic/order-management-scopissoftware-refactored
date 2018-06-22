import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { openTab, removeTab, addTab } from '../Redux/Actions/Tabs';
import { saveOrder } from '../Redux/Actions/Orders';
 
// Local Components.
import FormRoot from './OrderForm/FormRoot.jsx';
import SectionHeader from './SectionHeader/SectionHeader.jsx';
import OrderRoot from './Orders/OrdersRoot.jsx';

class Root extends Component {
    /**========================================================
     * Local component state, determine if order form components should be rendered or order list.
     ========================================================*/
    state = {
        showCreateForm: false,
    };

    /**========================================================
     * Actions over local state.
     ========================================================*/
    showCreateForm = () => this.setState(state => ({ showCreateForm: true }));

    hideCreateForm = () => this.setState(state => ({ showCreateForm: false }));

    /**========================================================
     * Component render method.
     ========================================================*/
    render () {
        return (
            <Tabs id="tabs"
                    activeKey={ this.props.activeTabIndex }
                    defaultActiveKey={-1}
                    onSelect={ (index) => this.props.openTab(this.props.tabs[index]) }>
                {/* Always visible tab "Orders" */}
                <Tab eventKey={-1} title="Orders">
                    {
                        this.state.showCreateForm ?
                            (
                                <div>
                                    <SectionHeader headingType={2} title="Create new order" />
                                    <FormRoot onSave={
                                                    data => this.props.saveOrder(data) ||
                                                            this.hideCreateForm()
                                                }
                                                onCancel={ this.hideCreateForm } />
                                </div>
                            ) : <OrderRoot onCreateNewClick={ this.showCreateForm } />
                    }
                </Tab>
                {/* Generated tabs when order is opened. */}
                {
                    this.props.tabs.map(
                        (tab, index) => {
                            return (
                                <Tab key={ tab } eventKey={ index } title={ tab }>
                                    <FormRoot id={ tab }
                                                onSave={
                                                (data) => this.props.saveOrder(data) ||
                                                            this.props.removeTab(data.id)
                                                }
                                                onCancel={ () => this.props.removeTab(tab) } />
                                </Tab>
                            );
                        }
                    )
                }
            </Tabs>
        );
    }
};

const mapStateToProps = state => ({ tabs: state.tabs.tabs, activeTabIndex: state.tabs.activeTabIndex });

export default connect(mapStateToProps, { openTab, removeTab, addTab, saveOrder })(Root)
