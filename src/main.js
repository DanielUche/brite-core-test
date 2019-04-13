import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import Toasted from 'vue-toasted';
import 'vue-awesome/icons/flag';
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';


import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './style.scss';

// globally (in your main .js file)

const numeral = require('numeral');

Vue.config.productionTip = false;
Vue.use(Toasted, { duration: 3000 });
Vue.use(VueFirestore);
Vue.component('v-icon', Icon);
Vue.filter('numeral', value => numeral(value).format('0,0'));

Vue.config.devtools = process.env.NODE_ENV === 'development';
const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// eslint-disable-next-line no-underscore-dangle
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
