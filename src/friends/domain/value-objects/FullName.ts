import {InvalidFullNameError} from "../errors/InvalidFullNameError";
import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";

export class FullName extends ValueObject {
    constructor(readonly value: string) {
        super();
        this.value = this.sanitizeFullName(value).trim();
        this.ensureIsValid();
    }

    private ensureIsValid() {
        const fullNameRegex = /^[A-ZÁÉÍÓÚáéíóúñÑa-z ]{3,100}$/;

        if (!fullNameRegex.test(this.value)) {
            throw new InvalidFullNameError(this.value);
        }
    }

    private sanitizeFullName(name: string): string {
        return name.replace(/\s{2,}/g, ' ');
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}