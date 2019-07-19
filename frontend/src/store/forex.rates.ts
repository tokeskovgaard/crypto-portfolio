import {ForexRate} from "@/models/forex-rate";

export interface ForexRates {
    forexRates: ForexRate[],
    error: boolean,
    selectedForexRate: ForexRate | null
}
