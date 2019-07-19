import {CoinInvestment} from "@/models/coin-investment";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import readCookie from "@/util/cookie/read-cookie";
import createCookie from "@/util/cookie/create-cookie";
import {RootState} from "@/store/root-state";
import {Portfolio} from "@/store/portfolio";
import uuid from 'uuid/v4'

const state: Portfolio = {
    coins: []
};

const namespaced: boolean = true;
const actions: ActionTree<Portfolio, RootState> = {
    loadCoins({commit}): any {
        let cookie = readCookie('coins');
        commit("coinsLoaded", cookie ? JSON.parse(cookie) : [])
    },

    saveCoins({commit, state}): any {
        createCookie('coins', JSON.stringify(state.coins));
    }
};

const mutations: MutationTree<Portfolio> = {
    addCoin(state) {
        state.coins.push(new CoinInvestment(uuid(), null, 0));
    },
    updateCoin(state, coin: CoinInvestment) {
        const itemIndex = state.coins.findIndex(i => i.id === coin.id);
        if (itemIndex >= 0) {
            state.coins[itemIndex].amount = coin.amount;
            state.coins[itemIndex].currencyId= coin.currencyId;
        }
    },
    removeCoin(state, coin: CoinInvestment) {
        const itemIndex = state.coins.findIndex(i => i.id === coin.id);
        if (itemIndex >= 0) {
            state.coins.splice(itemIndex, 1);
        }
    },
    clearCoins(state) {
        state.coins = [];
    },

    coinsLoaded(state, coins: CoinInvestment[]) {
        state.coins = coins;
    }
};
const getters: GetterTree<Portfolio, RootState> = {
    coins: (state) => state.coins,
    coin: (state) => (id: any) => {
        let itemIndex = state.coins.findIndex(i => i.id === id);
        if (itemIndex >= 0) {
            return state.coins[itemIndex];
        }
        return null;
    }
};

export const PortfolioStore: Module<Portfolio, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
