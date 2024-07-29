import {ValueObject} from "../../../shared/domain/values-objects/ValueObject";
import {InvalidUserNameError} from "../errors/InvalidUserNameError";

export class UserName extends ValueObject{

    constructor(readonly value:string){
        super();
        this.ensureNomenclatura(value);
    }
    private ensureNomenclatura(value:string){
        const userNameRegex=/[^a-zA-Z0-9._]/;
        if(userNameRegex.test(value)) {
            throw new InvalidUserNameError("the userName should have allowed characters");
        }

    }
    getEqualityComponents(): unknown[] {
        return [this.value];
    }

}