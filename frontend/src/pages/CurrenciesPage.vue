<template>
    <v-container fluid>
        <v-layout column>
            <h4>Markedet</h4>
            <v-data-table
                    :items="currencies"
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:pagination.sync="pagination"
            >
                <template scope="props" slot="items">
                    <td>{{ props.item.rank }}</td>
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.symbol }}</td>
                    <td class="text-xs-right">{{ formatNumber(props.item.market_cap_usd, 0, '') }}</td>
                    <td class="text-xs-right">{{ formatNumber(props.item.available_supply, 0, '') }}</td>
                    <td class="text-xs-right">{{ formatNumber(props.item.price_usd, 2, ' $') }}</td>
                    <td class="text-xs-right">{{ formatNumber(props.item.price_eur, 2, ' €') }}</td>
                    <td class="text-xs-right">{{ formatNumber(props.item.price_btc, 8, ' BTC') }}</td>
                </template>
            </v-data-table>
        </v-layout>
        <button v-on:click="fetchData()">Opdater data</button>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, Getter} from "vuex-class";
    import {Currency} from "@/models/currency";

    @Component
    export default class CurrenciesPage extends Vue {
        pagination = {
            sortBy: 'rank'
        };
        headers = [
            {text: 'Rang', value: 'rank', align: 'left'},
            {text: 'Mønt', value: 'name', align: 'left'},
            {text: 'Kode', value: 'symbol'},
            {text: 'Market Cap US Dollars', value: 'market_cap_usd'},
            {text: 'Antal', value: 'available_supply'},
            {text: 'Pris US Dollars', value: 'price_usd'},
            {text: 'Pris euro', value: 'price_eur'},
            {text: 'Pris btc', value: 'price_btc'}
        ];

        @Getter("currencies", {namespace: "currencies"}) currencies: Currency[] | undefined;
        @Action("fetchData", {namespace: "currencies"}) fetchData: any;

        formatNumber(value: any, decimals: number, postfix: string) {
            return Number(parseFloat(value).toFixed(decimals)).toLocaleString(undefined, {minimumFractionDigits: decimals}) + postfix;
        }
    }
</script>
<style scoped>
</style>
