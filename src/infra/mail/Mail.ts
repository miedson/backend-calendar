export default interface Mail {
    createTransport(): Promise<void>;
    send(mailOptions: any, callback:(...args: any[]) => void): Promise<void>;
}