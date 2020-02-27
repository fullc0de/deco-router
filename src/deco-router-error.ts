
export class DecoRouterError extends Error {
    public statusCode: number;

    public constructor(code: number, message: string) {
        super(message);
        this.statusCode = code;
    }
}