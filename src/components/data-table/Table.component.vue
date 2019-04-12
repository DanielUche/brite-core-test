<template>
  <div>
    <table class="table is-striped is-hoverable is-bordered is-fullwidth">
      <thead>
        <tr>
          <th :key="`th-${cid}`" v-for="(column, cid) in columns"> {{ column.name }} </th>
            <th v-if="hasActions">
              Actions
            </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
        >
          <td
            :key="`td-${cid}`"
            v-for="(column, cid) in columns"> {{ item[`${column.name}`] }}
          </td>
          <td v-if="hasActions">
            <div class="buttons are-small">
              <a
                class="button is-primary"
                @click="$emit('editDatatableItem', item)">Edit</a>
              <a class="button is-danger"
                @click="$emit('deleteDataTableItem', item)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    hasActions: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
