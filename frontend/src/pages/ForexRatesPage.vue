<template>
    <v-container fluid>
        <v-layout column>
            <h4>Forex kurser</h4>
            <v-data-table
                    :items="forexRates"
                    class="elevation-1"
                    v-bind:headers="headers"
                    v-bind:pagination.sync="pagination"
            >
                <template scope="props" slot="items">
                    <td>{{ props.item.kode}}</td>
                    <td>{{ props.item.kurs }}</td>
                </template>
            </v-data-table>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';
    import {ForexRate} from "@/models/forex-rate";

    @Component
    export default class ForexRatesPage extends Vue {
        @Getter("forexRates", {namespace: "forexRates"}) forexRates: ForexRate[] | undefined;

        pagination = {
            sortBy: 'rank'
        };
        headers = [
            {text: 'Kode', value: 'kode', align: 'left'},
            {text: 'Kurs', value: 'kurs', align: 'left'},
        ];

        formatNumber(value: string, decimals: number, postfix: string) {
            return Number(parseFloat(value).toFixed(decimals)).toLocaleString(undefined, {minimumFractionDigits: decimals}) + postfix;
        }
    }
</script>
<style scoped>
</style>
