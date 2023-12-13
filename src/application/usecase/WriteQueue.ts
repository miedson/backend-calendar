import Queue from "../../infra/queue/Queue";

export default class WriteQueue {
    constructor(readonly queue: Queue){
    }
    async execute(payloads: any): Promise<any> {
        await this.queue.send(payloads)
    }
}