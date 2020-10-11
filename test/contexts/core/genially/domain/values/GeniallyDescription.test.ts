import GeniallyTestHelper from "../../GeniallyTestHelper";
import GeniallyDescription, {MAX_LENGTH} from "../../../../../../src/contexts/core/genially/domain/values/GeniallyDescription";

describe('GeniallyDescriptionName', () => {
    const helper = new GeniallyTestHelper();

    test('should create valid object with no data', async () => {
        // arrange

        // act
        const name = new GeniallyDescription();

        // assert
        expect(name.value).toBeUndefined();
    });

    test('should create valid object with empty string', async () => {
        // arrange

        // act
        const name = new GeniallyDescription("");

        // assert
        expect(name.value).toMatch("");
    });

    test('should create valid object with MAX_LENGTH', async () => {
        // arrange
        const value = "a".repeat(MAX_LENGTH);

        // act
        const name = new GeniallyDescription(value);

        // assert
        expect(name.value).toMatch(value);
    });

    test('should throw error if value length > MAX_LENGTH', async () => {
        helper.assertInvalidGeniallyDescription("a".repeat(MAX_LENGTH + 1));
    });
});