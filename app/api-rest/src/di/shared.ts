import {ContainerBuilder, Reference} from "node-dependency-injection";
import {InMemoryEventBus} from "../shared/events/InMemoryEventBus";
import CommandHandlers from "../shared/commads/CommandHandlers";
import {InMemoryCommandBus} from "../shared/commads/InMemoryCommandBus";
import {HealthController} from "../shared/controllers/HealthController";

export default function registerShared(container: ContainerBuilder){
    container.register('EventBus', InMemoryEventBus)
    container.register('CommandHandlers', CommandHandlers)
    container.register('CommandBus', InMemoryCommandBus).addArgument(new Reference('CommandHandlers'))
    container.register('HealthController', HealthController);

    return container;
}