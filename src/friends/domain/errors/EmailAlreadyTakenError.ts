import {DomainError} from "../../../shared/domain/errors/DomainError";

export class EmailAlreadyTakenError extends DomainError {
    constructor(email: string) {
        super({
            title: 'Email already taken',
            detail: `The email ${email} is already taken`,
            solutions: [
                'Try with another email',
                'If you already have an account, try to login'
            ]
        });
    }
}