import axios from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState} from "@/store/root-state";
import {Currency} from "@/models/currency";
import {Currencies} from "@/store/currencies";

const currenciesState: Currencies = {
    currencies: [],
    error: false,
    selectedCurrency: new Currency('DKK', 7),
};

const actions: ActionTree<Currencies, RootState> = {
    fetchData({commit}): any {
        axios({
            url: 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0',
        }).then((response: {data: Currency[]}) => {
            const payload: Currency[] = response && response.data;

            commit('currenciesLoaded', payload);
        }, (error: any) => {
            console.log(error);
            commit('currenciesError');
        });
    },
};

const mutations: MutationTree<Currencies> = {
    currenciesLoaded(state, currencies: Currency[]) {
        state.currencies = currencies;
    },
    currenciesError(state) {
        state.error = true;
        state.currencies = [];
    },
    selectCurrency(state, currency: Currency) {
        state.selectedCurrency = currency;
    },
};
const getters: GetterTree<Currencies, RootState> = {
    currencies: (state) => state.currencies,
    selectedCurrency: (state) => state.selectedCurrency,
};
const namespaced: boolean = true;


export const CurrenciesStore: Module<Currencies, RootState> = {
    namespaced,
    state: currenciesState,
    getters,
    actions,
    mutations,
};
