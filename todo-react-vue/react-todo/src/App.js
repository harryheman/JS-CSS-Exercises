import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      newTodo: '',
      index: null,
      todos: [
        {
          id: 1,
          name: 'todo1'
        },
        {
          id: 2,
          name: 'todo2'
        },
        {
          id: 3,
          name: 'todo3'
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this)

    addTodo() {
      const newTodo = {
        id: Date.now(),
        name: this.state.newTodo
      }
      const todos = this.state.todos
      todos.push(newTodo)
      this.setState({
        todos: todos,
        newTodo: '',
        edit: false
      })
    }

    removeTodo(index) {
      const todos = this.state.todos
      todos.splice(index, 1)

      this.setState({
        todos: todos
      })
    }

    updateTodo(index) {
      const todo = this.state.todos[index]
      this.setState({
        edit: true,
        newTodo: todo.name,
        index: index
      })
    }

    modifyTodo() {
      const todo = this.state.todos[this.state.index]
      todo.name = this.state.newTodo

      const modifiedTodo = this.state.todos
      modifiedTodo[this.state.index] = todo
      this.setState({
        todos: modifiedTodo,
        edit: false,
        newTodo: '',
        index: null
      })
    }
  }

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <h2 className="text-center">React Todos App</h2>
        <input
          type="text"
          name="todo"
          className="form-control"
          placeholder="Add a new todo"
          onChange={this.handleChange}
          value={this.state.newTodo}
        />
        <button
          disabled={this.state.newTodo.length < 1}
          className="btn btn-success"
          onClick={this.state.edit ? this.modifyTodo : this.addTodo}
        >
          {this.state.edit ? 'Update Todo' : 'Add Todo'}
        </button>
        <ul className="list-group">
          {this.state.todos.map((todo, index) => {
            return <li
                      key={todo.id}
                      className="list-group-item list-group-item-info"
                    >
                      {todo.name}
                      <button
                        className="btn btn-primary"
                        onClick={() => this.updateTodo(index)}
                      >
                        Update Todo
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.removeTodo(index)}
                      >
                        Remove Todo
                        </button>
                    </li>
          })}
        </ul>
      </div>
    )
  }
}

export default App;
