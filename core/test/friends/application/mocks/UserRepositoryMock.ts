import {expect, Mock, vi} from "vitest";
import {User} from "../../../../src/friends/domain/entities/User";
import {UserRepository} from "../../../../src/friends/domain/repositories/UserRepository";


export class UserRepositoryMock implements UserRepository {
    private readonly saveMock: Mock;
    private users: Array<User> = [];

    constructor() {
        this.saveMock = vi.fn();
    }

    async add(user: User): Promise<void> {
        this.saveMock(user);
    }

    assertSaveHaveBeenCalledWith(expected: User): void {
        expect(this.saveMock).toHaveBeenCalledWith(expected);
    }
}
