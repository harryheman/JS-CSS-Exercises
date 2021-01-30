<template>
  <form class="form" @submit.prevent="onSubmit">
    <input
      :id="id"
      class="input"
      ref="labelInput"
      type="text"
      autocomplete="off"
      v-model.lazy.trim="newLabel"
    />
    <button class="btn warning" @click="onCancel">
      Cancel
    </button>
    <button type="submit" class="btn success">
      Save
    </button>
  </form>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newLabel: this.label
    }
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit('item-edited', this.newLabel)
      }
    },
    onCancel() {
      this.$emit('edit-cancelled')
    }
  },
  mounted() {
    const labelInputRef = this.$refs.labelInput
    labelInputRef.focus()
  }
}
</script>
