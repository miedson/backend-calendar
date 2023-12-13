import ClassificationRepository from "../../application/repository/ClassificationRepository";
import Classification from "../../domain/entities/Classification";
import Connection from '../database/Connection';

export default class ClassificationRepositoryDatabase implements ClassificationRepository {
    constructor(readonly connection: Connection) {
    }
    async getClassifications(): Promise<Classification[]> {
        const classifications = [];
        const classificationsData = await this.connection.query("select * from classifications", []);
        for(const classificationItem of classificationsData) {
            classifications.push(new Classification(classificationItem.name, classificationItem.id, classificationItem.color));
        }
        return classifications;
    }
}