import {Entity} from "../../../shared/domain/entities/Entity";
import {UserId} from "./UserId";
import {UserCreated} from "../events/UserCreated";
import {Email} from "../value-objects/Email";
import {FullName} from "../value-objects/FullName";
import {UserName} from "../value-objects/UserName";

export class User extends Entity<UserId> {
    constructor(
        id: UserId,
        private fullName: FullName,
        private email: Email,
        private username: UserName
    ) {
        super(id);
    }

    static create(userPrimitive: UserPrimitive): User {
        const {id, fullName, email, username} = userPrimitive;
        const user = new User(new UserId(id), new FullName(fullName), new Email(email), new UserName(username));

        user.addDomainEvent(UserCreated.create(user.toPrimitives()));
        return user;
    }

    getFullName(): FullName {
        return this.fullName;
    }

    getEmail(): Email {
        return this.email;
    }

    getUsername(): UserName {
        return this.username;
    }

    toPrimitives(): UserPrimitive {
        return {
            id: this.id.value,
            fullName: this.fullName.value,
            email: this.email.value,
            username: this.username.value
        }
    }
}

export type UserPrimitive = {
    id: string;
    fullName: string;
    email: string;
    username: string;
}