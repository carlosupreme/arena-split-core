import {User} from "../entities/User";
import {Email} from "../value-objects/Email";
import {UserName} from "../value-objects/UserName";
import {UserId} from "../entities/UserId";


export interface UserRepository {
    add(user: User): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    findByUsername(username: UserName): Promise<User | null>;
    updateFromId(user: User): Promise<void>;
}