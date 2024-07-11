import {Command, CommandBus} from "arena-split-core";
export class InMemorySyncCommandBus implements CommandBus {
    private counter = 0;
    async dispatch(command: Command): Promise<void> {
        this.counter++;
        console.log('Command dispatched', command);
    }

    getCount(): number {
        return this.counter;
    }
}