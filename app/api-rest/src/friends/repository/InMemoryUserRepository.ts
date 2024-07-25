import {User, UserRepository} from "arena-split-core";

export class InMemoryUserRepository implements UserRepository {
    private readonly users: User[];

    constructor() {
        this.users = [];
    }

    async add(user: User): Promise<void> {
        this.users.push(user);
    }
}