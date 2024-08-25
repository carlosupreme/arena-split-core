import {DomainError} from "../../../shared/domain/errors/DomainError";

export class UsernameAlreadyTakenError extends DomainError {
    constructor(username: string) {
        super({
            title: 'Username already taken',
            detail: `The username ${username} is already taken`,
            solutions: [
                   'Try with another username',
            ]
        });
    }
}