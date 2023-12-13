import Classification from '../../domain/entities/Classification';
export default interface ClassificationRepository {
    getClassifications(): Promise<Classification[]>;
}