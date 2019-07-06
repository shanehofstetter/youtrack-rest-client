![logo](https://user-images.githubusercontent.com/13404717/59300590-da2b6600-8c8f-11e9-82b2-ab3dc856ffdb.jpeg)

# youtrack-rest-client
Client library for accessing the [youtrack rest api](https://www.jetbrains.com/help/youtrack/standalone/youtrack-rest-api-reference.html)

[![Build Status](https://travis-ci.com/shanehofstetter/youtrack-rest-client.svg?branch=master)](https://travis-ci.com/shanehofstetter/youtrack-rest-client)
[![Maintainability](https://api.codeclimate.com/v1/badges/52753e2150c5097069ac/maintainability)](https://codeclimate.com/github/shanehofstetter/youtrack-rest-client/maintainability)
[![npm](https://img.shields.io/npm/v/youtrack-rest-client.svg)](https://www.npmjs.com/package/youtrack-rest-client)
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

### [Users](https://www.jetbrains.com/help/youtrack/incloud/api-entity-User.html)

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


### [Projects](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Project.html)
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

### [Issues](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Issue.html)

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

### [Commands](https://www.jetbrains.com/help/youtrack/incloud/api-entity-CommandList.html)

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

### [WorkItems (Time-Tracking)](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueWorkItem.html)

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

### [Issue Comments](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueComment.html)

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

### [Issue Tags](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueTag.html)
```typescript

// get all tags
youtrack.tags.all().then((tags: IssueTag[]) => {
    console.log({tags});
});

// get tag by id
youtrack.tags.byId('6-0').then((tag: IssueTag) => {
    console.log({tag});
});
```

### [Issue Links](https://www.jetbrains.com/help/youtrack/incloud/api-entity-IssueLink.html)
```typescript

// get issue links of issue
youtrack.issues.byId('P1-1').then((issue: Issue) => {
    console.log({links: issue.links});
});

// update issue link(s)
youtrack.issues.update({
    id: 'P1-1',
    links: [
            {
                issues: [
                    {
                        id: '2-3'
                    }
                ],
                id: '92-1s',
            }
        ]
}).then((issue: Issue) => {
    console.log({links: issue.links});
});
```

### [Agiles](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Agile.html)
```typescript

// get all agile boards
youtrack.agiles.all().then((agiles: ReducedAgile[]) => {
    console.log({agiles});
});

// get specific agile board by id
youtrack.agiles.byId('104-0').then((agile: Agile) => {
    console.log({agile});
});

// create new agile board
youtrack.agiles.create({
    name: '19-15',
    projects: [{ id: '0-0' }]
}).then((agile: Agile) => {
    console.log({agile});
});

// delete an agile board 
youtrack.agiles.delete('104-1').then(() => {
    console.log('agile deleted.');
});

// update an agile board
youtrack.agiles.update({ id: '104-0', projects: [{ id: '0-0' }] }).then((agile: Agile) => {
    console.log({agile});
});
```

### [Sprints](https://www.jetbrains.com/help/youtrack/incloud/api-entity-Sprint.html)

```typescript

const agileId = '104-0';

// get all sprints of an agile board
youtrack.sprints.all(agileId).then((sprints: ReducedSprint[]) => {
    console.log({sprints});
});

// get agile sprint by id
youtrack.sprints.byId(agileId, '105-0').then((sprint: Sprint) => {
    console.log({sprint});
});

// create new sprint
youtrack.sprints.create(agileId, { name: 'my sprint' }).then((sprint: Sprint) => {
    console.log({sprint});
});

// update a sprint
youtrack.sprints.update(agileId, { id: '105-3', name: 'my sprint 3' }).then((sprint: Sprint) => {
    console.log({sprint});
});

// delete a sprint
youtrack.sprints.delete(agileId, '105-2').then(() => {
    console.log('sprint deleted.');
});

```

## Contributing

If you encounter any missing features or bugs, you're welcome to open an Issue! PRs are welcome too ;-)

1. Fork it ( https://github.com/shanehofstetter/youtrack-rest-client/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request
