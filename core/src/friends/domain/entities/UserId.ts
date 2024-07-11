import {Uuid} from "../../../shared/domain/values-objects/Uuid";

export class UserId extends Uuid {
    constructor(value: string) {
        super(value);
    }

    public static create(): UserId {
        return new UserId(Uuid.random().value);
    }
}