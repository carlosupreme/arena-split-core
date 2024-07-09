import {Entity} from "../../../../src/shared/domain/entities/Entity";
import {EntityFakeId} from "../value-objects/EntityFakeId";
import {EntityFakeCreated} from "../events/EntityFakeCreated";

export class EntityFake extends Entity<EntityFakeId> {
    constructor(id: EntityFakeId, private name: string) {
        super(id);
    }

    static createFake(): EntityFake {
        const entity = new EntityFake(new EntityFakeId('fake-id'), 'fake-name');
        entity.addDomainEvent(
            new EntityFakeCreated({
                    entityId: entity.getId().value,
                    fakeName: entity.getName()
                }
            )
        );
        return entity;
    }

    public getId(): EntityFakeId {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}