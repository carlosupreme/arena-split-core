import {InvalidFullNameError} from "../errors/InvalidFullNameError";
import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";

export class FullName extends ValueObject {
    constructor(readonly value: string) {
        super();
        this.ensureMinLength(value);
        this.ensureMaxLength(value);
        this.ensureNomenclature(value);
    }

    private ensureMinLength(value: string) {
        if (value.length < 3) {
            throw new InvalidFullNameError("The full name must have at least 3 characters");
        }
    }

    private ensureMaxLength(value: string) {
        if (value.length > 50) {
            throw new InvalidFullNameError("The full name must have max 50 characters");
        }
    }

    private ensureNomenclature(value: string) {
        const fullNameRegex = /[^a-zA-Z\s]/g;
        if (fullNameRegex.test(value)) {
            throw new InvalidFullNameError("The full name should only have letters and numbers");
        }

    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}