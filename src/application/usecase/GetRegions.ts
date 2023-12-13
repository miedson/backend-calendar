import Usecase from "./Usecase";
import RegionRepositoryRepositoryDatabase from "../../infra/repository/RegionRepositoryDatabase";

export default class GetRegions implements Usecase {
    constructor(readonly regionRepositoryRepositoryDatabase: RegionRepositoryRepositoryDatabase){
    }
    async execute(input?: any): Promise<any> {
        const regions = await this.regionRepositoryRepositoryDatabase.getRegions();
        const output = [];
        for(const filial of regions) {
            output.push(filial);
        }
        return output;
    }
}