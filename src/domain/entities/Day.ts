import Event from './Event';
export default class Day {
    events: Event[];
    constructor(readonly date: Date){
        if(this.date === undefined){
            throw new Error("invalid for Day");
        }
        this.date = date;
        this.events = [];
    }

    addEvent(event: Event): void {
        if(this.date.getTime() === event.date.getTime()){
            this.events.push(event);
        }
    }
}