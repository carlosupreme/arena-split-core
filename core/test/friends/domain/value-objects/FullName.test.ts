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

    // aqui irian mas tests sobre que no acepte caracteres especiales, que no pase de 50, etc
});