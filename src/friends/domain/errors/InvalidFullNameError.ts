export class InvalidFullNameError extends Error {
    constructor(fullName: string) {
        super(`The full name <${fullName}> should be 3-100 characters long and only admit letters and spaces`);
    }
}