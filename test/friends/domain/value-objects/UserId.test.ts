import {describe, expect, it} from "vitest";
import {UserId} from "../../../../src";
import {InvalidUUIDError} from "../../../../src/shared/domain/errors/InvalidUUIDError";

describe("User id", () =>{
    it ('should generate a uuid value from static method', () => {
        const userId = UserId.create();
        expect(userId).toBeDefined();
        expect(userId.value).toBeDefined();
        expect(userId.value).toHaveLength(36);
    });

    it ('should create an user id from constructor', () => {
        const validUUID = UserId.create().value;
        const userId = new UserId(validUUID);
        expect(userId.value).toEqual(validUUID);
    });

    it('should throw an InvalidUUIDError from constructor', () => {
        const invalidUUID = 'invalid-uuid';
        expect(() => new UserId(invalidUUID)).toThrowError(InvalidUUIDError);
    });
})