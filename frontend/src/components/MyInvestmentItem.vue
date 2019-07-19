<template>
    <v-layout row>
        <v-flex md2 sm4 xs5>
            <v-autocomplete
                    item-text="name"
                    item-value="id"
                    label="Mønt"
                    v-bind:items="currencies"
                    v-model="coin.currencyId"
            ></v-autocomplete>
        </v-flex>
        <v-flex ml-1 sm2 xs3>
            <v-text-field
                    label="Antal"
                    type="number"
                    v-model="coin.amount">
            </v-text-field>
        </v-flex>

        <v-flex ml-1 sm2 xs3>
            <v-text-field
                    :label="label"
                    class="alignLeft"
                    disabled
                    v-model="value"
            ></v-text-field>
        </v-flex>
        <v-flex ml-1 sm-2 xs1>
            <v-text-field class="alignLeft" disabled label="1 Hour %" v-model="oneHourPercentage"></v-text-field>
        </v-flex>
        <v-flex ml-1 sm-2 xs1>
            <v-text-field class="alignLeft" disabled label="24 Hour %"
                          v-model="twentyfourHourPercentage"></v-text-field>
        </v-flex>
        <v-flex ml-1 sm-2 xs1>
            <v-text-field class="alignLeft" disabled label="7 Day %" v-model="sevenDaysPercentage"></v-text-field>
        </v-flex>
        <v-flex ml-1 sm-2 xs1>
            <v-btn flat light v-on:click="removeCoin(coin)">Slet</v-btn>
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
