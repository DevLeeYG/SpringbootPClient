import { Container } from '@mui/material';
import React, { Component } from 'react';
import AddTodo from './component/AddTodo';
import Todo from './component/Todo';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  delete = (item) => {
    const thisItems = this.state.items;
    console.log('Before Update Items:', this.state.items);
    const newItems = thisItems.filter((e) => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      console.log('UpdateItems:', this.state.items);
    });
  };

  add = (item) => {
    const thisItem = this.state.items;
    item.id = 'ID-' + thisItem.length;
    item.done = false;
    thisItem.push(item);
    this.setState({ items: thisItem });
    console.log('items:', this.state.items);
  };

  render() {
    let todoItems = this.state.items.map((item, idx) => {
      return <Todo item={item} key={item.id} delete={this.delete} />;
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
