<template>
  <div>
    <div v-if="!loading">
      <DataTable
      @deleteDataTableItem="deleteRecord"
      v-if="payments.length"
      :items="payments"
      :columns="columns"
      keyField="ID" hasActions
      :asyncTask="asynctask"/>
    </div>
    <div v-else style="margin:auto;text-align: center">
      <div class="lds-grid"><div></div><div></div><div>
        </div><div></div><div></div><div>
        </div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// @ is an alias to /src
import DataTable from '@/components/data-table/Paginator.component.vue';
import { firebaseCrud, loginToFirebase } from '../utils/firebase.util';
import { COLLECTIONS } from '../../constant';

export default {
  name: 'home',
  data() {
    return {
      asynctask: '',
      columns: [
        { name: 'Key', key: true, sortable: true },
        { name: 'Name', sortable: true, editable: true },
        { name: 'Description', sortable: true, editable: true },
        {
          name: 'Amount', key: true, sortable: true, editable: true,
        },
        { name: 'Date', sortable: true, editable: true }],
    };
  },
  computed: mapState({
    payments: state => state.payments.payments,
    loading: state => state.payments.loading,
  }),
  created() {
    loginToFirebase().then(() => {
      this.$store.dispatch('payments/getPayments');
    }).catch(() => {
      throw new Error('Error trying lo login');
    });
  },
  methods: {
    async edit(data) {
      this.asynctask = 'pending';
      await firebaseCrud.update(COLLECTIONS.payments, data, (data.Key - 1)).then(() => {
        this.$toasted.show('Record Updated Successfully', {
          type: 'success',
        });
        this.asynctask = 'success';
      }).catch(() => {
        this.$toasted.show('Record could not be Updated', {
          type: 'error',
        });
        this.asynctask = 'failed';
      });
    },
    async deleteRecord(data) {
      this.asynctask = 'pending';
      await firebaseCrud.delete(COLLECTIONS.payments, (data.Key - 1)).then(() => {
        this.$store.dispatch('payments/removePayment', data);
        this.asynctask = 'success';
        this.$toasted.show('Record Deleted Successfully', {
          type: 'success',
        });
      }).catch(() => {
        this.asynctask = 'failed';
        this.$toasted.show('Record could not be Deleted', {
          type: 'error',
        });
      });
    },
  },
  components: {
    DataTable,
  },
};
</script>

<style scoped>
  .lds-grid {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-grid div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #00d1b2;
    animation: lds-grid 1.2s linear infinite;
  }
  .lds-grid div:nth-child(1) {
    top: 6px;
    left: 6px;
    animation-delay: 0s;
  }
  .lds-grid div:nth-child(2) {
    top: 6px;
    left: 26px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(3) {
    top: 6px;
    left: 45px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(4) {
    top: 26px;
    left: 6px;
    animation-delay: -0.4s;
  }
  .lds-grid div:nth-child(5) {
    top: 26px;
    left: 26px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(6) {
    top: 26px;
    left: 45px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(7) {
    top: 45px;
    left: 6px;
    animation-delay: -0.8s;
  }
  .lds-grid div:nth-child(8) {
    top: 45px;
    left: 26px;
    animation-delay: -1.2s;
  }
  .lds-grid div:nth-child(9) {
    top: 45px;
    left: 45px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
