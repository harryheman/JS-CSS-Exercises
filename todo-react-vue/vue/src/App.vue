<template>
  <div id="app">
    <h1 class="title">Vue Todos App</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <h2 id="counter" class="counter" ref="summary" tabindex="-1">
      {{ summary }}
    </h2>
    <ul aria-labelledby="counter" class="list">
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)"
        >
        </to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from './components/ToDoItem'
import ToDoForm from './components/ToDoForm'
import uniqueId from 'lodash.uniqueid'

export default {
  name: 'app',
  components: {
    ToDoItem,
    ToDoForm
  },
  data() {
    return {
      ToDoItems: [
        { id: uniqueId('todo-'), label: 'Eat', done: true },
        {
          id: uniqueId('todo-'),
          label: 'Sleep',
          done: false
        },
        { id: uniqueId('todo-'), label: 'Repeat', done: false }
      ]
    }
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({
        id: uniqueId('todo-'),
        label: toDoLabel,
        done: false
      })
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId)
      toDoToUpdate.done = !toDoToUpdate.done
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId)
      this.ToDoItems.splice(itemIndex, 1)
      this.$refs.summary.focus()
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId)
      toDoToEdit.label = newLabel
    }
  },
  computed: {
    summary() {
      const numberFinishedItems = this.ToDoItems.filter((item) => item.done)
        .length
      return `${numberFinishedItems} of ${this.ToDoItems.length} items completed`
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Stylish&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: stylish;
  font-size: 1rem;
  color: #222;
}

#app {
  max-width: 512px;
  margin: auto;
  text-align: center;
}

.title {
  font-size: 2.25rem;
  margin: 0.75rem;
}

.counter {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  outline: none;
  user-select: none;
}

.form {
  width: 100%;
  display: flex;
  margin-bottom: 0.25rem;
}

.input {
  flex: 1;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 1px inset #222;
  text-align: center;
  font-size: 1.15rem;
  margin: 0.5rem 0.25rem;
}

.input:focus {
  outline-color: #5bc0de;
}

.checkbox {
  width: 18px;
  height: 18px;
}

.btn {
  border: none;
  outline: none;
  background: #337ab7;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  color: #eee;
  margin: 0.5rem 0.25rem;
  cursor: pointer;
  user-select: none;
  width: 102px;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
}

.btn:active {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5) inset;
}

.btn.info {
  background: #5bc0de;
}

.btn.success {
  background: #5cb85c;
}

.btn.warning {
  background: #f0ad4e;
}

.btn.danger {
  background: #d9534f;
}

.btn.filter {
  background: none;
  color: #222;
  text-shadow: none;
  border: 1px dashed #222;
  box-shadow: none;
}

.btn.filter.checked {
  border: 1px solid #222;
}

.list {
  list-style: none;
}

.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.item + .item {
  border-top: 1px dashed rgba(0, 0, 0, 0.5);
}

.text {
  flex: 1;
  font-size: 1.15rem;
  margin: 0.5rem;
  padding: 0.5rem;
  background: #eee;
  border-radius: 4px;
}

.text.completed {
  text-decoration: line-through;
  color: #888;
}

.disabled {
  opacity: 0.8;
  position: relative;
  z-index: -1;
}
</style>
