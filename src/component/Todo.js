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
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };
    this.delete = props.delete;
  }
  deleteEventHandler = () => {
    this.delete(this.state.item);
  };

  offReadOnlyMode = () => {
    console.log('Event!', this.state.readOnly);
    this.setState({ readOnly: false }, () => {
      console.log('ReadOnly?', this.state.readOnly);
    });
  };

  enterKeyEventHandle = (e) => {
    if (e.key === 'Enter') {
      this.setState({ readOnly: true });
    }
  };

  editEventHandle = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  checkboxEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem });
  };

  render() {
    const item = this.state.item;

    return (
      <ListItem>
        <Checkbox
          onChange={this.checkboxEventHandler}
          checked={item.done}
          disableRipple
        />

        <ListItemText>
          <InputBase
            onKeyPress={this.enterKeyEventHandle}
            inputProps={{ 'aria-label': 'naked' }}
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandle}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
          />
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete Todo"
            onClick={this.deleteEventHandler}
          >
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;

{
  /* <div className="Todo">
  <input
    type="checkbox"
    id={this.state.item.id}
    name={this.state.item.id}
    checked={this.state.item.done}
  />
  <label id={this.state.item.id}>{this.state.item.title}</label>
</div>; */
}
