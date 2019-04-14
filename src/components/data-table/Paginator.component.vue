<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="select is-small">
            <select
              v-model="pagination.itemPerPage"
              @change="onLengthChange($event)">
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div class="level-item">
          <p class="subtitle is-5">
             Items Per Page
          </p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <input
            class="input is-small"
            v-model="searchValue"
            v-on:keyup="searchList(searchValue)"
            type="text"
            placeholder="Search List">
        </div>
        <div class="level-item">
          <div class="select is-small">
            <select
              v-model="exportType"
              @change="setExportType($event)">
              <option value="" selected>Select Formats</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
            </select>
          </div>
          <div class="level-item">
            <button
              @click="download()"
              style="margin-left:5px"
              class="button is-small is-primary">Export</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <Table
          :data="paginatedItems"
          :columns="columns"
          @editDatatableItem="editDataTableHandler"
          @deleteDataTableItem="deleteDataTableHandler"
          hasActions/>
      </div>
    </div>
    <div>
      <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <a
            class="pagination-previous"
            v-on:click="selectPage(pagination.currentPage > 1 ? pagination.currentPage-1 : 1)"
                :disabled="this.pagination.currentPage===
                  this.pagination.items[0] || this.pagination.items.length==0"
                >Previous</a>
        <a
            class="pagination-next"
            v-on:click="selectPage(pagination.currentPage != pagination.items.length
              ? pagination.currentPage+1 :pagination.items.length)"
            :disabled="this.pagination.currentPage===
              this.pagination.items[this.pagination.items.length-1] ||
              this.pagination.items.length===0">Next page</a>
        <ul class="pagination-list">
          <li>
            <a
              class="pagination-link"
              v-on:click="selectPage(pagination.items[0])"
              :disabled="this.pagination.currentPage===
                this.pagination.items[0] || this.pagination.items.length==0">First</a>
          </li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li :key="`item-${index}`" v-for="(item, index) in pagination.filteredItems">
            <a
              class="pagination-link"
              v-on:click="selectPage(item)"
              v-bind:class="{'is-current': item === pagination.currentPage}">
              {{item | numeral}}
            </a>
          </li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li>
            <a
                class="pagination-link"
                v-on:click="selectPage(pagination.items[pagination.items.length-1])"
                :disabled="this.pagination.currentPage===
                  this.pagination.items[this.pagination.items.length-1] ||
                  this.pagination.items.length===0">
              Last
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <Modal
      v-if="showModal"
      @close="toggleModal()"
      :item="selectedItem"
      :columns="columns"
      @dataTableUpdated="updateDataTable"
      :asyncTask="asyncTask"
      />
  </div>
</template>

<script>
import * as _ from 'lodash';
import XlsExport from 'xlsexport';

import Table from './Table.component.vue';
import Modal from './Modal.component.vue';

export default {
  props: {
    asyncTask: {
      type: String,
      required: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    keyField: {
      type: String,
      required: false,
    },
    hasActions: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    Table,
    Modal,
  },
  data() {
    return {
      exportType: '',
      paginatedItems: [],
      searchValue: '',
      selectedItem: {},
      showModal: false,
      pagination: {
        range: 10,
        currentPage: 1,
        itemPerPage: 15,
        items: [],
        filteredItems: [],
      },
      filtered: [],
    };
  },
  watch: {
    items() {
      this.filteredItems = this.items;
      this.buildPagination();
      this.selectPage(this.pagination.currentPage);
    },
  },
  created() {
    this.filteredItems = this.items;
    this.buildPagination();
    this.selectPage(1);
    // if hasacttion is provided the user must provide a key
    // else threow an error
    if (this.hssActions && !this.keyField) {
      throw new Error('Provide a valid key field');
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal || false;
    },
    onLengthChange(event) {
      this.pagination.itemPerPage = event.target.value;
      this.buildPagination();
      this.selectPage(1);
    },
    setExportType(event) {
      const { value } = event.target;
      this.exportType = value;
    },
    download() {
      const xls = new XlsExport(this.filteredItems, 'DataTable');
      switch (this.exportType) {
        case 'excel':
          xls.exportToXLS('datatable.xlsx');
          break;
        case 'csv':
          xls.exportToCSV('datatable.csv');
          break;
        default: throw new Error('Invalid format selected');
      }
    },
    searchList(searchText) {
      if (_.isUndefined(searchText)) {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = _.filter(this.items, v => v.Description.toLowerCase()
          .indexOf(searchText.toLowerCase()) > -1);
      }
      this.buildPagination();

      if (_.isUndefined(this.currentPage)) {
        this.selectPage(1);
      } else {
        this.selectPage(this.currentPage);
      }
    },
    buildPagination() {
      const numberOfPage = Math.ceil(this.filteredItems.length / this.pagination.itemPerPage);
      this.pagination.items = [];
      for (let i = 0; i < numberOfPage; i++) {
        this.pagination.items.push(i + 1);
      }
    },
    selectPage(item) {
      this.pagination.currentPage = item;
      let start = 0;
      let end = 0;
      if (this.pagination.currentPage < this.pagination.range - 2) {
        start = 1;
        end = start + this.pagination.range - 1;
      } else if (this.pagination.currentPage <= this.pagination.items.length
        && this.pagination.currentPage > this.pagination.items.length - this.pagination.range + 2) {
        start = this.pagination.items.length - this.pagination.range + 1;
        end = this.pagination.items.length;
      } else {
        start = this.pagination.currentPage - 2;
        end = this.pagination.currentPage + 2;
      }
      if (start < 1) {
        start = 1;
      }
      if (end > this.pagination.items.length) {
        end = this.pagination.items.length;
      }
      this.pagination.filteredItems = [];
      for (let i = start; i <= end; i++) {
        this.pagination.filteredItems.push(i);
      }
      this.paginatedItems = this.filteredItems.filter((v, k) => Math.ceil((k + 1)
        / this.pagination.itemPerPage) === this.pagination.currentPage);
    },
    editDataTableHandler(data) {
      this.selectedItem = {};
      this.toggleModal();
      this.selectedItem = this.filteredItems.find(item => item[`${this.keyField}`] === data[`${this.keyField}`]);
    },
    updateDataTable(data) {
      this.$parent.edit(data);
    },
    deleteDataTableHandler(data) {
      const r = window.confirm('Are you sure you want to delete datatable item');
      if (r) {
        this.$emit('deleteDataTableItem', data);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
