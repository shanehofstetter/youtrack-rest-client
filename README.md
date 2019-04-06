# youtrack-rest-client
Client library for accessing the [youtrack rest api](https://www.jetbrains.com/help/youtrack/standalone/youtrack-rest-api-reference.html)

[![Build Status](https://travis-ci.com/shanehofstetter/youtrack-rest-client.svg?branch=master)](https://travis-ci.com/shanehofstetter/youtrack-rest-client)
![npm](https://img.shields.io/npm/v/youtrack-rest-client.svg)
![NpmLicense](https://img.shields.io/npm/l/youtrack-rest-client.svg)


## Install
```
npm install youtrack-rest-client
```
```
yarn add youtrack-rest-client
```


## Usage

### Authentication

**With your permanent token (see [Manage-Permanent-Token](https://www.jetbrains.com/help/youtrack/incloud/Manage-Permanent-Token.html)):**
```typescript
import {Youtrack} from "youtrack-rest-client";

const config = {
    baseUrl: "http://example.myjetbrains.com", 
    token: "perm:your-token"
};
const youtrack = new Youtrack(config);
```

**With username/password**  
The new REST API does not support logging in with username/password anymore, if you require this you need to use the old REST API ([youtrack-rest-client version 0.3.x](https://github.com/shanehofstetter/youtrack-rest-client/releases/tag/v0.3.2)).

### User

```typescript

// get the current user
youtrack.users.current().then((user: User) => {
    console.log({user});
});

// get all users
youtrack.users.all().then((users: ReducedUser[]) => {
    console.log({users});
});

// get a user by id
youtrack.users.byId('1-1').then((user: User) => {
    console.log({user});
});

```


### Projects
```typescript

// get all projects
youtrack.projects.all().then((projects: ReducedProject[]) => {
    console.dir(projects);
});

// get a project by its id
youtrack.projects.byId('0-0').then((project: Project) => {
    console.dir(project);
});

```

### Issues

```typescript
// search/list issues
youtrack.issues.search('project: T1').then((issues: ReducedIssue[]) => {
    console.log({issues});
});
```

```typescript
// get issue by id
youtrack.issues.byId('T1-2').then((issue: Issue) => {
    console.log({issue});
});
```

```typescript
// delete an issue
youtrack.issues.delete('2-2').then(() => {
    console.log('issue deleted');
});
```

```typescript
// create a new issue
youtrack.issues.create({
    summary: 'lorem ipsum',
    description: 'created using rest api',
    project: {
        id: '0-0'
    }
}).then(issue => {
    console.log({issue});
});
```

```typescript
// update an issue
youtrack.issues.update({
    id: 'T1-2',
    summary: "updated summary"
}).then(issue => {
    console.log({issue});
});
```

### Commands

```typescript
// execute command for issue(s) (internal id is used)
youtrack.issues.executeCommand({
    query: 'for me',
    issues: [
        {
            id: '2-6'
        }
    ]
}).then(response => {
    console.log({response});
});
```

```typescript
// execute command for issue(s) and add a comment
youtrack.issues.executeCommand({
    query: 'for me',
    comment: 'gonna solve this real quick',
    issues: [
        {
            id: '2-6'
        }
    ]
}).then(response => {
    console.log({response});
});
```

### WorkItems (Time-Tracking)

```typescript
// get the configured workitem types for the project
youtrack.projects.getWorkItemTypes('0-0').then((workItemTypes: WorkItemType[]) => {
    console.log({workItemTypes});
});
```

```typescript
// list the workitems of a project
youtrack.workItems.all('T1-2').then((workItems: WorkItem[]) => {
    console.log({workItems});
});
```

```typescript
// add new workitem to project
youtrack.workItems.create('T1-2', {
    duration: {
        presentation: '30m'
    },
    text: 'fixed bug',
    type: {
        name: 'Development',
        id: '77-0'
    }
}).then(workItem => {
    console.log({workItem});
});
```

```typescript
// update workitem
youtrack.workItems.update('T1-2', {
    id: '116-3',
    duration: {
        presentation: '45m'
    }
}).then(workItem => {
    console.log({workItem});
});
```

```typescript
// delete work item
youtrack.workItems.delete('T1-2', '116-3').then(() => {
    console.log('workitem deleted.');
});
```

### Issue Comments

```typescript
// list comments of an issue
youtrack.comments.all('T1-2').then((comments: IssueComment[]) => {
    console.log({comments});
});
```

```typescript
// add comment to issue
youtrack.comments.create('T1-2', {
    text: 'issue comment'
}).then(comment => {
    console.log({comment});
});
```

```typescript
// update comment
youtrack.comments.update('T1-2', {
    id: '4-1',
    text: 'updated issue comment'
}).then(comment => {
    console.log({comment});
});
```

```typescript
// delete a comment
youtrack.comments.delete('T1-2', '4-1').then(() => {
    console.log('comment deleted.');
});
```

### Tags
```typescript

// get all tags
youtrack.tags.all().then((tags: IssueTag[]) => {
    console.log({tags});
});

// get tags available for user
youtrack.tags.allForUser('1-1').then((tags: IssueTag[]) => {
    console.log({tags});
});

// get tag by id
youtrack.tags.byId('6-0').then((tag: IssueTag) => {
    console.log({tag});
});

youtrack.tags.byIdForUser('1-1', '6-0').then((tag: IssueTag) => {
    console.log({tag});
});
```
