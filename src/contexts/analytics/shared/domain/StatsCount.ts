
import StatsCountInvalid from "./StatsCountInvalid";

/**
 * StatsCount value object
 *
 * Although it is not specified in the requirements
 * we assume here that stats count cannot be negative
 */
export default class StatsCount {
    value: number;

    constructor(value?: number) {
        if(value) {
            this.validate(value);
            this.value = value;
        } else {
            this.value = 0;
        }
    }

    validate(value: number) {
        if(value < 0) {
            throw new StatsCountInvalid(value);
        }
    }

    increase() {
        this.value++;
    }
}