import {DomainEvent} from "../../shared/domain/events/DomainEvent";

type UserCreatedAttributes = {
    readonly name: string
};

export class UserCreated extends DomainEvent {
    static readonly EVENT_NAME = 'user.created';
    readonly name: string;

    constructor(data: { name: string, entityId: string; eventId?: string; occurredOn?: Date }) {
        const {name, entityId, eventId, occurredOn} = data;
        super({eventName: UserCreated.EVENT_NAME, entityId, eventId, occurredOn});
        this.name = name;
    }

    toPrimitives(): UserCreatedAttributes {
        const {name} = this;
        return {name}
    }

    static fromPrimitives(params: {
        entityId: string;
        attributes: UserCreatedAttributes;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent {
        const {entityId, attributes, occurredOn, eventId} = params;
        return new UserCreated({
            entityId,
            eventId,
            occurredOn,
            name: attributes.name
        });
    }
}