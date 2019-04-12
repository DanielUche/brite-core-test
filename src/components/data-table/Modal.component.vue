<template>
  <div  class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit DateTable Item</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field" :key="index" v-for="(column, index) in columns">
          <div v-if="column.editable">
            <label class="label">{{ column.name }}</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="item[column.name]"
                placeholder="Text input">
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          :class="asyncTask === 'pending' ? 'button is-success  is-loading' : 'button is-success '"
          @click="edit()">Save changes</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    asyncTask: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  watch: {
    asyncTask(val) {
      switch (val) {
        case 'success':
          this.$emit('close');
          break;
        case 'pending':
          break;
        case 'failed':
          break;
        default: throw new Error('Invalid request state');
      }
    },
  },
  data() {
    return {
      editedItem: {},
    };
  },
  methods: {
    edit() {
      this.editedItem = this.item;
      this.$emit('dataTableUpdated', this.editedItem);
    },
  },
};
</script>
