import * as assert from "assert";
import {generateFields} from "../../../src/entities/fields/utils";


const example = {
    p1: '',
    p2: 1,
    p3: {
        p31: "",
        p32: {
            p321: ""
        }
    },
    p4: [{p41: ""}],
    p5: [],
    p6: {}
};

describe("generateFields", () => {
    it("can be instantiated without error", () => {
        assert.deepStrictEqual(generateFields(example), ['p1', 'p2', 'p3(p31,p32(p321))', 'p4(p41)', 'p5', 'p6()']);
    });
});
