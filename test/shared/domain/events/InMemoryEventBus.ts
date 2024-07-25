import {DomainEvent} from "../../../../src/shared/domain/events/DomainEvent";
import {EventEmitter} from "node:events";
import {DomainEventSubscriber} from "../../../../src/shared/domain/events/DomainEventSubscriber";
import {EventBus} from "../../../../src/shared/domain/events/EventBus";
import {HasDomainEvents} from "../../../../src";

export class InMemoryEventBus extends EventEmitter implements EventBus {
    async publish(...events: DomainEvent[]): Promise<void> {
        events.forEach(event => {
            this.emit(event.eventName, event);
        })
    }

    async publishEventsFromEntities(...entities: HasDomainEvents[]): Promise<void> {
        for (const entity of entities) {
            await this.publish(...entity.pullDomainEvents());
        }
    }

    addSubscribers(...subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        subscribers.forEach(subscriber => this.addSubscriber(subscriber));
    }

    addSubscriber(subscriber: DomainEventSubscriber<DomainEvent>): void {
        subscriber.subscribedTo().forEach(event => {
            this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
        });
    }
}