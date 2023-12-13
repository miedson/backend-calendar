import User from "../../domain/entities/User";

export default interface UserRepository {
    getUsers(): Promise<User[]>
    saveUser(user: User): Promise<void>
}