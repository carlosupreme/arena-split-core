import {ContainerBuilder} from "node-dependency-injection";
import registerShared from "./shared";
import registerFriends from "./friends";

const container = new ContainerBuilder(true, __dirname)
registerShared(container)
registerFriends(container)

export default container;
