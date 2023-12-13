import Event from "../../domain/entities/Event";
export default interface EventRepository {
    getEvents(region_id: string, filial_id: string): Promise<Event[]>;
    getEventsByType(year:string, region_id: string, filial_id: string, type_event_id: number): Promise<Event[]>;
    save(event: Event): Promise<Event>
}