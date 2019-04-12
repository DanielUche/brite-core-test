<template>
  <div>
    <br/>{{asynctask}}
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
        this.done = true;
        this.asynctask = 'success';
      }).catch(() => {
        this.asynctask = 'failed';
      });
    },
    async deleteRecord(data) {
      this.asynctask = 'pending';
      await firebaseCrud.delete(COLLECTIONS.payments, (data.Key - 1)).then(() => {
        this.$store.dispatch('payments/removePayment', data);
        this.asynctask = 'success';
      }).catch((err) => {
        this.asynctask = 'failed';
        console.log(err);
      });
    },
  },
  components: {
    DataTable,
  },
};
</script>
