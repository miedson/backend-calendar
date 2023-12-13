import { Kafka } from "kafkajs";
import Queue from "./Queue";

export default class KafkaJsQueueAdapter implements Queue {
    connecton: any;
    async connect(): Promise<void> {
        this.connecton = new Kafka({
            clientId: 'calendar-app',
            brokers: ['localhost:9092']
        });
    }
    async on(queueName: string, callback: Function): Promise<void> {
        const consumer = this.connecton.consumer({groupId: 'email-group'});
        await consumer.connect();
        await consumer.subscribe({
            topic: queueName,
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async (...args: any[]) => {
                callback(...args);
            }
        });
    }
    async send(payloads: any, callback: Function): Promise<void> {
        const producer = this.connecton.producer();
        await producer.connect();
        await producer.send(payloads);
        await producer.disconnect();
    }
    
}