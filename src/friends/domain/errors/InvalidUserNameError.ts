export class InvalidUserNameError extends Error {
    constructor(username: string) {
        super(`The username <${username}> does not match the required pattern: Should only contain alphanumeric characters, underscores, and periods, and must not contain consecutive periods or end with a period.`);
    }
}