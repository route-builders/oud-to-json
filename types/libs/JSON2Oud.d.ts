export declare class JSON2Oud {
    private jsonSource;
    private output;
    constructor(json: string);
    parse(): string;
    private makeOud;
    private oudKV;
}
