import Usecase from "../usecase/Usecase";

export default interface UseCaseFactory {
    createUseCase(): Usecase;
}