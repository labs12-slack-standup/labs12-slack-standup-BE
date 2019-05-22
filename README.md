# **SLACK STANDUP API**

Back-end Labs Project

# **Maintainers**

[@AAsriyan](https://github.com/AAsriyan)
[@erin-koen](https://github.com/erin-koen)
[@mikaelacurrier](https://github.com/mikaelacurrier)
[@shaunmcarmody](https://github.com/shaunmcarmody)

# **Deployed Backend**

- https://master-slack-standup.herokuapp.com/

# **Technologies**

#### Production

- [Express](https://www.npmjs.com/package/express): `Fast, unopinionated, minimalist web framework for Node.js.`
- [Body parser](https://www.npmjs.com/package/body-parser): `Parse incoming request bodies in a middleware before your handlers.`
- [Bcryptjs](https://www.npmjs.com/package/body-parser): `Allows you to store passwords securely in your database.`
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): `Generate and verify json web tokens to maintain a stateless api.`
- [Knex](https://www.npmjs.com/package/knex): `Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.`
- [Knex-cleaner](https://www.npmjs.com/package/knex-cleaner): `Helper library to clean a PostgreSQL, MySQL or SQLite3 database tables using Knex.`
- [Pg](https://www.npmjs.com/package/pg): `Non-blocking PostgreSQL client for Node.js.`
- [Sentry](https://www.npmjs.com/package/@sentry/node): `Open-source error tracking that helps developers monitor and fix crashes in real time. Iterate continuously. Boost workflow efficiency. Improve user experience.`
- [Morgan](https://www.npmjs.com/package/morgan): `HTTP request logger middleware for Node.js.`
- [Cors](https://www.npmjs.com/package/cors): `CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS.`
- [Helmet](https://www.npmjs.com/package/helmet): `Helmet helps you secure your Express apps by setting various HTTP headers.`
- [Dotenv](https://www.npmjs.com/package/dotenv): `Dotenv is a zero-dependency module that loads environment variables from a .env file.`
- [SendGrid](https://sendgrid.com/solutions/email-api/): `SendGrid's API proves a customizable integration approach for transactional email.`

#### Development

- [Nodemon](https://www.npmjs.com/package/nodemon): `nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected`

# **Setup**

(# <--- signifies comment)

In your terminal run:

```
# Install dependencies
yarn install

# Starts express server using nodemon
yarn server
```

# **Table of Contents**

- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [Database Table Schema](#database-table-schema)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Helpers](#helpers)




# SUMMARY TABLE OF API ENDPOINTS

>Aside from `auth/firebase` all requests must be made with a header that includes the JWT returned from the POST request. The header serves several purposes, among them authentication and request specificity (many requests read the user's ID from decoded token). Additionally, requests made to routes protected by the admin validation middleware must include a token from a user whose role is `admin`. Request headers must be formatted as such:

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | 'application/JSON'       |
| `Authorization` | String | Yes      | JSON Web Token           |

<br>

#### Authorization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST | `/auth/firebase` | all users         | Creates a new entry on Users' table or checks Firebase credentials against an existing entry. Returns a valid token on success.|
| GET | `/auth/slack/` | authenticated users | Accesses a user's Slack account information and updates their record in the Users' table with a current Slack Access token, user ID, and team ID. Returns a JWT reflecting those changes.|

#### Email Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/email` | authenticated users      | Takes an object of email addresses, creates a `msg` object, and calls a Sendgrid method on it. |

#### User Routes
| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/users` | authenticated users      | Returns all users. |
| GET    | `/users/byuser` | authenticated users      | Decodes User ID from Auth token in header and returns that user record.|
| GET    | `/users/team` | authenticated users      | Decodes Team ID from Auth token in header and returns the user records associated with that team ID.|
| GET    | `/joinCode/:joinCode` | authenticated users      | Finds the team ID associated with the join code passed in request parameters and updates the team ID field on the user record associated with the user ID decoded from the Auth token in header. |
| PUT    | `/users` | authenticated users      | Decodes User ID from Auth token in header and updates the User record associated with that ID with the object contained in the request body. |
| PUT    | `/users/:userId` | admin-authenticated users      | Allows for admin users to edit the records of a given user specified by the request parameters by passing a partial or whole user object in the request body. |

#### Report Routes
| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/reports` | authenticated users      | Decodes Auth token in header, returns an object of reports associated with teamId of user requesting.|
| GET    | `/reports/:reportID` | authenticated users      | Returns the report specified in req params, as long as it's associated with the teamId in decoded Auth token in req headers.|
| POST    | `/reports` | admin-authenticated users      | Decodes Auth token in header, creates an entry in the Reports table, returns an object of reports associated with teamId of user requesting.|
| DELETE    | `/reports/:id` | admin-authenticated users      | Deletes a report specified by reportId in req params|
| PUT    | `reports/:reportId` | admin-authenticated users      | Takes report ID off req params, updates corresponding Report record with req body. Returns an object full of reports by team ID of user requesting.|

#### Response Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/responses` | authenticated users      | Returns a User's responses if they've completed a report today. |
| POST    | `/responses/:reportId/filter` | authenticated users      | Returns responses for a given report (in params) on a given date for a given user (passed in request body) |
| GET    | `/responses/:reportId` | authenticated users      | Returns all responses from the last 7 days for a given report specified in the request parameters. |
| POST    | `/responses/:reportId` | authenticated users      | Decodes the user ID from the token in the request header, inserts the responses passed in the request body with the report ID token inserted as a FK. |

#### Slack Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/slack/channels` | authenticated users who have integrated slack     | Returns an object with all channels in which that user is currently active . |
| POST    | `/slack/sendReport` | authenticated users who have integrated slack     | Set in Slack API dashboard. Performs various database functions based on the type of request that comes in from Slack. |

<br>
<br>
<br>
<br>

# Database Table Schema

#### USERS

```
{
    id: INTEGER
    teamId: INTEGER
    email: STRING (notNullable, unique)
    password: STRING
    fullName: STRING
    roles: STRING (notNullable)
    profilePic: STRING
    created_at: DATETIME (precision: 2, notNullable)
    timezone: STRING (notNullable)
    joinCode: STRING
    active: BOOLEAN (default to true, notNullable)
    slackToken: TEXT (unique)
    slackUserId: STRING
    slackTeamId: STRING
}
```

#### REPORTS

```
{
    id: INTEGER
    teamID: INTEGER (foreign key in USERS table)
    reportName: STRING (notNullable)   
    created_at: DATETIME (precision: 2, notNullable)
    schedule: TEXT
    scheduleTime: TIME (precision: 2)
    recurring: STRING
    message: TEXT
    responseTimeLimit: DATETIME (precision: 2)
    questions: TEXT
    slackChannelName: STRING
    slackChannelId: STRING
    nextPublishDate: DATETIME (precision: 2)
    active: BOOLEAN (default to true, notNullable)
}
```

#### RESPONSES

```
{
    id: INTEGER
    reportID: INTEGER (unsigned, notNullable, references foreign key in REPORTS table)
    userID: INTEGER (unsigned, notNullable, references foreign key in USERS table)
    question: TEXT (notNullable)
    answer: TEXT 
    submitted_date: DATETIME (precision: 2, notNullable)
}
```
<br>
<br>
<br>
<br>

# Database Models

#### USERS

`add(user)` -> Inserts the provided new User object, returns that object
<br>`find()` -> Returns an array of all User objects
<br>`findBy(filter)` -> Returns an array of all User objects where `filter`
<br>`findByRole(role)` -> Returns an array of all User objects with a given role 
<br>`findByJoinCode(joinCode)` -> Returns the team ID for the User record associated with the provided joinCode
<br>`findById(userId)` -> Returns the User associated with the provided user ID
<br>`findBySlackId(slackId)` -> Returns the User associated with the provided Slack ID
<br>`findByTeam(teamId)` -> Returns an array of all Users associated with the provided team ID
<br>`findByEmail(email)` -> Returns the User associated with the provided email
<br>`update(userId, user)` -> Edits the User record associated with the provided User ID with the information contained in the provided User object
<br>`updateTeamId(userId, teamId)` -> Updates the teamId field on the User record associated with the provided User ID with the provided teamId
<br>`remove(userId)` -> Removes the User record associated with the provided userId
<br>

#### REPORTS

`add(report)` -> Inserts the provided Report object, returns that object
<br>
`find()` -> Retuns an array of all Report objects
<br>
`findBy(filter)` -> Returns an array of all Report objects where `filter`
<br>
`findById(reportId)` -> Returns the Report object associated with the provided report ID
<br>
`findByTeam(teamId)` -> Returns an array of Report objects associated with the provided team ID
<br>
`findByUserId(userId)` -> Returns an array of all report 
<br>
`findByIdAndTeamId(reportId, teamId)` -> Returns the Report record associated with the provided report ID and team ID
<br>
`update(id, teamId, report)` -> Updates the Report record associated with the provided report ID and team ID with the new information contained in the provided Report object
<br>
`remove(reportId)` -> Deletes the Report record associated with the provided report ID
<br>

#### RESPONSES

`add(response)` -> Inserts the provided Response object, returns that object
<br>
`find()` -> Returns an array of all Response objects
<br>
`findBy(filter)` -> Returns an array of all Response objects where `filter`
<br>
`findById(responseId)` -> Returns the Response object associated with the provided response ID
<br>
`findByAndJoin(reportId, startDay, endDay)` -> Returns an array of objects associated with a provided report ID between two provided dates. Object keys are userId', 'users.fullName', 'users.profilePic', 'responses.id', 'responses.question', 'responses.answer', 'responses.submitted_date'. They are chronologically ordered from newest to oldest based on responses.submitted_date 
<br>
`findByUserAndJoin(reportId, userId, startDay, endDay)` -> Returns an array of objects associated with a provided report ID AND a provided user ID between two provided dates. Object keys are userId', 'users.fullName', 'users.profilePic', 'responses.id', 'responses.question', 'responses.answer', 'responses.submitted_date'. They are chronologically ordered from newest to oldest based on responses.submitted_date 
<br>
`findTodays(userId, reportId, startDay, endDay)` -> Returns an array of all Response objects associated with the user ID and the report ID between the startDay and the endDay
<br>
<br>
<br>
<br>

# Helpers

<br>
<br>
<br>
<br>

# Middleware