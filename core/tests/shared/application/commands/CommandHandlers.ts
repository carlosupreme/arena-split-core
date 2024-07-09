import {Command} from "../../../../src/shared/application/commands/Command";
import {CommandHandler} from "../../../../src/shared/application/commands/CommandHandler";
import {
    CommandHandlerNotRegisteredError
} from "../../../../src/shared/application/commands/CommandHandlerNotRegisteredError";

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
    constructor(commandHandlers: Array<CommandHandler<Command>>) {
        super();

        commandHandlers.forEach(commandHandler => {
            this.set(commandHandler.subscribedTo(), commandHandler);
        });
    }

    public get(command: Command): CommandHandler<Command> {
        const commandHandler = super.get(command.constructor);

        if (!commandHandler) {
            throw new CommandHandlerNotRegisteredError(command);
        }

        return commandHandler;
    }
}