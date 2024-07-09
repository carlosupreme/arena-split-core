import {User} from "./User";

export interface UserRepository {
    add(user: User): Promise<void>;
}