declare module '@sumup/sdk' {
    export default class SumUp {
        constructor(options: { apiKey: string });
        checkouts: {
            create(payload: any): Promise<any>;
            findById(id: string): Promise<any>;
        };
    }
}
