import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";
import {InvalidUserNameError} from "../errors/InvalidUserNameError";

export class UserName extends ValueObject {
    constructor(readonly value: string) {
        super();
        this.ensureInstagramRegex();
    }

    private ensureInstagramRegex() {
        const userNameRegex = /^(?!.*\.\.)(?!.*\.$)\w[\w.]{2,29}$/;

        if (!userNameRegex.test(this.value)) {
            throw new InvalidUserNameError(this.value);
        }
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}