# youtrack-rest-client
Client library for accessing the youtrack rest api


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

    youtrack.users.current().then((currentUser) => {
        console.log({currentUser});
    });

    youtrack.users.byName('test').then((user) => {
        console.log({user});
    });

    youtrack.searches.saved().then((savedSearches) => {
        console.log({savedSearches});
    });

    youtrack.tags.all().then((tags) => {
        console.log({tags});
    });
});

```