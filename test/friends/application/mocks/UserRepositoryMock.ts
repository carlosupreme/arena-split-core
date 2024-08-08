import {User} from "../../../../src/friends/domain/entities/User";
import {UserRepository} from "../../../../src/friends/domain/repositories/UserRepository";

export class UserRepositoryMock implements UserRepository {
    private readonly users: User[] = [];

    async add(user: User): Promise<void> {
        this.users.push(user);
    }

    getLastUserCreated(): User {
        return this.users[this.users.length - 1];
    }

    async findByEmail(_email: string): Promise<User | null> {
        return null;
    }
}
