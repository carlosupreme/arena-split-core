import {DomainEvent} from './DomainEvent';
import {DomainEventSubscriber} from "./DomainEventSubscriber";

export interface EventBus {
    publish(...events: DomainEvent[]): Promise<void>;
    addSubscribers(...subscribers: DomainEventSubscriber<DomainEvent>[]): void
}
