import Connection from "../../infra/database/Connection";
import RegionRepositoryRepositoryDatabase from "../../infra/repository/RegionRepositoryDatabase";
import GetRegions from "../usecase/GetRegions";
import Usecase from "../usecase/Usecase";
import UseCaseFactory from "./UseCaseFactory";

export default class GetRegionsFactory implements UseCaseFactory {
    constructor(readonly connection: Connection) {
    }
    createUseCase(): Usecase {
        const regionRepository = new RegionRepositoryRepositoryDatabase(this.connection);
        return new GetRegions(regionRepository);
    }
    
}