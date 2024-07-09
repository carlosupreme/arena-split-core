import {describe, expect, it} from "vitest";
import {IEquatable} from "../../../../src/shared/domain/values-objects/IEquatable";

class Name implements IEquatable {
    constructor(public name: string) {
    }

    equals(other: Name): boolean {
        return other.constructor === this.constructor &&
            other.name === this.name;
    }
}

describe("IEquatable", () => {
    it("should be compare two equal objects", () => {

        const name1 = new Name('carlos');
        const name2 = new Name('carlos');

        expect(name1.equals(name2)).toBe(true);
    });

    it("should compare two distinct objects", () => {

        const name1 = new Name('carlos');
        const name2 = new Name('distinct');

        expect(name1.equals(name2)).toBe(false);
    });
});