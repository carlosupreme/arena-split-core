import {DomainEvent} from "../events/DomainEvent";
import {HasDomainEvents} from "../events/HasDomainEvents";
import {IEquatable} from "../values-objects/IEquatable";

export abstract class Entity<TId extends IEquatable>
    implements HasDomainEvents {

    readonly id: TId;
    private readonly _domainEvents: DomainEvent[];

    protected constructor(id: TId) {
        this.id = id;
        this._domainEvents = [];
    }

    getDomainEvents(): DomainEvent[] {
        return [...this._domainEvents];
    }

    addDomainEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);
    }

    clearDomainEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = this.getDomainEvents();
        this.clearDomainEvents();
        return domainEvents;
    }

    equals(other: Entity<TId>): boolean {
        return (
            other.constructor.name === this.constructor.name &&
            other.id.equals(this.id)
        );
    }

}