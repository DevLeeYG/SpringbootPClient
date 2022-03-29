import { AppBar } from '@material-ui/core';
import {
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Paper,
  List,
} from '@mui/material';
import axios from 'axios';

import React, { Component } from 'react';
import AddTodo from './component/AddTodo';
import Todo from './component/Todo';
import { call, signout } from './service/ApiSevice';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    call('/todo', 'GET', null).then((response) =>
      this.setState({ items: response.data }),
    );
  }
  add = (item) => {
    console.log('1241', item);
    axios
      .post('http://localhost:8080/todo', item, {
        headers: { 'Content-Type': `application/json` },
      })
      .then((res) => console.log('1233123', res.json()));
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
    let todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    // navigationBar 추가
    let navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    /* 로딩중이 아닐 때 렌더링 할 부분 */
    let todoListPage = (
      <div>
        {navigationBar} {/* 네비게이션 바 렌더링 */}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    /* 로딩중일 때 렌더링 할 부분 */
    let loadingPage = <h1> 로딩중.. </h1>;

    let content = loadingPage;

    if (!this.state.loading) {
      /* 로딩중이 아니면 todoListPage를 선택*/
      content = todoListPage;
    }

    /* 선택한 content 렌더링 */
    return <div className="App">{content}</div>;
  }
}

export default App;
