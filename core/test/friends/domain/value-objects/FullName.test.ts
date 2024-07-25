import {describe, expect, it} from "vitest";
import {FullName} from "../../../../src/friends/domain/value-objects/FullName";
import {InvalidFullNameError} from "../../../../src/friends/domain/errors/InvalidFullNameError";

describe('Full Name ', () => {
    it('should create a valid full name with min 3 chars', () => {
        const expectedFullName = 'Min';
        const fullName = new FullName(expectedFullName);
        expect(fullName.value).toBe(expectedFullName);
    });

    it('should throw an error with full name with less than 3 chars', () => {
        const expectedFullName = 'M';
        expect(() => {
            new FullName(expectedFullName);
        }).toThrowError(InvalidFullNameError);
    });


    it('should be equal to another name', () => {
        const fullName = new FullName('Min');
        const fullName2 = new FullName('Min');
        expect(fullName.equals(fullName2)).toBe(true);
    });

    it('should throw an error with fullName with more than 50 chars', () => {
        const invalidFullName = "123456789012345678901234567890123456789012345678901";

        expect(
            () => new FullName(invalidFullName)
        ).toThrowError(InvalidFullNameError);
    });

    it('should throw an error with fullName with chars that are not letters or spaces', () => {
        const invalidFullName = "josha1 ^@";
        expect(() => new FullName(invalidFullName)).toThrowError(InvalidFullNameError);
    });

    it('should acept spaces ', () => {
        const expectedFullName = "Tellez Hernandez";
        const fullName = new FullName(expectedFullName);
        expect(fullName.value).toBe(expectedFullName);

    })


});