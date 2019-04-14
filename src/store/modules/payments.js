// local imports
import { COLLECTIONS } from '../../../constant';

const { db } = require('../../utils/firebase.util');

const payments = db.collection(COLLECTIONS.payments);

export default {
  namespaced: true,
  state: {
    loading: true,
    payments: [],
  },
  getters: {},
  mutations: {
    getPayments(state, data) {
      state.payments = data;
      state.loading = false;
    },
    getLoading(state, data) {
      state.loading = data;
    },
    removePayment(state, data) {
      const list = state.payments.filter(p => p.Key !== data.Key);
      state.payments = [...list];
    },
  },
  actions: {
    getPayments({ commit }) {
      commit('getLoading', true);
      payments.get().then((payment) => {
        const data = [];
        payment.forEach((doc) => {
          data.push({
            Key: Number(doc.id) + 1,
            ...doc.data(),
          });
        });
        commit('getPayments', data.sort((a, b) => a.Key - b.Key));
      });
    },
    removePayment({ commit }, data) {
      commit('removePayment', data);
    },
  },
};
