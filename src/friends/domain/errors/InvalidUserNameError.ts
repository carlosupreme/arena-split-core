import {DomainError} from "../../../shared/domain/errors/DomainError";

export class InvalidUserNameError extends DomainError {
    constructor(username: string) {
        const title = "Invalid username";
        const detail = `The username <${username}> is invalid`;
        const solutions = [
            "Should only contain alphanumeric characters, underscores, and periods",
            "Must not contain consecutive periods",
            "Must not end with a period",
            "Maximum length is 30 characters"
        ];

        super({title, detail, solutions});
    }
}