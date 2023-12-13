import UseCaseFactory from "../application/factory/UseCaseFactory";

export default interface RouteInterface {
    method: string;
    endpoint: string;
    factory: UseCaseFactory
}