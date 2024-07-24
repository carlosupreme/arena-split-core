import {ContainerBuilder, Reference} from "node-dependency-injection";
import {InMemoryUserRepository} from "../friends/repository/InMemoryUserRepository";
import {CreateUserCommandHandler, LogOnUserCreated} from "arena-split-core";
import {FriendsPostController} from "../friends/controllers/FriendsPostController";

export default function registerFriends(container: ContainerBuilder) {
    container.register('UserRepository', InMemoryUserRepository)
    container.register('CreateUserCommandHandler', CreateUserCommandHandler)
        .addArgument(new Reference('UserRepository'))
        .addArgument(new Reference('EventBus'))
        .addTag('commandHandler')

    container.register('FriendsPostController', FriendsPostController).addArgument(new Reference('CommandBus'))
    container.register('LogOnUserCreated', LogOnUserCreated).addTag('domainEventSubscriber')

    return container;
}