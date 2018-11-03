import * as assert from 'assert';
import {Youtrack} from "../src";
import sinon = require('sinon');
import {urls} from "../src/config/urls";
import * as request from "request-promise";

describe("Youtrack", () => {

    const configWithCredentials = {baseUrl: "", login: "test", password: "test"};
    const configWithToken = {baseUrl: "", token: "testtoken"};

    it("can be instantiated without error", () => {
        assert.doesNotThrow(() => {
            new Youtrack(configWithCredentials);
        });
    });

    it("instantiates user endpoint", () => {
        const youtrack = new Youtrack(configWithCredentials);
        assert(youtrack.users !== null);
    });

    it("instantiates tags endpoint", () => {
        const youtrack = new Youtrack(configWithCredentials);
        assert(youtrack.tags !== null);
    });

    it("instantiates searches endpoint", () => {
        const youtrack = new Youtrack(configWithCredentials);
        assert(youtrack.searches !== null);
    });

    it("instantiates workItems endpoint", () => {
        const youtrack = new Youtrack(configWithCredentials);
        assert(youtrack.workItems !== null);
    });

    describe('login', () => {

        describe('with credentials', () => {
            it('performs post request', () => {
                const youtrack = new Youtrack(configWithCredentials);
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

        describe('with token', () => {
            it('does not perform post request when calling login', () => {
                const youtrack = new Youtrack(configWithToken);
                const stub = sinon.stub(youtrack, "post").returns(Promise.resolve({}));
                youtrack.login();
                assert(stub.notCalled);
            });

            it('does put bearer token into header', () => {
                const youtrack = new Youtrack(configWithToken);
                let mockRequest = sinon.mock(request);
                let expectation = mockRequest.expects("get").returns(Promise.resolve(null));
                youtrack.projects.all();
                assert(expectation.calledOnce);

                const args = expectation.args[0];
                assert(args[0] === '/rest/project/all');
                assert.deepStrictEqual(args[1], {
                    jar: true,
                    json: true,
                    headers: {
                        Authorization: 'Bearer testtoken'
                    },
                    qs: {verbose: 'true'}
                });
            });

            describe('when providing custom header parameters', () => {
                it('merges headers', () => {
                    const youtrack = new Youtrack(configWithToken);
                    let mockRequest = sinon.mock(request);
                    let expectation = mockRequest.expects("post").returns(Promise.resolve(null));
                    youtrack.post("/some/resource", {body: "<example>test</example>"}, {'Content-Type': 'application/xml'});
                    assert(expectation.calledOnce);

                    const args = expectation.args[0];
                    assert(args[0] === '/rest/some/resource');
                    assert.deepStrictEqual(args[1], {
                        jar: true,
                        json: true,
                        headers: {
                            Authorization: 'Bearer testtoken',
                            'Content-Type': 'application/xml'
                        },
                        body: "<example>test</example>"
                    });
                });
            });
        });
    });
});
