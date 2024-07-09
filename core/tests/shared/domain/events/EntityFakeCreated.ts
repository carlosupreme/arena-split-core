import {DomainEvent} from "../../../../src/shared/domain/events/DomainEvent";

type EntityFakeCreatedAttributes = {
    readonly fakeName: string
};

export class EntityFakeCreated extends DomainEvent {
    static readonly EVENT_NAME = 'entity.created';
    readonly fakeName: string;

    static makeFake(): EntityFakeCreated {
        return new EntityFakeCreated({
            entityId: 'fake-id',
            fakeName: 'fake-name'
        });
    }
    constructor(data: { fakeName: string, entityId: string; eventId?: string; occurredOn?: Date }) {
        const {fakeName, entityId, eventId, occurredOn} = data;
        super({eventName: EntityFakeCreated.EVENT_NAME, entityId, eventId, occurredOn});
        this.fakeName = fakeName;
    }

    toPrimitives(): EntityFakeCreatedAttributes {
        const {fakeName} = this;
        return {fakeName}
    }

    static fromPrimitives(params: {
        entityId: string;
        attributes: EntityFakeCreatedAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
        const {entityId, attributes, occurredOn, eventId} = params;
        return new EntityFakeCreated({
            entityId,
            eventId,
            occurredOn,
            fakeName: attributes.fakeName
        });
    }
}