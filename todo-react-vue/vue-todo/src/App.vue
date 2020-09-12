<template>
  <div id="app">
    <h2 class="text-center">Vue Todos App</h2>
    <input
          type="text"
          name="todo"
          class="form-control"
          placeholder="Add a new todo"
          v-model="newTodo"
    >
    <button
      :disabled="newTodo.length < 1"
      @click="edit ? modifyTodo() : addTodo()"
      class="btn btn-success"
    >
      {{ edit ? 'Update Todo' : 'Add Todo' }}
    </button>
    <ul class="list-group">
      <li
        class="list-group-item list-group-item-info"
        v-for="(todo, index) in todos"
        v-bind:key="todo.id"
    >
      {{ todo.name }}
      <button
        @click="updateTodo(index)"
        class="btn btn-primary"
      >
        Update Todo
      </button>
      <button
        @click="removeTodo(index)"
        class="btn btn-danger"
      >
        Remove Todo
      </button>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      edit: false,
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
  },
  methods: {
    addTodo() {
      const newTodo = {
        id: Date.now(),
        name: this.newTodo
      }
      const todos = this.todos
      todos.push(newTodo)
      this.newTodo = ''
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    updateTodo(index) {
    const todo = this.todos[index]
      this.edit = true
      this.index = index
      this.newTodo = todo.name
    },
    modifyTodo() {
      const todo = this.todos[this.index]
      todo.name = this.newTodo

      const modifiedTodo = this.todos
      modifiedTodo[this.index] = todo
      this.edit = false
      this.newTodo = ''
      this.index = null
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
