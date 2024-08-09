import {User} from "../entities/User";
import {UserId} from "../entities/UserId";


export interface UserRepository {
    add(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: UserId): Promise<User>;
    updateFromId(user: User): Promise<void>;
}