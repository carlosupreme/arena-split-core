import {CommandBus} from "../../../../src/shared/application/commands/CommandBus";
import {Command} from "../../../../src/shared/application/commands/Command";
import {CommandHandlers} from "./CommandHandlers";

export class InMemoryCommandBus implements CommandBus {
    constructor(private commandHandlers: CommandHandlers) {}

    async dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlers.get(command);

        await handler.handle(command);
    }
}
