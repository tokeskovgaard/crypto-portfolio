import Vuex from 'vuex';
import Vue from 'vue';
import {PortfolioStore} from "@/store/portfolio.store";
import {RootState} from "@/store/root-state";
import {CurrenciesStore} from "@/store/currencies.store";
import {ForexRatesStore} from "@/store/forex-rates.store";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    state: {
        version: '1.0.0'
    },
    modules: {
        portfolio: PortfolioStore,
        currencies: CurrenciesStore,
        forexRates: ForexRatesStore
    }
});
