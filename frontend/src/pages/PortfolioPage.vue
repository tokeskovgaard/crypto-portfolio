<template>
    <v-container fluid>
        <v-progress-linear v-bind:indeterminate="true"
                           v-show="currencies.length == 0"></v-progress-linear>
        <v-layout column v-if="currencies.length > 0">
            <h4>Portfolio</h4>
            <h6>Markedsværdien af mønterne er:
                <tweened-number :value="marketValue"/>
                {{selectedForexRate? selectedForexRate.kode: ""}}
            </h6>
            <transition-group name="list" tag="div" :duration="800"
                              appear
                              enter-active-class="animated bounceInLeft"
                              leave-active-class="animated bounceOutLeft">
                <my-investment-item v-for="(coin, index) in coins" :key="index" class="list-item"
                                    :coin="coin"
                >
                </my-investment-item>
            </transition-group>
            <div>
                <v-btn light v-on:click="addCoin()">Tilføj ny mønt</v-btn>
                <v-btn light v-on:click="clearCoins">Fjern alle</v-btn>
            </div>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Action, Getter, Mutation} from "vuex-class";

    import {CoinInvestment} from '@/models/coin-investment';
    import {Currency} from "@/models/currency";
    import {ForexRate} from "@/models/forex-rate";

    @Component
    export default class PortfolioPage extends Vue {

        @Action('loadCoins', {namespace: "portfolio"}) loadCoins: any;
        @Action("saveCoins", {namespace: "portfolio"}) readonly saveCoins: any;
        @Getter("currencies", {namespace: "currencies"}) readonly currencies: Currency[] | undefined;
        @Getter("selectedForexRate", {namespace: "forexRates"}) readonly selectedForexRate: ForexRate | undefined;
        @Getter("coins", {namespace: "portfolio"}) readonly coins: CoinInvestment[] | undefined;
        @Getter("coin", {namespace: "portfolio"}) readonly coin: CoinInvestment | undefined;
        @Mutation("addCoin", {namespace: "portfolio"}) readonly addCoin: any;
        @Mutation("removeCoin", {namespace: "portfolio"}) readonly removeCoin: any;
        @Mutation("clearCoins", {namespace: "portfolio"}) readonly clearCoins: any;
        number = 0;

        @Watch("coins", {deep: true})
        coinDataChanged(coinData: CoinInvestment ) {
            this.saveCoins();
        }



        get marketValue() {
            let marketValue = 0;
            if (this.coins)
                for (let coin of this.coins) {
                    if (coin && coin.amount && coin.currencyId) {
                        let coinCurrency = this.findCurrency(coin.currencyId);

                        marketValue += coin.amount * (coinCurrency ? coinCurrency.price_usd : 0);
                    }
                }
            marketValue = this.selectedForexRate ? this.selectedForexRate.kurs * marketValue : marketValue;
            return Number(parseFloat(marketValue.toString()).toFixed(2));
        }

        findCurrency(currencyId: any) {
            if (currencyId && this.currencies) {
                for (let index = 0; index < this.currencies.length; index++) {
                    let currency = this.currencies[index];
                    if (currency.id.toLowerCase() === currencyId.toLowerCase()) {
                        return currency;
                    }
                }
            }
            return null;
        }


        mounted() {
            this.loadCoins();
        }
    };
</script>

<style scoped>
</style>
