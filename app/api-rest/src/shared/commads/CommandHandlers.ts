import {Command, CommandHandler, CommandHandlerNotRegisteredError} from "arena-split-core";

export default class CommandHandlers extends Map<Command, CommandHandler<Command>> {
    public put(commandHandler: CommandHandler<Command>) {
        this.set(commandHandler.subscribedTo(), commandHandler);
    }

    public get(command: Command): CommandHandler<Command> {
        const commandHandler = super.get(command.constructor);

        if (!commandHandler) {
            throw new CommandHandlerNotRegisteredError(command);
        }

        return commandHandler;
    }
}