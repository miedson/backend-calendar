import Month from '../../domain/entities/Month';
import Usecase from "./Usecase";
import EventRepository from '../repository/EventRepository';
import Day from '../../domain/entities/Day';

export default class Calendar implements Usecase {
    constructor(readonly eventRepository: EventRepository) {
    }
    async execute(input: Input): Promise<Output> {
        const output = [];
        const events = await this.eventRepository.getEvents(input.region, input.filial);
        for (let monthIndex = 0; monthIndex <= 11; monthIndex++) {
            const month = new Month(parseInt(input.year), monthIndex);
            const daysWithEvents = [];
            for(const dayOfMonth of month.days) {
                const day = new Day(dayOfMonth);
                events.forEach(event => day.addEvent(event));
                daysWithEvents.push(day);
            }
            output.push({
                description: month.description,
                monthNumber: month.monthNumber, 
                days: daysWithEvents,
                firstDayOfMonth: month.firstDayOfMonth,
                daysOfWeek: month.daysOfWeek
            });
        }
        return output;
    }
}

type Input = {
    year: string;
    region: string;
    filial: string;
}

type Output = {
    description: string,
    monthNumber: number, 
    days: Day[],
    firstDayOfMonth: Date
    daysOfWeek: string[]
}[];