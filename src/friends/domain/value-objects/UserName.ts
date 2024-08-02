import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";
import {InvalidUserNameError} from "../errors/InvalidUserNameError";

export class UserName extends ValueObject {
    constructor(readonly value: string) {
        super();
        this.ensureInstagramRegex(value);
    }

    private ensureInstagramRegex(value: string) {
        const userNameRegex = /^(?!.*\.\.)(?!.*\.$)\w[\w.]{0,29}$/;
        if (!userNameRegex.test(value)) {
            throw new InvalidUserNameError("The userName should only contain alphanumeric characters, underscores, and periods, and must not contain consecutive periods or end with a period.");
        }
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}