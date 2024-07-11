import {DomainEventSubscriber} from "../../../../src/shared/domain/events/DomainEventSubscriber";
import {DomainEventClass} from "../../../../src/shared/domain/events/DomainEvent";
import {EntityFakeCreated} from "../events/EntityFakeCreated";

export class LogOnEntityFakeCreated implements DomainEventSubscriber<EntityFakeCreated> {
    subscribedTo(): DomainEventClass[] {
        return [EntityFakeCreated];
    }

    async on(domainEvent: EntityFakeCreated): Promise<void> {
        console.log(`Event listened: EntityFakeCreated: ${domainEvent.entityId}`)
    }
}