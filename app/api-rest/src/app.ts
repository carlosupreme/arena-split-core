import container from './di';
import {Server} from './server';
import {Command, CommandHandler, DomainEvent, DomainEventSubscriber, EventBus} from "arena-split-core";
import CommandHandlers from "./shared/commads/CommandHandlers";

export class Application {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);

        await this.configureEventBus();
        await this.configureCommandBus();

        return this.server.listen();
    }

    get httpServer() {
        return this.server?.getHTTPServer();
    }

    async stop() {
        return this.server?.stop();
    }

    private async configureEventBus() {
        const eventBus = container.get<EventBus>('EventBus');

        const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber');

        for (const {id} of subscriberDefinitions) {
            const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(id);
            eventBus.addSubscribers(domainEventSubscriber);
        }
    }

    private async configureCommandBus() {
        const commandHandlers = container.get<CommandHandlers>('CommandHandlers');

        const commandHandlerDefinitions = container.findTaggedServiceIds('commandHandler');

        for (const {id} of commandHandlerDefinitions) {
            const commandHandler = container.get<CommandHandler<Command>>(id);
            commandHandlers.put(commandHandler);
        }
    }
}