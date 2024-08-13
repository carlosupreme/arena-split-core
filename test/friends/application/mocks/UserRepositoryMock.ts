import {User, UserRepository} from "../../../../src";

export class UserRepositoryMock implements UserRepository {
    private readonly users: User[] = [];
    private user: User | null = null;

    async add(user: User): Promise<void> {
        this.users.push(user);
    }

    getLastUserCreated(): User {
        return this.users[this.users.length - 1];
    }

    getLastUserUpdated(): User {
        return this.user!;
    }

    async findByEmail(_email: string): Promise<User | null> {
        return null;
    }


    async updateFromId(user: User): Promise<void> {
        this.user = user;
    }
}
