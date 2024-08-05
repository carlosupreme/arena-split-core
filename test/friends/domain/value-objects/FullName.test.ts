import {describe, expect, it} from "vitest";
import {FullName} from "../../../../src/friends/domain/value-objects/FullName";
import {InvalidFullNameError} from "../../../../src/friends/domain/errors/InvalidFullNameError";

describe('Full Name ', () => {
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
});