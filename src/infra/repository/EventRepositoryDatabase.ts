import EventRepository from '../../application/repository/EventRepository';
import Event from '../../domain/entities/Event';
import Connection from '../database/Connection';
export default class EventRepositoryDatabase implements EventRepository {
    constructor(readonly connection: Connection) {
    }
    async getEvents(region_id: string, filial_id: string): Promise<Event[]> {
        const events = [];
        const eventsData = await this.connection.query(
            `select
                e.title
                ,e.description
                ,r.name as region
                ,f.name as filial
                ,e.date
                ,c.name as classification
                ,c.color
                ,te.type as type_event
            from events e
            inner join region r on e.region_id = r.id
            inner join filiais f on e.filial_id = f.id
            inner join classifications c on e.classification_id = c.id
            inner join types_events te on e.type_event_id = te.id
            where e.region_id = $1
            and e.filial_id = $2`,
            [region_id, filial_id]);
        for(const eventItem of eventsData) {
            const event = new Event(eventItem.title, eventItem.description, eventItem.region, eventItem.filial, eventItem.date, eventItem.classification, eventItem.type_event, eventItem.color);
            events.push(event);
        }
        return events;
    }
    async getEventsByType(year:string, region_id: string, filial_id: string, type_event_id: number): Promise<Event[]> {
        const events = [];
        const eventsData = await this.connection.query(`
            select
                e.title
                ,e.description
                ,r.name as region
                ,f.name as filial
                ,e.date
                ,c.name as classification
                ,c.color
                ,te.type as type_event
            from events e
            inner join region r on e.region_id = r.id
            inner join filiais f on e.filial_id = f.id
            inner join classifications c on e.classification_id = c.id
            inner join types_events te on e.type_event_id = te.id
            where to_char(e.date, 'yyyy') = $1
            and e.region_id = $2
            and e.filial_id = $3 
            and e.type_event_id = $4`,
            [year, region_id, filial_id, type_event_id]);
        for(const eventItem of eventsData) {
            const event = new Event(eventItem.title, eventItem.description, eventItem.region, eventItem.filial, eventItem.date, eventItem.classification, eventItem.type_event, eventItem.color);
            events.push(event);
        }
        return events;
    }
    async save(event: Event): Promise<Event> {
        // const filial = await this.connection.query(`select id from filiais where code = $1`, [event.filial]);
        const response = await this.connection.query(`
        insert into events (title, description, region_id, filial_id, date, classification_id, type_event_id) 
        values ($1, $2, $3, $4, $5, $6, $7)`, 
        [event.title, event.description, event.region, event.filial, event.date, event.classification, event.type_event]
        );
        return response;
    }
}