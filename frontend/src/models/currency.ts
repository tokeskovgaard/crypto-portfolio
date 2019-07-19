export class Currency {
    public percent_change_24h: string = "";
    public percent_change_7d: string = "";
    public percent_change_1h: string = "";

    constructor(public id: any, public price_usd: any) {
    }
}
