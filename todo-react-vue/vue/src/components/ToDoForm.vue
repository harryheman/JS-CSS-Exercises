<template>
  <form @submit.prevent="onSubmit" class="form">
    <input
      type="text"
      autocomplete="off"
      v-model.lazy.trim="label"
      class="input"
    />
    <button type="submit" class="btn">Add</button>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      if (this.label === '') {
        return
      }
      this.$emit('todo-added', this.label)
      this.label = ''
    }
  },
  data() {
    return {
      label: ''
    }
  }
}
</script>
