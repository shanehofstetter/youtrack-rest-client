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

const config = {baseUrl: "http://example.myjetbrains.com", token: "perm:your-token"};
const youtrack = new Youtrack(config);
```

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

### Projects
```typescript

// get all projects
youtrack.projects.all().then((projects) => {
    console.dir(projects);
});

// get a project by its id
youtrack.projects.byId('0-0').then((project) => {
    console.dir(project);
});

```

### Issues

```typescript
// search/list issues
youtrack.issues.search('project: T1').then(issues => {
    console.log({issues});
});
```

```typescript
// get issue by id
youtrack.issues.byId('T1-2').then(issue => {
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

**TODO**:
- [ ] execute commands on issues (https://www.jetbrains.com/help/youtrack/standalone/api-commands.html)

### WorkItems (Time-Tracking)

**TODO**:
- [ ] list workitems of an issue
- [ ] get workitem by id
- [ ] edit workitem 
- [ ] create workitem
- [ ] delete workitem

### Issue Comments

**TODO**:
- [ ] list comments of issue
- [ ] get comment by id
- [ ] edit comment 
- [ ] create comment
- [ ] delete comment