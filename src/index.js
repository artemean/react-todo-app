import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    enteredValue: "",
    todoList: []
  };
  addTodo(value) {
    this.setState({
      todoList: [
        ...this.state.todoList,
        { id: this.state.todoList.length, value, isDone: false }
      ]
    });
  }
  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.addTodo(event.target.value);
      this.inp.value = "";
    }
  };
  removeTodo = id => () => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(el => el.id !== id)
    }));
  };
  toggleDone = id => () => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(el => {
        return el.id === id ? { ...el, isDone: !el.isDone } : el;
      })
    }));
  };
  render() {
    console.log(this.state.todoList);
    return (
      <div className="App">
        <div className="add-field">
          <input
            placeholder="What needs to be done?"
            ref={inp => {
              this.inp = inp;
            }}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {this.state.todoList.length > 0 ? (
          <TodoList
            items={this.state.todoList}
            removeTodo={this.removeTodo}
            toggleDone={this.toggleDone}
          />
        ) : null}
      </div>
    );
  }
}

function TodoList({ items, removeTodo, toggleDone }) {
  return (
    <ul className="todos-list">
      {items.map(item => (
        <li>
          <input
            type="checkbox"
            checked={item.isDone}
            onChange={toggleDone(item.id)}
          />
          <span className={item.isDone ? "done-item" : ""}>{item.value}</span>
          <span onClick={removeTodo(item.id)} className="remove-icon" />
        </li>
      ))}
    </ul>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
