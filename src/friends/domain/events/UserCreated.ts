import {DomainEvent} from "../../../shared/domain/events/DomainEvent";
import {UserPrimitive} from "../entities/User";
import {UUID} from "../../../shared/domain/values-objects/UUID";

export class UserCreated extends DomainEvent {
    static readonly EVENT_NAME = 'user.created';
    readonly user: UserPrimitive;

    constructor(data: { user: UserPrimitive, entityId: string; eventId: string; occurredOn: Date }) {
        const {user, entityId, eventId, occurredOn} = data;
        super({eventName: UserCreated.EVENT_NAME, entityId, eventId, occurredOn});
        this.user = user;
    }

    static create(user: UserPrimitive): UserCreated {
        const eventId = UUID.random().value;
        const occurredOn = new Date(Date.now());

        return new UserCreated({
            user,
            entityId: user.id,
            eventId,
            occurredOn
        });
    }

    toPrimitives(): UserCreatedAttributes {
        const {user} = this;
        return {user}
    }
}

type UserCreatedAttributes = {
    readonly user: UserPrimitive
};