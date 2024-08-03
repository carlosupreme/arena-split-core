import {UUID} from "../../../shared/domain/values-objects/UUID";

export class UserId extends UUID {
    constructor(value: string) {
        super(value);
    }

    public static create(): UserId {
        return new UserId(UUID.random().value);
    }
}