import axios from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState} from "@/store/root-state";
import {ForexRate} from "@/models/forex-rate";
import {ForexRates} from "@/store/forex.rates";

const forexRatesState: ForexRates = {
    forexRates: [],
    error: false,
    selectedForexRate: null,
};

const actions: ActionTree<ForexRates, RootState> = {
    fetchData({commit}): any {
        axios({
            url: 'http://data.fixer.io/api/latest?access_key=8a33da7791751dd88e4dc8ccc733a312',
        }).then((response: any) => {
            const payload: ForexRate[] = [];
            for (const key in response.data.rates) {
                payload.push({
                    kode: key,
                    kurs: response.data.rates[key],
                });
            }
            commit('forexRatesLoaded', payload);
        }, (error: any) => {
            console.log(error);
            commit('forexRatesError');
        });
    },
};

const mutations: MutationTree<ForexRates> = {
    forexRatesLoaded(state, forexRates: ForexRate[]) {
        state.forexRates = forexRates;
    },
    forexRatesError(state) {
        state.error = true;
        state.forexRates = [];
    },
    selectForexRate(state, forexRate: ForexRate) {
        state.selectedForexRate = forexRate;
    },
};
const getters: GetterTree<ForexRates, RootState> = {
    forexRates: (state) => state.forexRates,
    selectedForexRate: (state) => state.selectedForexRate,
};
const namespaced: boolean = true;


export const ForexRatesStore: Module<ForexRates, RootState> = {
    namespaced,
    state: forexRatesState,
    getters,
    actions,
    mutations,
};
