export default interface Queue {
    connect(): Promise<void>;
    on(queueName: string, callback: Function): Promise<void>;
    send(payloads: any, callback: Function): Promise<void>;
}