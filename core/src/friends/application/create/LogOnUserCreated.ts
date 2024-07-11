import {UserCreated} from "../../domain/events/UserCreated";
import {DomainEventSubscriber} from "../../../shared/domain/events/DomainEventSubscriber";
import {DomainEventClass} from "../../../shared/domain/events/DomainEvent";

export class LogOnUserCreated implements DomainEventSubscriber<UserCreated> {
    subscribedTo(): DomainEventClass[] {
        return [UserCreated];
    }

    async on(domainEvent: UserCreated): Promise<void> {
        console.log(`Event listened: User created: ${domainEvent.entityId}`)
    }
}