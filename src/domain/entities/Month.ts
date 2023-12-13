export default class Month {
    days: Date[];
    lastDayPreviousMonth: Date;
    lastDayOfMonth: Date;
    description: string;
    monthNumber: number;
    firstDayOfMonth: Date;
    daysOfWeek: string[];

    constructor(readonly year:number, readonly month: number) {
        if(this.year === undefined || this.month == undefined){
            throw new Error("invalid argument for Month");
        }
        this.days = [];
        this.lastDayPreviousMonth = new Date(year, month, 0);
        this.lastDayOfMonth = new Date(year, month + 1, 0);
        this.description = this.lastDayOfMonth.toLocaleString('pt-BR', {month: 'long'});
        this.monthNumber = month + 1;
        this.firstDayOfMonth = new Date(year, month, 1);
        this.daysOfWeek = ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        this.makeMonth();
    }

    private makeMonth(): void {
        const lastDayPreviousMonth = this.lastDayPreviousMonth;
        const startDate = new Date(lastDayPreviousMonth.setDate(this.lastDayPreviousMonth.getDate() - this.getDayOfWeekStartsMonth()));
        const endDate = this.lastDayOfMonth;
        while(startDate <= endDate) {
            this.days.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
          }
    }

    private getDayOfWeekStartsMonth(): number {
        const sabado = 6
        return this.lastDayPreviousMonth.getDay() !== sabado ? this.lastDayPreviousMonth.getDay() : 0;
    }
}