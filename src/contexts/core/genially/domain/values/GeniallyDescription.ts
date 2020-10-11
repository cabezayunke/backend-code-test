import GeniallyDescriptionInvalid from "../errors/GeniallyDescriptionInvalid";

const MAX_LENGTH = 125;

export default class GeniallyDescription {
    value: string;

    constructor(value?: string) {
        this.validate(value);
        this.value = value;
    }

    validate(value: string) {
        if(value && value.length > MAX_LENGTH) {
            throw new GeniallyDescriptionInvalid(value)
        }
    }
}