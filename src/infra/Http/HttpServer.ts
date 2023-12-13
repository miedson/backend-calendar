export default interface HttpServer{
    on(method: string, endpoint: string, callback: Function): void;
    listen(port: number): void;
}