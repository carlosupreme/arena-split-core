import {IEquatable} from "./IEquatable";

export abstract class ValueObject implements IEquatable {
    public abstract getEqualityComponents(): unknown[];

    equals(other: ValueObject): boolean {
        if (!this.isTheSameConstructor(other)) {
            return false;
        }

        return this.everyComponentIsEqual(other);
    }

    private isTheSameConstructor(other: ValueObject): boolean {
        return other !== null && other.constructor === this.constructor;
    }

    private everyComponentIsEqual(other: ValueObject): boolean {
        const otherComponents = other.getEqualityComponents();

        return this.getEqualityComponents().every(
            (component, index) => component === otherComponents[index]
        );
    }
}