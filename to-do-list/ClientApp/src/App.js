import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import DataTable from './components/List';
import ModalForm from './components/Modal'
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { CSVLink } from "react-csv"

import './custom.css'
import AddUsers from './components/AddUsers';

export default class App extends Component {
    static displayName = App.name;

    state = {
        items: []
    }

    getItems() {
        fetch('https://localhost:44352/api/Lists')
            .then(response => response.json())
            .then(items => this.setState({ items }))
            .catch(err => console.log(err))
    }

    addItemToState = (item) => {
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.items.slice(0, itemIndex),
            // add the updated item to the array
            item,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
    }

    componentDidMount() {
        this.getItems()
    }

  render () {
      return (
          <Layout>
              <Container className="App">
                  <Row>
                      <Col>
                          <h1 style={{ margin: "20px 0" }}>Lista de Tarefas</h1>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <CSVLink
                              filename={"db.csv"}
                              color="primary"
                              style={{ float: "left", marginRight: "10px" }}
                              className="btn btn-primary"
                              data={this.state.items}>
                              Download CSV
            </CSVLink>
                          <ModalForm buttonLabel="Adicionar" addItemToState={this.addItemToState} />
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                      </Col>
                  </Row>
              </Container>
              <Route path='/add/user' component={AddUsers}/>
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
              </Layout>
    );
  }
}
