import {Entity} from "../../../shared/domain/entities/Entity";
import {UserId} from "./UserId";
import {UserCreated} from "../events/UserCreated";

export class User extends Entity<UserId> {
    private name: string;

    constructor(id: UserId, name: string) {
        super(id);
        this.name = name;
    }

    static create(id: UserId, name: string): User {
        const user = new User(id, name);
        user.addDomainEvent(new UserCreated({entityId: user.id.value, name: user.getName()}));
        return user;
    }

    getName(): string {
        return this.name;
    }

    updateName(name: string): void {
        this.name = name;
    }
}