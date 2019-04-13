import Vue from 'vue';
import Vuex from 'vuex';
import payments from './modules/payments';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

Vue.config.devtools = process.env.NODE_ENV === 'development';

export default new Vuex.Store({

  modules: {
    payments,
  },
//   strict: debug,
  // plugins: debug ? [createLogger()] : []
});
