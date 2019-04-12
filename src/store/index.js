import Vue from 'vue';
import Vuex from 'vuex';
import { createModule } from 'vuex-toast';
import 'vuex-toast/dist/vuex-toast.css';

import payments from './modules/payments';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

Vue.config.devtools = process.env.NODE_ENV === 'development';

export default new Vuex.Store({

  modules: {
    toast: createModule({ dismissInterval: 5000 }),
    payments,
  },
//   strict: debug,
  // plugins: debug ? [createLogger()] : []
});
