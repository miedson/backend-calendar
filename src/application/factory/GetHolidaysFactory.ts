import Connection from "../../infra/database/Connection";
import EventRepositoryDatabase from "../../infra/repository/EventRepositoryDatabase";
import GetHolidays from "../usecase/GetHolidays";
import Usecase from "../usecase/Usecase";
import UseCaseFactory from "./UseCaseFactory";

 export default class GetHolidaysFactory implements UseCaseFactory {
    constructor(readonly connection: Connection) {
    }
     createUseCase(): Usecase {
        const eventRepository = new EventRepositoryDatabase(this.connection);
        return new GetHolidays(eventRepository);
     }
 }