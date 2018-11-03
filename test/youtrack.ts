import * as assert from 'assert';
import {Youtrack} from "../src";
import sinon = require('sinon');
import {urls} from "../src/config/urls";

describe("Youtrack", () => {

    const testOptions = {baseUrl: "", login: "test", password: "test"};

    it("can be instantiated without error", () => {
        assert.doesNotThrow(() => {
            new Youtrack(testOptions);
        });
    });

    it("instantiates user endpoint", () => {
        const youtrack = new Youtrack(testOptions);
        assert(youtrack.users !== null);
    });

    it("instantiates tags endpoint", () => {
        const youtrack = new Youtrack(testOptions);
        assert(youtrack.tags !== null);
    });

    it("instantiates searches endpoint", () => {
        const youtrack = new Youtrack(testOptions);
        assert(youtrack.searches !== null);
    });

    describe('login', () => {
        it('performs post request', () => {
            const youtrack = new Youtrack(testOptions);
            const stub = sinon.stub(youtrack, "post").returns(Promise.resolve({}));
            youtrack.login();
            assert(stub.calledOnce);
            assert(stub.calledWithExactly(urls.USER_LOGIN, {
                form: {
                    login: "test",
                    password: "test"
                }
            }));
        });
    });
});
