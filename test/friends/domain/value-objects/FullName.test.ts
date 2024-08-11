import {describe, expect, it} from "vitest";
import { FullName,  InvalidFullNameError} from "../../../../src";

describe('Full Name', () => {
    it('should create a valid full name', () => {
        const expectedFullName = 'Valid Full Name';
        const fullName = new FullName(expectedFullName);
        expect(fullName.value).toBe(expectedFullName);
    });

    it('should throw an error with full name with less than 3 chars', () => {
        const invalidFullName = 'M';
        expect(() => new FullName(invalidFullName)).toThrowError(InvalidFullNameError);
    });

    it('should be equal to another name', () => {
        const fullName = new FullName('Min');
        const fullName2 = new FullName('Min');
        expect(fullName.equals(fullName2)).toBe(true);
    });

    it('should throw an error with fullName with more than 100 chars', () => {
        const MAX_LENGTH = 100;
        const invalidFullName = "a".repeat(MAX_LENGTH + 1);

        expect(() => new FullName(invalidFullName)).toThrowError(InvalidFullNameError);
    });

    it('should throw an error with fullName with chars that are not letters or spaces', () => {
        const invalidFullName = "josha1 ^@";
        expect(() => new FullName(invalidFullName)).toThrowError(InvalidFullNameError);
    });

    it('should accept spaces', () => {
        const expectedFullName = "Tellez Hernandez";
        const fullName = new FullName(expectedFullName);
        expect(fullName.value).toBe(expectedFullName);
    })

    it('should accept accents and ñ', () => {
        const expectedFullName = "Téllez Hernández Ññ";
        const fullName = new FullName(expectedFullName);
        expect(fullName.value).toBe(expectedFullName);
    })

    it('should accept multiple spaces between words but then trim it to a single space between them', () => {
        const expectedFullName = "Téllez Hernández";
        const fullName = new FullName("Téllez             Hernández              ");
        expect(fullName.value).toBe(expectedFullName);
    })

    it('should throw an error with a invalid full name and give solutions', () => {
        const invalidFullName = "a";
        const expectedSolutions = [
            "Must be at least 3 characters long",
            "Must not exceed 100 characters",
            "Must only contain letters and spaces"
        ];

        try {
            new FullName(invalidFullName);
        } catch (error) {
            if (!(error instanceof InvalidFullNameError)) {
                throw error;
            }

            expect(error.title).toBe("Invalid full name");
            expect(error.detail).toBe(`The full name <${invalidFullName}> is invalid`);
            expect(error.solutions).toEqual(expectedSolutions);
        }
    });
});