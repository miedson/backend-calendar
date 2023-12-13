import TypeEvent from '../../domain/entities/TypeEvent';
export default interface TypeEventsRepository {
    getTypeEvents(): Promise<TypeEvent[]>;
}