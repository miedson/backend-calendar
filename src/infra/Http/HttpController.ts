import HttpServer from "./HttpServer";
import RouteInterface from "../../api/RoutesInterface";

export default class HttpController {
    httpServer: HttpServer;
    constructor(httpServer: HttpServer, readonly routes: RouteInterface[]){
        this.httpServer = httpServer;
        routes.forEach(route => {
            this.httpServer.on(route.method, route.endpoint, async (params: any, body: any) => {
                const factory = route.factory;
                const useCase = factory.createUseCase();
                const output = await useCase.execute({...params, ...body});
                return output;
            })
        });
    }
}