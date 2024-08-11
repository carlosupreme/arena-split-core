import {DomainError} from "../../../shared/domain/errors/DomainError";

export class InvalidEmailAddressError extends DomainError {
    constructor(email: string) {
        const title = "Invalid email address";
        const detail = `The email address <${email}> is invalid`;
        const solutions = [
            "Must have a valid format",
            "Must have a valid domain"
        ];

        super({title, detail, solutions});
    }

}