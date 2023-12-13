import TypeEventsRepository from "../repository/TypeEventsRepository";
import Usecase from "./Usecase";

export default class GetTypeEvents implements Usecase {
    constructor(readonly typeEventSRepository: TypeEventsRepository) {
    }
    async execute(input?: any): Promise<any> {
        const classifications = await this.typeEventSRepository.getTypeEvents();
        const output = [];
        for(const classification of classifications) {
            output.push(classification);
        }
        return output;
    }
}