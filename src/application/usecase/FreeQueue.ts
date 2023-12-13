import NodeMailerAdapter from "../../infra/mail/NodeMailerAdapter";
import Queue from "../../infra/queue/Queue";

export default class FreeQueue {
    constructor(readonly queue: Queue){
    }
    async execute(queueName: string): Promise<void> {
        await this.queue.connect();
        await this.queue.on(queueName, async (...args: any[]) => {
            // const data = JSON.parse(message.value);
            // const date = new Date(data.date);  
            // await this.nodeMailer.createTransport();
            // await this.nodeMailer.send({
            //     from: 'contato@pdi2023.com.br',
            //     to: data.email,
            //     subject: 'Novo evento',
            //     text: `O evento ${data.title} foi adicionado na data ${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`
            // }, (...args) => {
            //     console.log(...args);
            // });
            console.log(...args);
        });
    }
}