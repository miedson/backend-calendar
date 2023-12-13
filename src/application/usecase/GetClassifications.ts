import ClassificationRepository from "../repository/ClassificationRepository";
import Usecase from "./Usecase";

export default class GetClassifications implements Usecase {
    constructor(readonly classificationRepository: ClassificationRepository) {
    }
    async execute(input?: any): Promise<any> {
        const classifications = await this.classificationRepository.getClassifications();
        const output = [];
        for(const classification of classifications) {
            output.push(classification);
        }
        return output;
    }

}