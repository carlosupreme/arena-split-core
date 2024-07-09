import {IEquatable} from "./IEquatable";

export abstract class ValueObject implements IEquatable {
    public abstract getEqualityComponents(): unknown[];

    equals(other: ValueObject): boolean {
        if (!other || other.constructor !== this.constructor) {
            return false;
        }

        const otherComponents = other.getEqualityComponents();

        return this.getEqualityComponents().every(
            (component, index) => component === otherComponents[index]
        );
    }
}