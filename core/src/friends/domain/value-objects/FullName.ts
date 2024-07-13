import {InvalidFullNameError} from "../errors/InvalidFullNameError";
import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";

export class FullName extends ValueObject {
    constructor(readonly value: string) {
        super();
        this.ensureMinLength(value);
    }

    private ensureMinLength(value: string) {
        if (value.length < 3) {
            throw new InvalidFullNameError("The full name must have at least 3 characters");
        }
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}