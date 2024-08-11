import {DomainError} from "../../../shared/domain/errors/DomainError";

export class InvalidFullNameError extends DomainError {
    constructor(fullName: string) {
        const title = "Invalid full name";
        const detail = `The full name <${fullName}> is invalid`;
        const solutions = [
            "Must be at least 3 characters long",
            "Must not exceed 100 characters",
            "Must only contain letters and spaces"
        ];

        super({title, detail, solutions});
    }
}