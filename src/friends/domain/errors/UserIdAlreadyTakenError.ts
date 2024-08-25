import {DomainError} from "../../../shared/domain/errors/DomainError";

export class UserIdAlreadyTakenError extends DomainError {
    constructor(userId: string) {
        super({
            title: 'User id already taken',
            detail: `The user id ${userId} is already taken`,
            solutions: [
                   'Try with another user id',
            ]
        });
    }
}