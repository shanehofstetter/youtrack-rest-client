# youtrack-rest-client
Client library for accessing the youtrack rest api

[![Build Status](https://travis-ci.com/shanehofstetter/youtrack-rest-client.svg?branch=master)](https://travis-ci.com/shanehofstetter/youtrack-rest-client)
![npm](https://img.shields.io/npm/v/youtrack-rest-client.svg)
![NpmLicense](https://img.shields.io/npm/l/youtrack-rest-client.svg)


## Install
```
npm install youtrack-rest-client
```

## Usage

```typescript
import {Youtrack} from "youtrack-rest-client";

const config = {baseUrl: "http://example.myjetbrains.com", login: "login", password: "password"};

const youtrack = new Youtrack(config);

youtrack.login().then(() => {

    // get the current user
    youtrack.users.current().then((currentUser) => {
        console.log({currentUser});
    });

    // get a user by his/her login name
    youtrack.users.byName('test').then((user) => {
        console.log({user});
    });

    // get all saved searches
    youtrack.searches.saved().then((savedSearches) => {
        console.log({savedSearches});
    });

    // get all tags
    youtrack.tags.all().then((tags) => {
        console.dir(tags);
    });
    
    // get all projects
    youtrack.projects.all().then((projects) => {
        console.dir(projects);
    });

    // get an issue by its id
    youtrack.issues.byId('T1-2').then((issue) => {
        console.dir(issue);
    });

    // search issues with a filter query
    youtrack.issues.search('#Unresolved').then((issues) => {
        console.dir(issues);
    });

    // search issues with a filter query and additional filter options (available are: max, with, after)
    youtrack.issues.search('#Bug', {max: 1}).then((issues) => {
        console.dir(issues);
    });
    
    // filter issues by project
    youtrack.issues.search('project: MP').then((issues) => {
        console.dir(issues);
    });

    // delete issue with given id
    youtrack.issues.delete('T1-3').then(() => {
        console.log('deleted issue T1-3');
    });
    
    // create a new issue
    youtrack.issues.create({
        project: 'MP',
        summary: "Crashes in IE 7",
        description: "some users reported that the app crashes in their favorite browser."
    }).then((issueId) => {
        console.log({issueId});
    });
});

```