import Filial from './Filial';

export default class Region {
    filial: Filial[];
    constructor(readonly id: number, readonly name: string){
        this.filial = [];
    }

    addFilial(filial: Filial): void {
        this.filial.push(filial);
    }
}