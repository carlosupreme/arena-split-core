import {describe, expect, it} from "vitest";
import {DomainError} from "../../../../src/shared/domain/errors/DomainError";

describe('Domain error', () => {
    it('should create a domain error given a title and a detail message', () => {
        const title = "Domain error title";
        const detail = "Domain error detail";
        const solutions = ["Solution 1", "Solution 2"];
        const error = new DomainError({title, detail, solutions});

        expect(error.title).toBe(title);
        expect(error.detail).toBe(detail);
        expect(error).toHaveProperty("solutions");
        expect(error.solutions).toEqual(solutions);
    });


});