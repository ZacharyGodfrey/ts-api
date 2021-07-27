# ts-api

**A NodeJS API written in TypeScript**

The problem domain for this project is an online product catalog because that's more interesting than a to-do list application.

## HTTP Request Methods

The API will only accept `GET` and `POST` requests.

## HTTP Request Processing

Each request is broken down into the following processing steps:

| Step           | Description                            |
| -------------- | -------------------------------------- |
| `Log Request`  | Log the details of the HTTP request    |
| `Authenticate` | Determine which user sent the request  |
| `Validate`     | Determine whether the request is valid |
| `Execute`      | Perform the requested action           |
| `Log Response` | Log the details of the HTTP response   |

## HTTP Response Status Codes

The API will only return the following HTTP status codes:

| Status | Description                           |
| ------ | ------------------------------------- |
| `200`  | The action was successful             |
| `400`  | The request is invalid                |
| `404`  | The requested endpoint does not exist |
| `500`  | An unexpected error occurred          |

## API Endpoints

| Method | Path           | Description                              |
| ------ | -------------- | ---------------------------------------- |
| GET    | `/`            | Returns information about the API itself |
| POST   | `/create-user` | Creates a new user account               |

## Local Development

### Create the Database

- Create a new, empty PostgreSQL database
- Execute the scripts in `src/schema` in their numbered order

### Specify Environment Variables

Create a `.env` file at the root of the project with the following variables:

```
COOKIE_SECRET=your-cookie-signing-secret
DATABASE_URL=your-postgres-connection-string
```

### Run the Application

- `npm i` to install dependencies
- `npm run local` to run the API in watch mode
- `http://localhost:8080`

## Domain Entities

The API is divided into the following entities that make up the domain model:

| Entity     | Description                                               |
| ---------- | --------------------------------------------------------- |
| `User`     | An administrator account on the website                   |
| `Session`  | An authenticated session for the user                     |
| `Category` | A collection of products                                  |
| `Product`  | An item for sale in the store                             |
| `Feature`  | A customizable detail about a product (size, color, etc.) |
| `Option`   | A value for a feature (small, large, red, blue, etc.)     |

## Entity Properties

Each entity has the following properties in addition to its unique properties:

| Name      | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| `id`      | string | The unique identifier of the entity, a UUIDv4 string |
| `created` | string | A UTC timestamp of when the entity was created       |
| `updated` | string | A UTC timestamp of when the entity was last updated  |

### User

| Name            | Type   | Description                                           |
| --------------- | ------ | ----------------------------------------------------- |
| `username`      | string | The unique name for a user (3-25 characters)          |
| `password_hash` | string | An SHA256 HMAC of the user's `id` and chosen password |

### Session

| Name      | Type   |
| --------- | ------ |
| `user_id` | string |

### Category

| Name          | Type   |
| ------------- | ------ |
| `name`        | string |
| `description` | string |

### Product

| Name          | Type    |
| ------------- | ------- |
| `category_id` | string  |
| `name`        | string  |
| `description` | string  |
| `price`       | integer |

### Feature

| Name          | Type   |
| ------------- | ------ |
| `product_id`  | string |
| `name`        | string |
| `description` | string |

### Option

| Name         | Type    |
| ------------ | ------- |
| `feature_id` | string  |
| `name`       | string  |
| `price`      | integer |

---

[Return to Top](#ts-api)
