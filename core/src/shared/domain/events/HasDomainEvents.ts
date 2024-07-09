import {DomainEvent} from "./DomainEvent";

export interface HasDomainEvents {
    getDomainEvents(): DomainEvent[];
    addDomainEvent(domainEvent: DomainEvent): void;
    clearDomainEvents(): void;
    pullDomainEvents(): DomainEvent[];
}