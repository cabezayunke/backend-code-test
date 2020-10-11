import Genially from "../../../../src/contexts/core/genially/domain/Genially";
import GeniallyName from "../../../../src/contexts/core/genially/domain/values/GeniallyName";
import GeniallyNameInvalid from "../../../../src/contexts/core/genially/domain/errors/GeniallyNameInvalid";
import GeniallyDescription from "../../../../src/contexts/core/genially/domain/values/GeniallyDescription";
import GeniallyDescriptionInvalid from "../../../../src/contexts/core/genially/domain/errors/GeniallyDescriptionInvalid";

export default class GeniallyTestHelper {
    assertGenially(expected: any, received: Genially) {
        expect(received.id).toMatchObject(expected.id);
        expect(received.name).toMatchObject(received.name);
        expect(received.description).toMatchObject(received.description);
        expect(received.createdAt.getTime()).toBeLessThan(Date.now());
    }

    assertInvalidGeniallyName = (param?: string) => {
        expect(() => new GeniallyName(param)).toThrow(GeniallyNameInvalid);
    }

    assertInvalidGeniallyDescription = (param?: string) => {
        expect(() => new GeniallyDescription(param)).toThrow(GeniallyDescriptionInvalid);
    }
}