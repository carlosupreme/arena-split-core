import {v4 as uuid, validate as validateUUID} from 'uuid';
import {ValueObject} from './ValueObject';
import {InvalidUUIDError} from "../errors/InvalidUUIDError";

export class UUID extends ValueObject {

    static random(): UUID {
        return new UUID(uuid());
    }

    constructor(readonly value: string) {
        super();
        this.ensureIsValidUUID();
    }

    private ensureIsValidUUID(): void {
        if (!validateUUID(this.value)) {
            throw new InvalidUUIDError(this.value);
        }
    }

    public getEqualityComponents(): unknown[] {
        return [this.value];
    }
}
