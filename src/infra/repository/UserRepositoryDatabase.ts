import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/entities/User";
import Connection from "../database/Connection";

export default class UserRepositoryDatabase implements UserRepository {
    constructor(readonly connection: Connection){
    }

    async getUsers(): Promise<User[]> {
        const users = [];
        const usersData = await this.connection.query(`select * from users`, []);
        for(const userItem of usersData) {
            users.push(new User(userItem.name, userItem.email));
        }
        return users;
    }
    saveUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}