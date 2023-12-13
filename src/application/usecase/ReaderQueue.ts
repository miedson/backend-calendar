import Queue from "../../infra/queue/Queue";

export default class ReadQueue {
    constructor(readonly queue: Queue){
    }
    async execute(queueName: string): Promise<any> {
        await this.queue.on(queueName, async (message: any) => {
            console.log(message);
        })
    }
}