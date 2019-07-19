import Vue from 'vue';
import Router from 'vue-router';
import CurrenciesPage from "@/pages/CurrenciesPage.vue";
import ForexRatesPage from "@/pages/ForexRatesPage.vue";
import PortfolioPage from "@/pages/PortfolioPage.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Invest',
      component: PortfolioPage
    },
    {
      path: '/Currencies',
      name: 'Currencies',
      component: CurrenciesPage
    },
    {
      path: '/ForexRates',
      name: 'ForexRates',
      component: ForexRatesPage
    }
  ],
});
