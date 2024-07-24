export abstract class DomainEvent {
    static EVENT_NAME: string;

    readonly eventName: string;
    readonly entityId: string;
    readonly eventId: string;
    readonly occurredOn: Date;

    protected constructor(data: { eventId: string, eventName: string, entityId: string, occurredOn: Date }) {
        this.eventName = data.eventName;
        this.entityId = data.entityId;
        this.eventId = data.eventId;
        this.occurredOn = data.occurredOn;
    }

    abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
    EVENT_NAME: string;
};

export type DomainEventAttributes = object