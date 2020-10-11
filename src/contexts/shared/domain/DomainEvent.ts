
export default abstract class DomainEvent {

    data: any;

    constructor(data?: any) {
        this.data = data;
    }

    abstract getName(): string;

    getContents(): any {
        return this.data;
    }
}