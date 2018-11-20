import * as assert from 'assert';
import {Youtrack} from "../src";
import sinon = require('sinon');
import * as request from "request-promise";
import {projectFields} from "../src/entities/fields/fields";

describe("Youtrack", () => {

    const configWithToken = {baseUrl: "", token: "testtoken"};

    it("can be instantiated without error", () => {
        assert.doesNotThrow(() => {
            new Youtrack(configWithToken);
        });
    });

    it("instantiates user endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.users !== null);
    });

    it("instantiates tags endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.tags !== null);
    });

    it("instantiates searches endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.searches !== null);
    });

    it("instantiates workItems endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.workItems !== null);
    });

    describe('login', () => {

        describe('with token', () => {

            it('does put bearer token into header', () => {
                const youtrack = new Youtrack(configWithToken);
                let mockRequest = sinon.mock(request);
                let expectation = mockRequest.expects("get").returns(Promise.resolve(null));
                youtrack.projects.all();
                assert(expectation.calledOnce);

                const args = expectation.args[0];
                assert(args[0] === '/api/admin/projects');
                assert.deepStrictEqual(args[1], {
                    jar: true,
                    json: true,
                    headers: {
                        Authorization: 'Bearer testtoken'
                    },
                    qs: {fields: projectFields.join(',')}
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
                    assert(args[0] === '/api/some/resource');
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
