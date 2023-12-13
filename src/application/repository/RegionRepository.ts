import Region from '../../domain/entities/Region';
export default interface RegionRepository {
    getRegions(): Promise<Region[]>;
}