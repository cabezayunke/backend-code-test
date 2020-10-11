import { uuid, isUuid } from "uuidv4";
import UuidInvalid from "./UuidInvalid";

export default class Uuid {
    value: string;

    constructor(value?: string) {
        if(value) {
            this.validate(value);
            this.value = value;
        } else {
            // we will try and create IDs externally (from the clients)
            // but we can't trust them, so as a last resource we will create
            // the IDs ourselves
            this.value = uuid();
        }
    }

    validate(value: string) {
        if(!isUuid(value)) {
            throw new UuidInvalid(value);
        }
    }
}