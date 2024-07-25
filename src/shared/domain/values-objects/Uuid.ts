import {v4 as uuid, validate} from 'uuid';
import {ValueObject} from './ValueObject';

export class Uuid extends ValueObject {
    constructor(public value: string) {
        super();
        this.ensureIsValidUuid(value);
    }

    static random(): Uuid {
        return new Uuid(uuid());
    }

    public getEqualityComponents(): unknown[] {
        return [this.value];
    }

    private ensureIsValidUuid(id: string): void {
        if (!validate(id)) {
            throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }
}
