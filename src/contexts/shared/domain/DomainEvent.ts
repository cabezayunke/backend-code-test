
export default abstract class DomainEvent {

    data: any;

    constructor(data: any) {
        this.data = data;
    }

    abstract getFullyQualifiedName(): string;

    getContents(): any {
        return this.data;
    }
}