<template>
  <div>
    <table class="table is-striped is-narrow is-hoverable is-bordered is-fullwidth">
      <thead>
        <tr>
          <th
            :key="`th-${cid}`"
            v-for="(column, cid) in columns"
            @click="sortItem(column.name, sort[column.name])">
            {{ column.name }} 
             <v-icon name="sort-amount-down" v-if="sort[column.name] === 'asc'"/>
             <v-icon name="sort-amount-up" v-else-if="sort[column.name] === 'desc'"/>
            <v-icon name="sort" v-else/>  
          </th>
          <th v-if="hasActions">
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length">
        <tr
          v-for="(item, index) in sortedItems"
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
      <tbody v-else>
        <tr>
          <td :colspan="columns.length + 1" >
              No record found in the table
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import * as _ from 'lodash';

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
  data() {
    return {
      sort: {},
      sortedItems: [],

    };
  },
  methods: {
    _sortItem(column, direction){
      this.sortedItems = _.orderBy(this.data, [column], [direction]);
    },
    sortItem(column, sorted) {
      switch (this.sort[column]) {
        case 'asc':
          this.sort[column] = 'desc';
          break;
        case 'desc':
          this.sort[column] = 'asc';
          break;
        default: this.sort[column] = 'asc';
      }
      this._sortItem(column, this.sort[column]);
    },
  },
  created() {
    this.sortedItems = this.data;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
