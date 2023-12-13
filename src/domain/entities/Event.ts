export default class Event {
    constructor(readonly title: string, readonly description: string, readonly region: number, readonly filial: number, readonly date: Date, readonly classification: string, readonly type_event: string, readonly color?: string){
        if(this.title === undefined || this.region === undefined || this.filial === undefined){
            throw new Error("Invalid argument for event")
        }
    }
}