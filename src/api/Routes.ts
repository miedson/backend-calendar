import RouteInterface from "./RoutesInterface";
import CalendarFactory from "../application/factory/CalendarFactory";
import Connection from "../infra/database/Connection";
import GetClassificationsFactory from "../application/factory/GetClassificationsFactory";
import GetRegionsFactory from "../application/factory/GetRegionsFactory";
import GetHolidaysFactory from "../application/factory/GetHolidaysFactory";
import GetTypeEventsFactory from "../application/factory/GetTypeEventsFactory";
import SaveEventFactory from "../application/factory/SaveEventFactory";

export default class Routes {
    connection: Connection;
    routes: RouteInterface[] = [];

    constructor(connection: Connection){
        this.connection = connection;
    }

    get(): RouteInterface[] {
        return this.routes = [
            {
                method: "get",
                endpoint: "/calendar/:year/:region/:filial",
                factory: new CalendarFactory(this.connection)
            },
            {
                method: "get",
                endpoint: "/classifications",
                factory: new GetClassificationsFactory(this.connection)
            },
            {
                method: "get",
                endpoint: "/regions",
                factory: new GetRegionsFactory(this.connection)
            },
            {
                method: "get",
                endpoint: "/feriados/:year/:region/:filial",
                factory: new GetHolidaysFactory(this.connection)
            },
            {
                method: "get",
                endpoint: "/types",
                factory: new GetTypeEventsFactory(this.connection)
            },
            {
                method: "post",
                endpoint: "/event/save",
                factory: new SaveEventFactory(this.connection)
            }
        ];
    }
}