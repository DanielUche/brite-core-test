import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '../node_modules/bulma/css/bulma.css';

const numeral = require('numeral');


Vue.config.productionTip = false;

Vue.use(Toasted);
Vue.use(VueFirestore);


Vue.filter('numeral', value => numeral(value).format('0,0'));

Vue.config.devtools = process.env.NODE_ENV === 'development';
const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// eslint-disable-next-line no-underscore-dangle
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
