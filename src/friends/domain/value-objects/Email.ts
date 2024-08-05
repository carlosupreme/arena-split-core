import {InvalidEmailAddressError} from "../errors/InvalidEmailAddressError";
import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";

export class Email extends ValueObject {
    constructor(readonly value: string) {
        super();
        this.ensureIsValidEmail();
    }

    ensureIsValidEmail() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(this.value)) {
            throw new InvalidEmailAddressError(this.value);
        }
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}