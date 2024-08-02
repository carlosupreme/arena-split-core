import {describe, expect, it} from "vitest";
import {InvalidUserNameError} from "../../../../src/friends/domain/errors/InvalidUserNameError";
import {UserName} from "../../../../src/friends/domain/value-objects/UserName";

describe("UserName", () => {
    it("Should throw an error with UserName with spaces", () => {
        const userName = "juancho negro";
        expect(() => {
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });

    it("Should throw an error with UserName with consecutive periods", () => {
        const userName = "juancho..negro";
        expect(() => {
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });

    it("Should throw an error with UserName ending with a period", () => {
        const userName = "juancho.";
        expect(() => {
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });

    it("Should accept a valid UserName with alphanumeric characters, underscores, and periods", () => {
        const userName = "juancho_negro.123";
        const userNameObj = new UserName(userName);
        expect(userNameObj.value).toBe(userName);
    });

    it("Should throw an error with UserName with only one period", () => {
        const userName = ".";
        expect(() => {
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });

    it("Should accept a UserName with maximum allowed length", () => {
        const maxLength = 30;
        const userName = "a".repeat(maxLength);
        const userNameObj = new UserName(userName);
        expect(userNameObj.value).toBe(userName);
    });

    it("Should throw an error with UserName exceeding maximum length", () => {
        const maxLength = 30;
        const userName = "a".repeat(maxLength + 1);
        expect(() => {
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });
});