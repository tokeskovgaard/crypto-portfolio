export class Currency {
    percent_change_24h: string = "";
    percent_change_7d: string = "";
    percent_change_1h: string = "";
    constructor(public id: any, public price_usd: any) {
    }
}
