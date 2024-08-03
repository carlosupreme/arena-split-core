export class InvalidUUIDError extends Error {
    constructor(uuid: string) {
        super(`Invalid UUID: ${uuid}`);
        this.name = this.constructor.name;
    }
}