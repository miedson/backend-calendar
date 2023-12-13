import Connection from "../../infra/database/Connection";
import KafkaQueueAdapter from "../../infra/queue/KafkaQueueAdapter";
import EventRepositoryDatabase from "../../infra/repository/EventRepositoryDatabase";
import UserRepositoryDatabase from "../../infra/repository/UserRepositoryDatabase";
import SaveEvent from "../usecase/SaveEvent";
import Usecase from "../usecase/Usecase";
import UseCaseFactory from "./UseCaseFactory";

 export default class SaveEventFactory implements UseCaseFactory {
    constructor(readonly connection: Connection) {
    }
     createUseCase(): Usecase {
        const eventRepositoryDatabase = new EventRepositoryDatabase(this.connection);
        const userRepositoryDatabase = new UserRepositoryDatabase(this.connection);
        const kafkaQueue = new KafkaQueueAdapter();
        return new SaveEvent(eventRepositoryDatabase, userRepositoryDatabase, kafkaQueue);
     }
 }