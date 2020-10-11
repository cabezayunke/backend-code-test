import Genially from "../../../../src/contexts/core/genially/domain/Genially";

export default class GeniallyTestHelper {
    assertGenially(expected: any, received: Genially) {
        expect(received.id).toMatchObject(expected.id);
        expect(received.name).toMatchObject(received.name);
        expect(received.description).toMatchObject(received.description);
        expect(received.createdAt.getTime()).toBeLessThan(Date.now());
    }
}