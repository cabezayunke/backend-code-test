import GeniallyTestHelper from "../../GeniallyTestHelper";
import GeniallyName, {MIN_LENGTH, MAX_LENGTH} from "../../../../../../src/contexts/core/genially/domain/values/GeniallyName";

describe('GeniallyName', () => {
    const helper = new GeniallyTestHelper();

    test('should create valid object with MIN_LENGTH', async () => {
        // arrange
        const value = "a".repeat(MIN_LENGTH);

        // act
        const name = new GeniallyName(value);

        // assert
        expect(name.value).toMatch(value);
    });

    test('should create valid object with MAX_LENGTH', async () => {
        // arrange
        const value = "a".repeat(MAX_LENGTH);

        // act
        const name = new GeniallyName(value);

        // assert
        expect(name.value).toMatch(value);
    });

    test('should throw error if no value passed', async () => {
        helper.assertInvalidGeniallyName();
    });

    test('should throw error if value length < MIN_LENGTH', async () => {
        helper.assertInvalidGeniallyName("a".repeat(MIN_LENGTH - 1));
    });

    test('should throw error if value length > MAX_LENGTH', async () => {
        helper.assertInvalidGeniallyName("a".repeat(MAX_LENGTH + 1));
    });
});