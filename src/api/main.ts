import PgPromiseAdapter from "../infra/database/PgPromiseAdapter";
import ExpressAdapter from "../infra/Http/ExpressAdapter";
import HttpController from "../infra/Http/HttpController";
import Routes from "./Routes";

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const routes = new Routes(connection);
new HttpController(httpServer, routes.get());
httpServer.listen(4000);