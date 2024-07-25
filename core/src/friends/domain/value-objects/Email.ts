import {InvalidEmailAddressError} from "../errors/InvalidEmailAddressError";
import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";

export class Email extends ValueObject {
    readonly value: string

    constructor(value: string) {
        super();
        this.value = value;
        this.ensureIsValidEmail(value);
    }

    ensureIsValidEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            throw new InvalidEmailAddressError(email);
        }
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}