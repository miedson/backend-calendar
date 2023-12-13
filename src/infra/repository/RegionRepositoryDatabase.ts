import RegionRepository from "../../application/repository/RegionRepository";
import Filial from '../../domain/entities/Filial';
import Region from '../../domain/entities/Region';
import Connection from '../database/Connection';

export default class RegionRepositoryRepositoryDatabase implements RegionRepository {
    constructor(readonly connection: Connection) {
    }
    async getRegions(): Promise<Region[]> {
        const regions = [];
        const regionsData = await this.connection.query("select * from region", []);
        const filiaisData = await this.connection.query("select * from filiais", []);
        for(const regionItem of regionsData) {
            const region = new Region(regionItem.id, regionItem.name);
            const filiaisRegion = filiaisData.filter((filial: any) => filial.region_id === regionItem.id);
            for(const filialRegion of filiaisRegion) {
                const filial = new Filial(filialRegion.id, filialRegion.name, filialRegion.code);
                region.addFilial(filial);
            }
            regions.push(region);
        }
        return regions;
    }
    
}