import {describe, expect, it} from "vitest";
import {InvalidUUIDError, UserId} from "../../../../src";

describe("User id", () => {
    it('should generate a uuid value from static method', () => {
        const userId = UserId.create();
        expect(userId).toBeDefined();
        expect(userId.value).toBeDefined();
        expect(userId.value).toHaveLength(36);
    });

    it('should create an user id from constructor', () => {
        const validUUID = UserId.create().value;
        const userId = new UserId(validUUID);
        expect(userId.value).toEqual(validUUID);
    });

    it('should throw an error with a invalid id and give solutions', () => {
        const invalidUUID = 'invalid-uuid';
        const expectedSolutions = [
            "Must have a valid format following the UUID v4 standard"
        ];

        try {
            new UserId(invalidUUID);
        } catch (error) {
            if (!(error instanceof InvalidUUIDError)) {
                throw error;
            }

            expect(error.title).toBe("Invalid id");
            expect(error.detail).toBe(`The id <${invalidUUID}> is invalid`);
            expect(error.solutions).toEqual(expectedSolutions);
        }
    });
})