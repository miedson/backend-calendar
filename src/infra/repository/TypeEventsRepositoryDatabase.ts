import TypeEventsRepository from "../../application/repository/TypeEventsRepository";
import TypeEvent from "../../domain/entities/TypeEvent";
import Connection from '../database/Connection';

export default class TypeEventsRepositoryDatabase implements TypeEventsRepository {
    constructor(readonly connection: Connection) {
    }
    async getTypeEvents(): Promise<TypeEvent[]> {
        const types = [];
        const typesData = await this.connection.query("select * from types_events", []);
        for(const typeItem of typesData) {
            types.push(new TypeEvent(typeItem.type, typeItem.id));
        }
        return types;
    }
}