export namespace urls {
    export const USER_LOGIN: string = '/user/login';
    export const USER_CURRENT: string = '/user/current';
    export const USER_BY_NAME: string = '/user/{name}';
    export const SAVED_SEARCHES: string = '/user/search';
    export const TAGS: string = '/user/tag';
    export const ISSUE: string = '/issue/{issue}';
    export const ISSUE_HISTORY: string = '/issue/{issue}/history';
    export const ISSUE_CHANGES: string = '/issue/{issue}/changes';
    export const ISSUE_EXISTS: string = '/issue/{issue}/exists';
    export const ISSUES: string = '/issue';
    export const PROJECTS: string = '/project/all';
    export const PROJECT: string = '/admin/project/{projectId}';
    export const WORK_ITEMS: string = '/issue/{issueId}/timetracking/workitem';
    export const WORK_ITEM: string = '/issue/{issueId}/timetracking/workitem/{workItemId}';
}
