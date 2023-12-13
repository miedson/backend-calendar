import Usecase from "./Usecase";
import EventRepository from '../repository/EventRepository';
import Event from '../../domain/entities/Event';
import UserRepository from '../repository/UserRepository';
import Queue from "../../infra/queue/Queue";

export default class SaveEvent implements Usecase {
    constructor(readonly EventRepository: EventRepository, readonly UserRepository: UserRepository, readonly queue: Queue){
    }
    async execute(input?: any): Promise<any> {
        const event = new Event(input.title, input.description, input.region, input.filial, new Date(input.date), input.classification, input.type_event);
        const saveEvent = await this.EventRepository.save(event);
        const users = await this.UserRepository.getUsers();
        for(const user of users){
            await this.queue.send([{topic: 'events', messages: JSON.stringify({email: user.email, title: event.title, date: event.date})}], () =>{
                
            });
        }
        return saveEvent;
    }
}

type Input = {
    title: string;
    description: string;
    region: number;
    filial: number;
    date: Date;
}