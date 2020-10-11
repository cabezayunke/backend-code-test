
const NAME = "core.genially.created";

export default class GeniallyCreated implements DomainEvent {
    data: any;

    constructor(data: any) {
        this.data = data;
    }

    getFullyQualifiedName(): string {
        return NAME;
    }

    getContents(): any {
        return this.data;
    }
}