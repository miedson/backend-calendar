import Connection from "../../infra/database/Connection";
import EventRepositoryDatabase from "../../infra/repository/EventRepositoryDatabase";
import Calendar from "../usecase/Calendar";
import Usecase from "../usecase/Usecase";
import UseCaseFactory from "./UseCaseFactory";

 export default class CalendarFactory implements UseCaseFactory {
    constructor(readonly connection: Connection) {
    }
     createUseCase(): Usecase {
        const eventRepository = new EventRepositoryDatabase(this.connection);
         return new Calendar(eventRepository);
     }
 }