import * as assert from 'assert';
import {
    AgilePaths,
    CommentPaths,
    IssueCommentImpl, IssueImpl,
    IssuePaths,
    IssueTagImpl,
    ProjectPaths,
    ReducedAgileImpl,
    ReducedIssueImpl,
    ReducedProjectImpl,
    ReducedSprintImpl,
    ReducedUserImpl,
    SprintPaths,
    TagPaths,
    UserPaths,
    WorkItemImpl,
    WorkItemPaths,
    Youtrack
} from "../src";
import {axiosInstance} from "../src/axios";
import MockAdapter from "axios-mock-adapter";
import {generateFieldsQuery} from "../src/entities/fields/utils";
import format = require("string-template");

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

    describe('index endpoints', () => {
        it('adds query param for fields', () => {
            const youtrack = new Youtrack(configWithToken);
            let mock = new MockAdapter(axiosInstance);
            const indexActions = [
                {
                    path: ProjectPaths.projects,
                    action: () => youtrack.projects.all(),
                    params: {fields: generateFieldsQuery(new ReducedProjectImpl())}
                },
                {
                    path: AgilePaths.agiles,
                    action: () => youtrack.agiles.all(),
                    params: {fields: generateFieldsQuery(new ReducedAgileImpl())}
                },
                {
                    path: IssuePaths.issues,
                    action: () => youtrack.issues.search("test"),
                    params: {fields: generateFieldsQuery(new ReducedIssueImpl()), query: 'test'}
                },
                {
                    path: format(SprintPaths.sprints, {agileId: 'test'}),
                    action: () => youtrack.sprints.all("test"),
                    params: {fields: generateFieldsQuery(new ReducedSprintImpl())}
                },
                {
                    path: TagPaths.issueTags,
                    action: () => youtrack.tags.all(),
                    params: {fields: generateFieldsQuery(new IssueTagImpl())}
                },
                {
                    path: UserPaths.users,
                    action: () => youtrack.users.all(),
                    params: {fields: generateFieldsQuery(new ReducedUserImpl())}
                },
                {
                    path: format(CommentPaths.comments, {issueId: 'test'}),
                    action: () => youtrack.comments.all("test"),
                    params: {fields: generateFieldsQuery(new IssueCommentImpl())}
                },
                {
                    path: format(WorkItemPaths.workitems, {issueId: 'test'}),
                    action: () => youtrack.workItems.all("test"),
                    params: {fields: generateFieldsQuery(new WorkItemImpl())}
                },
            ]
            indexActions.forEach(({path, action, params}) => {
                mock.onGet(path).reply(200, [{id: 1, name: 'test'}]);
                action().then((data) => {
                    assert.deepStrictEqual(data, [{id: 1, name: 'test'}]);
                });
                assert.deepStrictEqual({...mock.history.get[0].params}, params);
                mock.reset();
            });
        })
    });

    describe('create issue', () => {
        it('sends payload in body and fields as query param', () => {
            const youtrack = new Youtrack(configWithToken);
            let mock = new MockAdapter(axiosInstance);
            mock.onPost(IssuePaths.issues).reply(200, {id: 1});
            const payload = {
                summary: 'lorem ipsum',
                description: 'created using rest api',
                project: {
                    id: '0-0'
                }
            }
            youtrack.issues.create(payload).then(response => {
                assert.deepStrictEqual(response, {id: 1});
            })
            assert.strictEqual(mock.history.post.length, 1);
            assert.deepStrictEqual({...mock.history.post[0].headers}, {
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Bearer testtoken'
            });
            assert.strictEqual(mock.history.post[0].data, JSON.stringify(payload));
            assert.deepStrictEqual({...mock.history.post[0].params}, {fields: generateFieldsQuery(new IssueImpl())});
        });
    })
});
