import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Button,
  Grid,
} from '@material-ui/core';
import { TextField } from '@mui/material';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: '' } };
    this.add = props.add;
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: '' } });
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <TextField
            onChange={this.onInputChange}
            value={this.state.item.title}
            placeholder="Add Todo here"
            fullWidth
          />
        </Grid>
        <Grid xs={1} md={1} item>
          <Button
            onClick={this.onButtonClick}
            fullWidth
            color="secondary"
            variant="outlined"
          >
            +
          </Button>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
