# **SLACK STANDUP API**

Back-end Labs Project

# **Maintainers**

[@AAsriyan](https://github.com/AAsriyan)
[@erin-koen](https://github.com/erin-koen)
[@mikaelacurrier](https://github.com/mikaelacurrier)
[@Mindysueasaurus](https://github.com/Mindysueasaurus)
[@shaunmcarmody](https://github.com/shaunmcarmody)

# **Deployed Backend**

- https://master-slack-standup.herokuapp.com/

# **Technologies**

#### Production

- [Express](https://www.npmjs.com/package/express): `Fast, unopinionated, minimalist web framework for Node.js`
- [Body parser](https://www.npmjs.com/package/body-parser): `Parse incoming request bodies in a middleware before your handlers`
- [Bcryptjs](https://www.npmjs.com/package/body-parser): `Allows you to store passwords securely in your database`
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): `Generate and verify json web tokens to maintain a stateless api`
- [Knex](https://www.npmjs.com/package/knex): `Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use`
- [Knex-cleaner](https://www.npmjs.com/package/knex-cleaner): `Helper library to clean a PostgreSQL, MySQL or SQLite3 database tables using Knex`
- [Pg](https://www.npmjs.com/package/pg): `Non-blocking PostgreSQL client for Node.js.`
- [Sentry](https://www.npmjs.com/package/@sentry/node): `Open-source error tracking that helps developers monitor and fix crashes in real time. Iterate continuously. Boost workflow efficiency. Improve user experience.`
- [Morgan](https://www.npmjs.com/package/morgan): `HTTP request logger middleware for Node.js`
- [Cors](https://www.npmjs.com/package/cors): `CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS`
- [Helmet](https://www.npmjs.com/package/helmet): `Helmet helps you secure your Express apps by setting various HTTP headers`
- [Dotenv](https://www.npmjs.com/package/dotenv): `Dotenv is a zero-dependency module that loads environment variables from a .env file`

#### Developer

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
- [Auth Routes](#auth-routes)
     - [Login User](#login)
     - [Register User](#register)
- [User Routes](#user-routes)
     - [Get Users](#get-users)
          - [Get User By Id](#get-user-by-id)
          - [Get Users By TeamId](#get-users-by-teamid)
     - [Delete Users](#delete-users)
          - [Delete User By Id](#delete-user-by-id)
     - [Edit Users](#edit-users)     
          - [Edit User By Id](#edit-user-by-id)     
- [Report Routes](#report-routes)
     - [Get Reports](#get-reports)
          - [Get All Reports](#get-all-reports)
          - [Get Report By TeamId](#get-reports-by-teamid)
- [Reponse Routes](#response-routes)
     - [Get Responses](#get-responses)
          - [Get All Responses](#get-all-responses)

# AUTH ROUTES

## **REGISTER**

## **LOGIN**

# USER ROUTES

## **GET USERS**

### **_GET ALL USERS_**

_Method Url:_ `/api/users`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the user is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The users were found in the database.",
    "users": [
        {
            "id": 1,
            "teamId": 1,
            "email": "Gustave43@gmail.com",
            "password": "$2a$04$1xD8TgEpVei41MJvV66B5uIDQWXNpJO45HjGtU8C9tDFaXhzuNy3K",
            "fullName": "Natalia MacGyver",
            "roles": "admin",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        },
        {
            "id": 2,
            "teamId": 1,
            "email": "Cayla76@gmail.com",
            "password": "$2a$04$4V4R/AmRur/cfRYIQUiOA.Wcma14ThcLNAA0uxlo.VYZU/kEvXaoK",
            "fullName": "Willa Luettgen",
            "roles": "member",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        },
        {
            "id": 3,
            "teamId": 1,
            "email": "Francis.Ernser@gmail.com",
            "password": "$2a$04$UPCR6e1TZnOaRXF69DfN/.AOtludDmJrLnQgrnxIfKfhXb24Btt6u",
            "fullName": "Everett Spinka",
            "roles": "member",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        }
    ]
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry but something went wrong while retrieving the list of users"
}
```

### **_Get User By Id_**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the user is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The user was retrieved successfully",
    "user": {
        "id": 1,
        "teamId": 1,
        "email": "Gustave43@gmail.com",
        "password": "$2a$04$1xD8TgEpVei41MJvV66B5uIDQWXNpJO45HjGtU8C9tDFaXhzuNy3K",
        "fullName": "Natalia MacGyver",
        "roles": "admin",
        "profilePic": "",
        "created_at": "2019-04-29T16:31:00-04:00",
        "active": true
    }
}
```

#### 404 (Not Found)

> If the provided `id` doesn't belong to a user, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```
{
  "message": "The user does not exist."
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry but something went wrong while retrieving the user."
}
```

### **_Get Users By TeamId_**

_Method Url:_ `/api/users/team/:teamId`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the users are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The users for team 1 were found successfully.",
    "users": [
        {
            "id": 1,
            "teamId": 1,
            "email": "Gustave43@gmail.com",
            "password": "$2a$04$1xD8TgEpVei41MJvV66B5uIDQWXNpJO45HjGtU8C9tDFaXhzuNy3K",
            "fullName": "Natalia MacGyver",
            "roles": "admin",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        },
        {
            "id": 2,
            "teamId": 1,
            "email": "Cayla76@gmail.com",
            "password": "$2a$04$4V4R/AmRur/cfRYIQUiOA.Wcma14ThcLNAA0uxlo.VYZU/kEvXaoK",
            "fullName": "Willa Luettgen",
            "roles": "member",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        },
        {
            "id": 3,
            "teamId": 1,
            "email": "Francis.Ernser@gmail.com",
            "password": "$2a$04$UPCR6e1TZnOaRXF69DfN/.AOtludDmJrLnQgrnxIfKfhXb24Btt6u",
            "fullName": "Everett Spinka",
            "roles": "member",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        },
        {
            "id": 4,
            "teamId": 1,
            "email": "Bennie66@gmail.com",
            "password": "$2a$04$sEg17CLlqADA50g/v/pvEO9htuBanyAsNMRo8LkF7c1nWQD.1ttfS",
            "fullName": "Penelope Mayert",
            "roles": "member",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        },
        {
            "id": 5,
            "teamId": 1,
            "email": "Shirley99@gmail.com",
            "password": "$2a$04$TYkda8WbilFp24hkKs5bEOBojV5QhUH7SS/nUiEjeQug1e2dbz6re",
            "fullName": "Albert Howell",
            "roles": "member",
            "profilePic": "",
            "created_at": "2019-04-29T16:31:00-04:00",
            "active": true
        }
    ]
}
```

#### 404 (Not Found)

> If the provided `teamId` doesn't belong to a team, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```
{
  "message": "The team does not exist."
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry but something went wrong while retrieving the users for this team."
}
```

## **DELETE USERS**

### **_Delete Users By ID_**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description         

#### Response

##### 200 (OK)

> If the users are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The user has been successfully removed.",
    
}
```

#### 404 (Not Found)

> If the provided `id` doesn't belong to a user, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```
{
  "message": "Sorry, that user does not exist."
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry, there was an error deleting the user."
}
```

## **EDIT USERS**

### **_Delete Users By ID_**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[DELPUTETE]**

#### Headers

| name            | type   | required | description         

#### Body
> An object with at least one user property of the following: `fullName`, `password`, `profilePic`, `active`.

_example:_

```
{
  "active": false
}
```

#### Response

##### 200 (OK)

> If the users are found in the database and the request body contains a valid user property, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The user has been successfully removed.",
    "editedUser": {
        teamId: integer,
        email: string,
        password: string,
        fullName: string,
        roles: string,
        profilePic: string,
        created_at: string,
        timezone: string,
        joinCode: integer,
        active: boolean
    }
}
```

#### 404 (Not Found)

> Haven't built this validation yet.

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry, there was an error when updating the user."
}
```



# REPORT ROUTES

## **GET REPORTS**

### **_GET ALL REPORTS_**

_Method Url:_ `/api/reports`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the reports are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The reports were found in the database.",
    "reports": [
        {
            "id": 1,
            "teamId": 1,
            "reportName": "Daily Standup",
            "created_at": "2019-04-29T16:31:00-04:00",
            "schedule": "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"]",
            "scheduleTime": "2019-04-29T16:31:00-04:00",
            "reoccurring": "1week",
            "message": "Please fill out the report",
            "responseTimeLimit": 600,
            "questions": "[{\"question\":\"How do you feel today?\"},{\"question\":\"What did you get done today?\"},{\"question\":\"Did you finish your goals for today?\"},{\"question\":\"What will you work on tomorrow?\"}]"
        },
        {
            "id": 2,
            "teamId": 2,
            "reportName": "Daily Standup",
            "created_at": "2019-04-29T16:31:00-04:00",
            "schedule": "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"]",
            "scheduleTime": "2019-04-29T16:31:00-04:00",
            "reoccurring": "1week",
            "message": "Please fill out the report",
            "responseTimeLimit": 600,
            "questions": "[{\"question\":\"How do you feel today?\"},{\"question\":\"What did you get done today?\"},{\"question\":\"Did you finish your goals for today?\"},{\"question\":\"What will you work on tomorrow?\"}]"
        },
        {
            "id": 3,
            "teamId": 3,
            "reportName": "Daily Standup",
            "created_at": "2019-04-29T16:31:00-04:00",
            "schedule": "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"]",
            "scheduleTime": "2019-04-29T16:31:00-04:00",
            "reoccurring": "1week",
            "message": "Please fill out the report",
            "responseTimeLimit": 600,
            "questions": "[{\"question\":\"How do you feel today?\"},{\"question\":\"What did you get done today?\"},{\"question\":\"Did you finish your goals for today?\"},{\"question\":\"What will you work on tomorrow?\"}]"
        },
        {
            "id": 4,
            "teamId": 4,
            "reportName": "Daily Standup",
            "created_at": "2019-04-29T16:31:00-04:00",
            "schedule": "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"]",
            "scheduleTime": "2019-04-29T16:31:00-04:00",
            "reoccurring": "1week",
            "message": "Please fill out the report",
            "responseTimeLimit": 600,
            "questions": "[{\"question\":\"How do you feel today?\"},{\"question\":\"What did you get done today?\"},{\"question\":\"Did you finish your goals for today?\"},{\"question\":\"What will you work on tomorrow?\"}]"
        },
        {
            "id": 5,
            "teamId": 5,
            "reportName": "Daily Standup",
            "created_at": "2019-04-29T16:31:00-04:00",
            "schedule": "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"]",
            "scheduleTime": "2019-04-29T16:31:00-04:00",
            "reoccurring": "1week",
            "message": "Please fill out the report",
            "responseTimeLimit": 600,
            "questions": "[{\"question\":\"How do you feel today?\"},{\"question\":\"What did you get done today?\"},{\"question\":\"Did you finish your goals for today?\"},{\"question\":\"What will you work on tomorrow?\"}]"
        }
    ]
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry but something went wrong while retrieving the list of reports."
}
```

### **_Get Reports By TeamId_**

_Method Url:_ `/api/reports/team/:teamId`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the reports are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The reports were found in the database.",
    "reports": [
        {
            "id": 1,
            "teamId": 1,
            "reportName": "Daily Standup",
            "created_at": "2019-04-29T16:31:00-04:00",
            "schedule": "[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"]",
            "scheduleTime": "2019-04-29T16:31:00-04:00",
            "reoccurring": "1week",
            "message": "Please fill out the report",
            "responseTimeLimit": 600,
            "questions": "[{\"question\":\"How do you feel today?\"},{\"question\":\"What did you get done today?\"},{\"question\":\"Did you finish your goals for today?\"},{\"question\":\"What will you work on tomorrow?\"}]"
        }
    ]
}
```

#### 404 (Not Found)

> If the provided `teamId` doesn't belong to a user, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```
{
  "message": "The team does not exist."
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
    "message": "Sorry but something went wrong while retrieving the list of reports"
}
```

## **DELETE REPORTS**

### **_Delete Report By ReportId_**

_Method Url:_ `/api/reports/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the reports are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The report was successfully deleted.",
}
```

#### 404 (Not Found)

> If the provided `teamId` doesn't belong to a user, the endpoint will return an HTTP response with a status code `404` and a body as below.

_example:_

```
{
  "message": "This report does not exist."
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
    "message": 'Sorry, something went wrong while deleting the report'
}
```

# RESPONSE ROUTES

## **GET REPONSES**

### **_GET ALL RESPONSES_**

_Method Url:_ `/api/responses`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the responses are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "message": "The responses were found in the database.",
    "responses": [
        {
            "id": 1,
            "reportId": 1,
            "userId": 2,
            "question": "How do you feel today?",
            "answer": "I feel happy today",
            "created_at": "2019-04-29T16:31:00-04:00",
            "submitted_date": "2019-04-29T16:31:00-04:00"
        },
        {
            "id": 2,
            "reportId": 1,
            "userId": 2,
            "question": "What did you get done today?",
            "answer": "I made a log in component.",
            "created_at": "2019-04-29T16:31:00-04:00",
            "submitted_date": "2019-04-29T16:31:00-04:00"
        },
        {
            "id": 3,
            "reportId": 1,
            "userId": 2,
            "question": "Did you finish your goals for today?",
            "answer": "Yes",
            "created_at": "2019-04-29T16:31:00-04:00",
            "submitted_date": "2019-04-29T16:31:00-04:00"
        },
        {
            "id": 4,
            "reportId": 1,
            "userId": 2,
            "question": "What will you work on tomorrow?",
            "answer": "Integrating OAuth",
            "created_at": "2019-04-29T16:31:00-04:00",
            "submitted_date": "2019-04-29T16:31:00-04:00"
        },
        {
            "id": 5,
            "reportId": 1,
            "userId": 3,
            "question": "How do you feel today?",
            "answer": "I feel happy today",
            "created_at": "2019-04-29T16:31:00-04:00",
            "submitted_date": "2019-04-29T16:31:00-04:00"
        }
    ]
}
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": "Sorry but something went wrong while retrieving the list of responses."
}
```

### **_GET RESPONSES BY REPORT_**

_Method Url:_ `/api/responses/:reportId`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the responses are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```
{
    "Message": "Responses found in database",
    "responses": [
        {
            "id": 1,
            "reportId": 1,
            "userId": 2,
            "question": "How do you feel today?",
            "answer": "I feel happy today",
            "created_at": "2019-04-30T17:36:55-04:00",
            "submitted_date": "2019-04-30T17:36:55-04:00"
        },
        {
            "id": 2,
            "reportId": 1,
            "userId": 2,
            "question": "What did you get done today?",
            "answer": "I made a log in component.",
            "created_at": "2019-04-30T17:36:55-04:00",
            "submitted_date": "2019-04-30T17:36:55-04:00"
        },
        {
            "id": 3,
            "reportId": 1,
            "userId": 2,
            "question": "Did you finish your goals for today?",
            "answer": "Yes",
            "created_at": "2019-04-30T17:36:55-04:00",
            "submitted_date": "2019-04-30T17:36:55-04:00"
        },
        {
            "id": 4,
            "reportId": 1,
            "userId": 2,
            "question": "What will you work on tomorrow?",
            "answer": "Integrating OAuth",
            "created_at": "2019-04-30T17:36:55-04:00",
            "submitted_date": "2019-04-30T17:36:55-04:00"
        },
        {
            "id": 5,
            "reportId": 1,
            "userId": 3,
            "question": "How do you feel today?",
            "answer": "I feel happy today",
            "created_at": "2019-04-30T17:36:55-04:00",
            "submitted_date": "2019-04-30T17:36:55-04:00"
        },
    ]
```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```
{
  "message": 'Sorry but something went wrong while retrieving the list of responses by team.'

}
```
