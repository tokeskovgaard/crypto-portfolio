<template>
    <v-layout row>
        <v-flex xs5 sm4 md2>
            <v-autocomplete
                    label="Mønt"
                    v-bind:items="currencies"
                    v-model="coin.currencyId"
                    item-value="id"
                    item-text="name"
            ></v-autocomplete>
        </v-flex>
        <v-flex xs3 sm2 ml-1>
            <v-text-field
                    type="number"
                    label="Antal"
                    v-model="coin.amount">
            </v-text-field>
        </v-flex>

        <v-flex xs3 sm2 ml-1>
            <v-text-field
                    :label="label"
                    v-model="value"
                    disabled
                    class="alignLeft"
            ></v-text-field>
        </v-flex>
        <v-flex xs1 sm-2 ml-1>
            <v-text-field label="1 Hour %" v-model="oneHourPercentage" disabled class="alignLeft"></v-text-field>
        </v-flex>
        <v-flex xs1 sm-2 ml-1>
            <v-text-field label="24 Hour %" v-model="twentyfourHourPercentage" disabled
                          class="alignLeft"></v-text-field>
        </v-flex>
        <v-flex xs1 sm-2 ml-1>
            <v-text-field label="7 Day %" v-model="sevenDaysPercentage" disabled class="alignLeft"></v-text-field>
        </v-flex>
        <v-flex xs1 sm-2 ml-1>
            <v-btn light flat v-on:click="removeCoin(coin)">Slet</v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import {CoinInvestment} from "@/models/coin-investment";
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {Currency} from "@/models/currency";
    import {Getter, Mutation} from "vuex-class";
    import {ForexRate} from "@/models/forex-rate";

    @Component
    export default class MyInvestmentItem extends Vue {
        @Prop({required: true, type: Object}) readonly coin: CoinInvestment | undefined;

        @Mutation("updateCoin", {namespace: "portfolio"}) updateCoin: any;
        @Mutation("removeCoin", {namespace: "portfolio"}) removeCoin: any;
        @Getter("currencies", {namespace: "currencies"}) readonly currencies: Currency[] | undefined;
        @Getter("selectedForexRate", {namespace: "forexRates"}) readonly selectedForexRate: ForexRate | undefined;

        @Watch("coin", {deep: true})
        onValuesChanged() {
            this.updateCoin(this.coin);
        };

        get label() {
            return "værdi i " + (this.selectedForexRate ? this.selectedForexRate.kode : "");
        }

        get value() {
            if (this.coin)
                if (this.coin.amount !== undefined && this.coin.currencyId !== undefined) {
                    let currency = this.findCurrency(this.coin.currencyId);
                    if (currency) {
                        let value = <number>currency.price_usd * <number>this.coin.amount;
                        value = this.selectedForexRate
                            ? this.selectedForexRate.kurs * value
                            : value;
                        return Number(parseFloat(value.toString()).toFixed(2)).toLocaleString();
                    }
                    return 0;
                }
            return null;
        }

        get oneHourPercentage() {
            if (!this.coin) return;
            let currency = this.findCurrency(this.coin.currencyId);
            return currency == null ? null : currency.percent_change_1h + "%";
        }

        get twentyfourHourPercentage() {
            if (!this.coin) return;
            let currency = this.findCurrency(this.coin.currencyId);
            if (currency)
                return currency == null ? null : currency.percent_change_24h + "%";
        }

        get sevenDaysPercentage() {
            if (!this.coin) return;
            let currency = this.findCurrency(this.coin.currencyId);
            return currency == null ? null : currency.percent_change_7d + "%";
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
    }
</script>

<style scoped>

</style>
