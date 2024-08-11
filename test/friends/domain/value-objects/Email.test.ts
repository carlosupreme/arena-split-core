import {describe, expect, it} from "vitest";
import {Email, InvalidEmailAddressError} from "../../../../src";

describe("Email", () => {
    it('should create an email successfully', () => {
        const plainTextEmail = "email@valid.com";
        const email = new Email(plainTextEmail);

        expect(email.value).toBe(plainTextEmail);
    });

    it('should throw an error with a invalid email address', () => {
        const invalidPlainTextEmail = "invalid";
        expect(() =>
            new Email(invalidPlainTextEmail)
        ).toThrow(InvalidEmailAddressError);
    });

    it('should throw an error with a invalid email address and give solutions', () => {
        const invalidPlainTextEmail = "invalid";
        const expectedSolutions = [
            "Must have a valid format",
            "Must have a valid domain"
        ];

        try {
            new Email(invalidPlainTextEmail);
        } catch (error) {
            if (!(error instanceof InvalidEmailAddressError)) {
                throw error;
            }

            expect(error.title).toBe("Invalid email address");
            expect(error.detail).toBe(`The email address <${invalidPlainTextEmail}> is invalid`);
            expect(error.solutions).toEqual(expectedSolutions);
        }
    });

    it('should be the same as another email', () => {
        const email1 = new Email('email1@gmail.com');
        const email2 = new Email('email1@gmail.com');

        expect(email1.equals(email2)).toBe(true);
    });
})