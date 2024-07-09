import {DomainEvent} from "../../../../src/shared/domain/events/DomainEvent";
import {DomainEventBus} from "../../../../src/shared/domain/events/DomainEventBus";
import {EventEmitter} from "node:events";
import {DomainEventSubscriber} from "../../../../src/shared/domain/events/DomainEventSubscriber";

class MyEmitter extends EventEmitter {

}

export class InMemoryEventBus extends DomainEventBus {

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
}