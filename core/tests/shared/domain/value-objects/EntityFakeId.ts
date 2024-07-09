import {ValueObject} from "../../../../src/shared/domain/values-objects/ValueObject";

export class EntityFakeId extends ValueObject {
    constructor(public value: string) {
        super();
    }

    getEqualityComponents(): unknown[] {
        return [this.value];
    }
}