import {Uuid} from "../values-objects/Uuid";

export abstract class DomainEvent {
    static EVENT_NAME: string;
    static fromPrimitives: (params: {
        entityId: string;
        eventId: string;
        occurredOn: Date;
        attributes: DomainEventAttributes;
    }) => DomainEvent;

    readonly entityId: string;
    readonly eventId: string;
    readonly occurredOn: Date;
    readonly eventName: string;
    public isPublished: boolean = false;

    protected constructor(params: { eventName: string; entityId: string; eventId?: string; occurredOn?: Date }) {
        const { entityId, eventName, eventId, occurredOn } = params;
        this.entityId = entityId;
        this.eventId = eventId || Uuid.random().value;
        this.occurredOn = occurredOn || new Date(Date.now());
        this.eventName = eventName;
    }

    public markAsPublished(): void {
        this.isPublished = true;
    }

    abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
    EVENT_NAME: string;
    fromPrimitives(params: {
        entityId: string;
        eventId: string;
        occurredOn: Date;
        attributes: DomainEventAttributes;
    }): DomainEvent;
};

type DomainEventAttributes = any;
