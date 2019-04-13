<template>
  <div>
    <DataTable
      @deleteDataTableItem="deleteRecord"
      v-if="payments.length"
      :items="payments"
      keyField="ID" hasActions
      :asyncTask="asynctask"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from 'vue-awesome/components/Icon'
// @ is an alias to /src
import DataTable from '@/components/data-table/Paginator.component.vue';
import { firebaseCrud, loginToFirebase } from '../utils/firebase.util';
import { COLLECTIONS } from '../../constant';

export default {
  name: 'home',
  data() {
    return {
      asynctask: '',
    };
  },
  computed: mapState({
    payments: state => state.payments.payments,
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
    DataTable, 'v-icon': Icon
  },
};
</script>
