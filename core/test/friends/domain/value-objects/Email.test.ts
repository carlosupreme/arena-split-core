import {describe, expect, it} from "vitest";
import {Email} from "../../../../src/friends/domain/value-objects/Email";
import {InvalidEmailAddressError} from "../../../../src/friends/domain/errors/InvalidEmailAddressError";

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
        ).toThrowError(InvalidEmailAddressError);
    });

    it('should be equal to another email', () => {
        const email1 = new Email('email1@gmail.com');
        const email2 = new Email('email1@gmail.com');

        expect(email1.equals(email2)).toBe(true);
    });
})