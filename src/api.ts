import express, {Request, Response} from 'express';
import Calendar from './application/usecase/Calendar';
import cors from 'cors';
import EventRepositoryDatabase from './infra/repository/EventRepositoryDatabase';
import PgPromiseAdapter from './infra/database/PgPromiseAdapter';
import ClassificationRepositoryDatabase from './infra/repository/ClassificationRepositoryDatabase';
import GetClassifications from './application/usecase/GetClassifications';
import GetRegions from './application/usecase/GetRegions';
import RegionRepositoryRepositoryDatabase from './infra/repository/RegionRepositoryDatabase';
import GetHolidays from './application/usecase/GetHolidays';
import TypeEventsRepositoryDatabase from './infra/repository/TypeEventsRepositoryDatabase';
import GetTypeEvents from './application/usecase/GetTypeEvents';
import SaveEvent from './application/usecase/SaveEvent';
import KafkaQueueAdapter from './infra/queue/KafkaQueueAdapter';
import UserRepositoryDatabase from './infra/repository/UserRepositoryDatabase';
import NodeMailerAdapter from './infra/mail/NodeMailerAdapter';

const app = express();
app.use(express.json());
app.use(cors())
const connection = new PgPromiseAdapter();

app.get("/calendar/:year/:region/:filial", async (req: Request, res: Response) => {
    const {year, region, filial} = req.params;
    const eventRepositoryDataBase = new EventRepositoryDatabase(connection);
    const calendar = new Calendar(eventRepositoryDataBase);
    const output = await calendar.execute({year, region, filial})
    res.json(output);
    res.end();
});

app.get("/classifications", async (req: Request, res: Response) => {
    const classificationRepositoryDatabase = new ClassificationRepositoryDatabase(connection);
    const classifications = new GetClassifications(classificationRepositoryDatabase);
    const output = await classifications.execute();
    res.json(output);
    res.end();
})

app.get("/regions", async (req: Request, res: Response) => {
    const regionRepositoryDatabase = new RegionRepositoryRepositoryDatabase(connection);
    const region = new GetRegions(regionRepositoryDatabase);
    const output = await region.execute();
    res.json(output);
    res.end();
})

app.get("/feriados/:year/:region/:filial", async (req: Request, res: Response) => {
    const {year, region, filial} = req.params;
    const eventRepositoryDataBase = new EventRepositoryDatabase(connection);
    const getHolidays = new GetHolidays(eventRepositoryDataBase);
    const output = await getHolidays.execute({year, region, filial});
    res.json(output);
    res.end();
});

app.get("/types", async (req: Request, res: Response) => {
    const typesRepositoryDatabase = new TypeEventsRepositoryDatabase(connection);
    const types = new GetTypeEvents(typesRepositoryDatabase);
    const output = await types.execute();
    res.json(output);
    res.end();
})

app.post("/event/save", async (req: Request, res: Response) => {
    try {
        const body = req.body
        const eventRepositoryDatabase = new EventRepositoryDatabase(connection);
        const userRepositoryDatabase = new UserRepositoryDatabase(connection);
        const kafkaQueue = new KafkaQueueAdapter();
        const save = new SaveEvent(eventRepositoryDatabase, userRepositoryDatabase, kafkaQueue);
        const output = await save.execute(body);
        res.json(output);
        res.end();
    } catch(error: any) {
        res.status(422).json({
            message: error.message
        })
    }
})

app.listen(4000);