<template>
  <div class="item" v-if="!isEditing">
    <input
      type="checkbox"
      class="checkbox"
      :id="id"
      :checked="isDone"
      @change="$emit('checkbox-changed')"
    />
    <label :for="id" class="text" :class="isDone && 'completed'">{{
      label
    }}</label>
    <button
      class="btn info"
      :class="isDone && 'disabled'"
      ref="editButton"
      @click="toggleToItemEditForm"
    >
      Update
    </button>
    <button class="btn danger" @click="deleteToDo">
      Delete
    </button>
  </div>
  <to-do-item-edit-form
    v-else
    :id="id"
    :label="label"
    @item-edited="itemEdited"
    @edit-cancelled="editCancelled"
  ></to-do-item-edit-form>
</template>

<script>
import ToDoItemEditForm from './ToDoItemEditForm'

export default {
  components: {
    ToDoItemEditForm
  },
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String }
  },
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    isDone() {
      return this.done
    }
  },
  methods: {
    deleteToDo() {
      this.$emit('item-deleted')
    },
    toggleToItemEditForm() {
      console.log(this.$refs.editButton)
      this.isEditing = true
    },
    itemEdited(newLabel) {
      this.$emit('item-edited', newLabel)
      this.isEditing = false
      this.focusOnEditButton()
    },
    editCancelled() {
      this.isEditing = false
      this.focusOnEditButton()
    },
    focusOnEditButton() {
      this.$nextTick(() => {
        const editButtonRef = this.$refs.editButton
        editButtonRef.focus()
      })
    }
  }
}
</script>
