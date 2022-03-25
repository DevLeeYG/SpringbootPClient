import { Container } from '@mui/material';

import React, { Component } from 'react';
import AddTodo from './component/AddTodo';
import Todo from './component/Todo';
import { call } from './service/ApiSevice';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Conten-Typet': 'application/json' },
    };
    fetch('http://localhost:8080/todo', requestOptions)
      .then((res) => res.json())
      .then(
        (res) => {
          console.log(res.data);
          this.setState({ items: res.data });
        },
        (error) => {
          console.log(error);
          this.setState({ error });
        },
      );
  }
  add = (item) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(item),
    };
    fetch('http://localhost:8080/todo', requestOptions)
      .then((res) => res.json())
      .then((res) => this.setState({ items: res.data }));
  };

  delete = (item) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(item),
    };
    fetch('http://localhost:8080/todo', requestOptions)
      .then((res) => res.json())
      .then((res) => this.setState({ items: res.data }));
  };

  update = (item) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(item),
    };
    fetch('http://localhost:8080/todo', requestOptions)
      .then((res) => res.json())
      .then((res) => this.setState({ items: res.data }));
  };

  render() {
    let todoItems = this.state.items.map((item, idx) => {
      return (
        <Todo
          item={item}
          key={item.id}
          delete={this.delete}
          update={this.update}
        />
      );
    });
    return (
      <Container maxWidth="md">
        <AddTodo add={this.add} />
        <div className="App">{todoItems}</div>
      </Container>
    );
  }
}

export default App;
