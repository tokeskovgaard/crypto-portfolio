<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer :mini-variant="true" :overflow="false" :permanent="true" app>
                <v-list>
                    <v-list-tile :to="'/Home'">
                        <v-list-tile-action>
                            <v-icon light medium>fa-btc</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile :to="'/Currencies'">
                        <v-list-tile-action>
                            <v-icon light medium>fa-area-chart</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile :to="'/ForexRates'">
                        <v-list-tile-action>
                            <v-icon light medium>fa-usd</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed>
                <v-toolbar-title v-text="title"></v-toolbar-title>
            </v-toolbar>
            <main>
                <v-content>
                    <router-view></router-view>
                </v-content>
            </main>
            <v-footer :fixed='true'>
                <span>&copy; 2017</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Action} from "vuex-class";

    @Component
    export default class App extends Vue {
        @Action('fetchData', {namespace: 'currencies'}) fetchCurrencies: any;
        @Action('fetchData', {namespace: 'forexRates'}) fetchForexRates: any;

        title = 'INVEST dot Reimer Skovgaard dot DK';

        mounted() {
            this.fetchCurrencies();
            this.fetchForexRates();
        }
    };
</script>
<style scoped>
</style>
