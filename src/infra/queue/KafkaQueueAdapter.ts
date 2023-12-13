import { KafkaClient, Producer, Consumer } from "kafka-node";
import Queue from "./Queue";

export default class KafkaQueueAdapter implements Queue {
    client: any;
    constructor(){
        this.client = new KafkaClient({kafkaHost: 'localhost:9092'});
    }
    async connect(): Promise<void> {
        await this.client.connect();
    }
    async on(queueName: string, callback: Function): Promise<void> {
        const consumer = new Consumer(this.client, [{topic: queueName}], {});
        consumer.on('message', async (message: any) => {
            callback(message);
        })
    }
    async send(payloads: any, callback:(...args: any[]) => void): Promise<void> {
        const producer = new Producer(this.client);
        await producer.send(payloads, async (...args: any[]) => {
            callback(...args);
        });
    }

}