import {Email, User, UserId, UserName, UserRepository} from "../../../../src";

export class UserRepositoryMock implements UserRepository {
    private readonly users: User[] = [];
    private user: User | null = null;

    async add(user: User): Promise<void> {
        this.users.push(user);
    }

    getLastUserCreated(): User {
        return this.users[this.users.length - 1];
    }

    count(): number {
        return this.users.length;
    }

    getLastUserUpdated(): User {
        return this.user!;
    }

    async findByEmail(email: Email): Promise<User | null> {
        const index = this.users.findIndex(user => user.getEmail().equals(email));
        return index !== -1 ? this.users[index] : null;
    }

    async updateFromId(user: User): Promise<void> {
        this.user = user;
    }

    async findByUsername(username: UserName): Promise<User | null> {
        const index = this.users.findIndex(user => user.getUsername().equals(username));
        return index !== -1 ? this.users[index] : null;
    }

    async findById(id: UserId): Promise<User | null> {
        const index = this.users.findIndex(user => user.id.equals(id));
        return index !== -1 ? this.users[index] : null;
    }
}
