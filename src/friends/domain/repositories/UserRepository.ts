import {User} from "../entities/User";

export interface UserRepository {
    add(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}