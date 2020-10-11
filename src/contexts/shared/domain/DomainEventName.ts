import DomainEventNameInvalid from "./DomainEventNameInvalid";

export default class DomainEventName {
    value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = value;
    }

    validate(value: string) {
        if(!value || !value.length || value.split(".").length !== 3) {
            throw new DomainEventNameInvalid(value);
        }
    }
}