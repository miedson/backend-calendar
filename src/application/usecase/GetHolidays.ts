import Usecase from "./Usecase";
import EventRepositoryDatabase from '../../infra/repository/EventRepositoryDatabase';

export default class GetHolidays implements Usecase {
    constructor(readonly eventRepositoryDatabase: EventRepositoryDatabase) {
    }
    async execute(input?: any): Promise<any> {
        const output = [];
        const holidays_id = 1
        const holidays = await this.eventRepositoryDatabase.getEventsByType(input.year, input.region, input.filial, holidays_id);
        for(const holiday of holidays) {
            output.push({
                title: holiday.title,
                description: holiday.description,
                region: holiday.region,
                filial: holiday.filial,
                date: holiday.date,
                type_event: holiday.type_event
            });
        }
        return output;
    }
    
}