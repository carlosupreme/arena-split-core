import {beforeAll, describe, expect, it} from "vitest";
import {UserRepositoryMock} from "../mocks/UserRepositoryMock";
import {CreateUserCommandHandler} from "../../../../src/friends/application/create/CreateUserCommandHandler";
import {CreateUserCommand} from "../../../../src/friends/application/create/CreateUserCommand";
import {InMemoryEventBus} from "../../../shared/domain/events/InMemoryEventBus";
import {Uuid} from "../../../../src";

let repository: UserRepositoryMock;
let eventBus: InMemoryEventBus;
let handler: CreateUserCommandHandler;

beforeAll(() => {
    repository = new UserRepositoryMock();
    eventBus = new InMemoryEventBus();
    handler = new CreateUserCommandHandler(repository, eventBus);
});

describe('CreateUserCommandHandler', async () => {

    it('should create a valid user', async () => {
        const userIdGeneratedPreviously = Uuid.random().value;
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

});