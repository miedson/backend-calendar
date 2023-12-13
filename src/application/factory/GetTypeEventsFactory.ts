import Connection from "../../infra/database/Connection";
import TypeEventsRepositoryDatabase from "../../infra/repository/TypeEventsRepositoryDatabase";
import GetTypeEvents from "../usecase/GetTypeEvents";
import Usecase from "../usecase/Usecase";
import UseCaseFactory from "./UseCaseFactory";

 export default class GetTypeEventsFactory implements UseCaseFactory {
    constructor(readonly connection: Connection) {
    }
     createUseCase(): Usecase {
        const typesRepositoryDatabase = new TypeEventsRepositoryDatabase(this.connection);
        return new GetTypeEvents(typesRepositoryDatabase);
     }
 }