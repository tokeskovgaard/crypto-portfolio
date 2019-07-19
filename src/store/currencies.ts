import {Currency} from "@/models/currency";

export interface Currencies {
    currencies: Currency[],
    error: boolean,
    selectedCurrency: Currency
}
