import HttpServer from "./HttpServer";
import express, {Request, Response} from 'express';
import cors from 'cors';

export default class ExpressAdapter implements HttpServer {
    app: any;

    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
    }
    on(method: string, endpoint: string, callback: Function): void {
        this.app[method](endpoint, async function(request: Request, response: Response){
            try{
                const output = await callback(request.params, request.body);
                response.json(output);
            }catch(error: any){
                response.status(422).json({
                    message: error.message
                });
            }
        });
    }
    listen(port: number): void {
        this.app.listen(port);
    }
    
}