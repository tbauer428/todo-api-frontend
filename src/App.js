import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Todo from "./components/Todo";
import Input from "./components/Input";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  parseTodos = () => {};

  loadTodos = e => {
    axios.get("/todos").then(response => {
      const data = Object.values(response.data);
      // const data = Object.keys(response.data).map(function(key) {
      //   return [String(key), response.data[key]];
      // });
      this.setState({
        data: data
      });
    });
  };

  handleDelete = (e, id) => {
    axios.delete(`/todos/delete/${id}`);
    this.loadTodos(e);
  };

  handleEdit = (e, id, completed, text) => {
    axios
      .put(`/todos/${id}`, {
        id: id,
        todoText: text,
        completed: completed
      })
      .then(() => this.loadTodos());
  };

  handleComplete = (e, id, completed, text) => {
    axios
      .put(`/todos/${id}`, {
        id: id,
        todoText: text,
        completed: !completed
      })
      .then(() => this.loadTodos());
  };

  handleNewTodo = input => {
    axios
      .post(`/todos/add`, {
        todoText: input,
        completed: false
      })
      .then(() => this.loadTodos());
  };

  render() {
    return (
      <div className="App">
        <div>#todo-api</div>
        <div onClick={e => this.loadTodos()}>load todos</div>
        <Input placeholder="Enter a New Todo" submit={this.handleNewTodo} />
        {this.state.data.map(todo => {
          return (
            <Todo
              todo={todo}
              handleComplete={this.handleComplete}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          );

          // const [editText, setEditText] = useState("");
          // const [inEditMode, setEditMode] = useState("");
          // return (
          //   <div
          //     key={todo.id}
          //     className={todo.completed ? "complete" : "incomplete"}
          //   >
          //     <input
          //       type="checkbox"
          //       onClick={e =>
          //         this.handleComplete(e, todo.id, todo.completed, todo.todoText)
          //       }
          //     />
          //     {todo.todoText}
          //     <button onClick={e => this.handleDelete(e, todo.id)}>
          //       Delete Todo
          //     </button>
          //     <button onClick={e => setEditText()}>Edit Todo</button>
          //   </div>
          // );
        })}
        <div />
      </div>
    );
  }
}

export default App;
