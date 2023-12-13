import Connection from "../../infra/database/Connection";
import ClassificationRepositoryDatabase from "../../infra/repository/ClassificationRepositoryDatabase";
import GetClassifications from "../usecase/GetClassifications";
import Usecase from "../usecase/Usecase";
import UseCaseFactory from "./UseCaseFactory";

export default class GetClassificationsFactory implements UseCaseFactory {
    constructor(readonly connection: Connection) {
    }
    createUseCase(): Usecase {
        const classificationRepository = new ClassificationRepositoryDatabase(this.connection);
        return new GetClassifications(classificationRepository);
    }
    
}