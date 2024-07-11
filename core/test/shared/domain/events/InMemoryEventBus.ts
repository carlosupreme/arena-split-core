import {DomainEvent} from "../../../../src/shared/domain/events/DomainEvent";
import {EventEmitter} from "node:events";
import {DomainEventSubscriber} from "../../../../src/shared/domain/events/DomainEventSubscriber";
import {EventBus} from "../../../../src/shared/domain/events/EventBus";
import {HasDomainEvents} from "../../../../src";

class MyEmitter extends EventEmitter {

}

export class InMemoryEventBus implements EventBus {

    private emitter: MyEmitter = new MyEmitter();

    async publish(...events: DomainEvent[]): Promise<void> {
        events.forEach(event => {
            console.log(`Event about to publish: ${event.eventName} at ${event.occurredOn}`)
            this.emitter.emit(event.eventName, event);
            event.markAsPublished();
        })
    }

    addSubscriber(subscriber: DomainEventSubscriber<DomainEvent>): void {
        subscriber.subscribedTo().forEach(event => {
            console.log('adding subscriber', event.EVENT_NAME)
            this.emitter.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
        });
    }

    async publishEvents(entities: HasDomainEvents[]): Promise<void> {
        const domainEvents = this.getEventsFromEntities(entities);

        for (const event of domainEvents) {
            if (event.isPublished) continue;

            await this.publish(event);
            event.markAsPublished();
        }
    }

    private getEventsFromEntities(entities: HasDomainEvents[]) {
        const domainEvents: DomainEvent[] = [];

        for (const entity of entities)
            domainEvents.push(...entity.pullDomainEvents());

        return domainEvents;
    }

    addSubscribers(...subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        subscribers.forEach(subscriber => this.addSubscriber(subscriber));
    }
}