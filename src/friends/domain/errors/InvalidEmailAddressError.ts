export class InvalidEmailAddressError extends Error {
    constructor(email: string) {
        super(`The email provided <${email}> is not valid.`);
    }
}