import { beforeEach, describe, expect, it} from "vitest";
import {UserRepositoryMock} from "../mocks/UserRepositoryMock";
import {InMemoryEventBus} from "../../../shared/domain/events/InMemoryEventBus";
import {UserId, CreateUserCommandHandler, CreateUserCommand} from "../../../../src";
import {EmailAlreadyTakenError} from "../../../../src/friends/domain/errors/EmailAlreadyTakenError";
import {UsernameAlreadyTakenError} from "../../../../src/friends/domain/errors/UsernameAlreadyTakenError";
import {UserIdAlreadyTakenError} from "../../../../src/friends/domain/errors/UserIdAlreadyTakenError";

let repository: UserRepositoryMock;
let eventBus: InMemoryEventBus;
let handler: CreateUserCommandHandler;

beforeEach(() => {
    repository = new UserRepositoryMock();
    eventBus = new InMemoryEventBus();
    handler = new CreateUserCommandHandler(repository, eventBus);
});
describe('CreateUserCommandHandler', async () => {

    it('should create a valid user', async () => {
        const userIdGeneratedPreviously = UserId.random().value;
        const command = new CreateUserCommand({
            id: userIdGeneratedPreviously,
            fullName: 'Carlos',
            email: 'carlos@carlos.com',
            username: 'usernameCarlos'
        });

        await handler.handle(command);

        const user = repository.getLastUserCreated();

        expect(user).not.toBeNull();
        expect(user.id.value).toBe(userIdGeneratedPreviously);
        expect(user.getFullName().value).toBe('Carlos');
        expect(user.getEmail().value).toBe('carlos@carlos.com');
        expect(user.getUsername().value).toBe('usernameCarlos');
    });

    it('should not create an user because of duplicated user id', async () => {
        const userId = UserId.random().value;

        const command = new CreateUserCommand({
            id:userId,
            fullName: 'Carlos',
            username: 'username1',
            email: 'email@email.com'
        });

        await handler.handle(command);

        expect(async () => {
            await handler.handle(new CreateUserCommand({
                id: userId,
                fullName: 'Carlos',
                username: 'username2',
                email: 'email23@email.com'
            }));
        }).rejects.toThrowError(UserIdAlreadyTakenError);

        expect(repository.count()).toBe(1);
    });

    it('should not create an user because of email already taken', async () => {
        const email = 'already@taken.com';

        const command = new CreateUserCommand({
            id: UserId.random().value,
            fullName: 'Carlos',
            email,
            username: 'usernameCarlos'
        });

        await handler.handle(command);

        expect(async () => {
            await handler.handle(new CreateUserCommand({
                id: UserId.random().value,
                fullName: 'Carlos',
                email,
                username: 'usernameCarlos'
            }));
        }).rejects.toThrowError(EmailAlreadyTakenError);

        expect(repository.count()).toBe(1);
    });

    it('should not create an user because of username already taken', async () => {
        const username = 'alreadytaken';

        const command = new CreateUserCommand({
            id: UserId.random().value,
            fullName: 'Carlos',
            username,
            email: 'email@email.com'
        });

        await handler.handle(command);

        expect(async () => {
            await handler.handle(new CreateUserCommand({
                id: UserId.random().value,
                fullName: 'Carlos',
                username,
                email: 'email23@email.com'
            }));
        }).rejects.toThrowError(UsernameAlreadyTakenError);

        expect(repository.count()).toBe(1);
    });
});