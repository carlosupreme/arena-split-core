import {DomainError} from "./DomainError";

export class InvalidUUIDError extends DomainError {
    constructor(uuid: string) {
        const title = "Invalid id";
        const detail = `The id <${uuid}> is invalid`;
        const solutions = [
            "Must have a valid format following the UUID v4 standard"
        ];

        super({title, detail, solutions});
    }
}