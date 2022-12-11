import * as assert from 'assert';
import {Youtrack} from "../src";
import {axiosInstance} from "../src/axios";
import MockAdapter from "axios-mock-adapter";

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

    it("instantiates workItems endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.workItems !== null);
    });

    describe('login', () => {

        describe('with token', () => {

            it('does put bearer token into header', () => {
                const youtrack = new Youtrack(configWithToken);
                let mock = new MockAdapter(axiosInstance);
                mock.onGet('/api/admin/projects').reply(200, [{id: 1, name: 'test'}]);
                youtrack.projects.all().then((projects) => {
                    assert.deepStrictEqual(projects, [{id: 1, name: 'test'}]);
                });
                assert.strictEqual(mock.history.get.length, 1);
                assert.deepStrictEqual({...mock.history.get[0].headers}, {
                    Accept: 'application/json, text/plain, */*',
                    Authorization: 'Bearer testtoken'
                });
                assert.deepStrictEqual({...mock.history.get[0].params}, {fields: 'id,name,shortName,description,archived'})
            });

            describe('when providing custom header parameters', () => {
                it('merges headers', () => {
                    const youtrack = new Youtrack(configWithToken);
                    let mock = new MockAdapter(axiosInstance);
                    mock.onPost('/some/resource').reply(200, {});
                    youtrack.post("/some/resource", {data: "<example>test</example>"}, {'Content-Type': 'application/xml'});
                    assert.strictEqual(mock.history.post.length, 1);
                    assert.deepStrictEqual({...mock.history.post[0].headers}, {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/xml',
                        Authorization: 'Bearer testtoken'
                    });
                    assert.strictEqual(mock.history.post[0].data, "<example>test</example>")
                });
            });
        });
    });
});
