
export default abstract class DomainEvent {


    constructor(protected name: string, protected data?: any) {}

    getName(): string {
        return this.name;
    }

    getContents(): any {
        return this.data;
    }
}