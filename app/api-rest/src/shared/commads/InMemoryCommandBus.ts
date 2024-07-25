import {Command, CommandBus, CommandHandler, CommandHandlerNotRegisteredError} from "arena-split-core";
import CommandHandlers from "./CommandHandlers";

export class InMemoryCommandBus implements CommandBus {
    constructor(private readonly commandHandlers: CommandHandlers) {
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlers.get(command);

        this.ensureHandlerExists(handler, command);

        await handler.handle(command);
    }

    private ensureHandlerExists(handler: CommandHandler<Command>, command: Command) {
        if (!handler) {
            throw new CommandHandlerNotRegisteredError(command);
        }
    }

}