export default class Classification {
    constructor(readonly name: string, readonly id?: number, readonly color?: string) {
        if(this.name === undefined) {
            throw new Error("Invalid name");
        }
    }
}