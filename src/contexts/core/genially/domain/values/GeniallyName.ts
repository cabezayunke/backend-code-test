import GeniallyNameInvalid from "../errors/GeniallyNameInvalid";

export const MIN_LENGTH = 3;
export const MAX_LENGTH = 20;

export default class GeniallyName {
    value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = value;
    }

    validate(value: string) {
        if(!value || value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
            throw new GeniallyNameInvalid(value);
        }
    }
}