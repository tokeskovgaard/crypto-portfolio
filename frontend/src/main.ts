import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.css';

import router from '@/router';
import store from "@/store/store";

import App from '@/App.vue';
// Components
import MyInvestmentItem from '@/components/MyInvestmentItem.vue';
import CurrenciesPage from '@/pages/CurrenciesPage.vue';
import TweenedNumber from '@/components/TweenedNumber.vue';

Vue.config.productionTip = false;


Vue.use(Vuetify, {
    iconfont: 'fa',
});

Vue.component('my-investment-item', MyInvestmentItem);
Vue.component('my-currency-overview', CurrenciesPage);
Vue.component('tweened-number', TweenedNumber);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
