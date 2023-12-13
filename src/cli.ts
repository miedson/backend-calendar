import FreeQueue from './application/usecase/FreeQueue';
import SaveEvent from './application/usecase/SaveEvent';
import NodeMailerAdapter from './infra/mail/NodeMailerAdapter';
import KafkaJsQueueAdapter from './infra/queue/KafkaJsQueueAdapter';
import KafkaQueueAdapter from './infra/queue/KafkaQueueAdapter';
import EventRepositoryDatabase from './infra/repository/EventRepositoryDatabase';
import PgPromiseAdapter from './infra/database/PgPromiseAdapter';
import UserRepositoryDatabase from './infra/repository/UserRepositoryDatabase';
import Calendar from './application/usecase/Calendar';

const connnection = new PgPromiseAdapter();
const eventRepositoryDatabase = new EventRepositoryDatabase(connnection);
const userRepositoryDatabase = new UserRepositoryDatabase(connnection);
const queue = new KafkaQueueAdapter();
process.stdin.on('data', async (chunk) => {
    const command = chunk.toString().replace(/\n/g, "").trim();
        if(command.startsWith("novo")){
            const [title, description, region, filial, date, classification, type_event] = command.replace("novo ", "").split(" ");
            try {
                const saveEvent = new SaveEvent(eventRepositoryDatabase, userRepositoryDatabase, queue);
                await saveEvent.execute({
                    title,
                    description,
                    region,
                    filial,
                    date: new Date(date),
                    classification,
                    type_event
                });
                console.log('salvo com sucesso');
            }catch(error) {
                console.log(error)
            }
        }
        if(command.startsWith("calendario")){
            try{
                const [year, region, filial] = command.replace("calendario ", "").split(" ");
                const calendar = new Calendar(eventRepositoryDatabase);
                const output = await calendar.execute({year, region, filial});
            console.log(output);
            }catch(error){
                console.log(error);
            }
        }
        if(command.startsWith("kafka")){
            try{
                const free = new FreeQueue(new KafkaQueueAdapter());
                const messages = await free.execute('events');
                console.log(messages);
            }catch(error){
                console.log(error);
            }
        }
})