import {ContainerBuilder} from "node-dependency-injection";
import {FriendsPostController} from "../friends/controllers/FriendsPostController";
import {InMemoryEventBus} from "../shared/events/InMemoryEventBus";
import {InMemoryUserRepository} from "../friends/repository/InMemoryUserRepository";
import {CreateUserCommandHandler, LogOnUserCreated} from "arena-split-core";
import CommandHandlers from "../shared/commads/CommandHandlers";
import {InMemoryCommandBus} from "../shared/commads/InMemoryCommandBus";
import {HealthController} from "../shared/controllers/HealthController";

const container = new ContainerBuilder(false, '/home/carlos/programacion/arena-split/app/api-rest/src')

container.register('EventBus', InMemoryEventBus)
container.register('UserRepository', InMemoryUserRepository)
container.register('CreateUserCommandHandler', CreateUserCommandHandler,
    [container.get('UserRepository'), container.get('EventBus')])
    .addTag('commandHandler')
container.register('CommandHandlers', CommandHandlers)
container.register('CommandBus', InMemoryCommandBus).addArgument(container.get('CommandHandlers'))
container.register('FriendsPostController', FriendsPostController).addArgument(container.get('CommandBus'))
container.register('HealthController', HealthController);

container.register('LogOnUserCreated', LogOnUserCreated).addTag('domainEventSubscriber')


export default container;
