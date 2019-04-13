<template>
  <div>
    <table class="table is-striped is-narrow is-hoverable is-bordered is-fullwidth">
      <thead>
        <tr>
          <th class="itemcolumn"
            :key="`th-${cid}`"
            v-for="(column, cid) in columns"
            @click="sortItem(column.name)">

            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  {{ column.name }}
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <p class="level-item">
                  <span class="tag is-white" style="color: rgb(171, 170, 170)">
                    <v-icon name="sort-amount-down" v-if="sort[column.name] === 'asc'"/>
                    <v-icon name="sort-amount-up" v-else-if="sort[column.name] === 'desc'"/>
                    <v-icon name="sort" v-else/>
                  </span>
                </p>
              </div>
            </nav>
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
import Icon from 'vue-awesome/components/Icon';

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
  watch: {
    data() {
      this.sortedItems = this.data;
    },
  },
  created() {
    this.sortedItems = this.data;
  },
  data() {
    return {
      sort: {},
      sortedItems: [],
    };
  },
  methods: {
    SortItem(column, direction) {
      this.sortedItems = _.orderBy(this.data, [column], [direction]);
    },
    sortItem(column) {
      switch (this.sort[column]) {
        case 'asc':
          this.sort[column] = 'desc';
          break;
        case 'desc':
          this.sort[column] = 'asc';
          break;
        default: this.sort[column] = 'asc';
      }
      this.SortItem(column, this.sort[column]);
    },
  },
  components: {
    'v-icon': Icon
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .sort {
    color: rgb(171, 170, 170);
  }
  .itemcolumn {
    cursor: pointer;
  }
</style>
