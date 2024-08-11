import {describe, expect, it} from "vitest";
import {InvalidUserNameError, UserName} from "../../../../src";

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

    it("Should throw an error with UserName with only one letter", () => {
        const userName = "a";
        expect(() => {
            new UserName(userName);
        }).toThrowError(InvalidUserNameError);
    });

    it("Should accept an UserName with a minimum of 3 letters", () => {
        const expected = "abc";
        const username = new UserName(expected);
        expect(username.value).toBe(expected);
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

    it("Should throw an error with invalid UserName and give solutions", () => {
        const maxLength = 30;
        const userName = "a".repeat(maxLength + 1);

        const expectedSolutions = [
            "Should only contain alphanumeric characters, underscores, and periods",
            "Must not contain consecutive periods",
            "Must not end with a period",
            "Maximum length is 30 characters"
        ];

        try {
            new UserName(userName);
        } catch (error) {
            if (!(error instanceof InvalidUserNameError)) {
                throw error;
            }

            expect(error.title).toBe("Invalid username");
            expect(error.detail).toBe(`The username <${userName}> is invalid`);
            expect(error.solutions).toEqual(expectedSolutions);
        }
    });
});