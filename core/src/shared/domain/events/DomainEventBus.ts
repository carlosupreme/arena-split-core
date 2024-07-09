import {HasDomainEvents} from "./HasDomainEvents";
import {DomainEvent} from "./DomainEvent";
import {EventBus} from "./EventBus";
import {DomainEventSubscriber} from "./DomainEventSubscriber";

export abstract class DomainEventBus implements EventBus {
    abstract publish(...events: DomainEvent[]): Promise<void>
    abstract addSubscriber(subscriber: DomainEventSubscriber<DomainEvent>): void

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
}