# ts-api

**A NodeJS API written in TypeScript**

The problem domain for this project is an online product catalog because that's more interesting than a to-do list application.

## Domain Entities

The API is divided into the following entities that make up the domain model:

|Entity|Description|
|---|---|
|`User`|An administrator account on the website|
|`Session`|An authenticated session for the user|
|`Category`|A collection of products|
|`Product`|An item for sale in the store|
|`Feature`|A customizable detail about a product (size, color, etc.)|
|`Option`|A value for a feature (small, large, red, blue, etc.)|

## Entity Properties

Each entity has the following properties in addition to its unique properties:

|Name|Type|Description|
|---|---|---|
|`id`|string|The unique identifier of the entity, a UUIDv4 string|
|`created`|string|A UTC timestamp of when the entity was created|
|`updated`|string|A UTC timestamp of when the entity was last updated|

### User

|Name|Type|Description|
|---|---|---|
|`username`|string|The unique name for a user (3-25 characters)|
|`password_hash`|string|An SHA256 HMAC of the user's `id` and chosen password|

### Session

|Name|Type|
|---|---|
|`user_id`|string|

### Category

|Name|Type|
|---|---|
|`name`|string|
|`description`|string|

### Product

|Name|Type|
|---|---|
|`category_id`|string|
|`name`|string|
|`description`|string|
|`price`|integer|

### Feature

|Name|Type|
|---|---|
|`product_id`|string|
|`name`|string|
|`description`|string|

### Option

|Name|Type|
|---|---|
|`feature_id`|string|
|`name`|string|
|`price`|integer|

## HTTP Request Processing

Each request is broken down into the following processing steps:

|Step|Description|
|---|---|
|`Log Request`|Log the details of the HTTP request|
|`Authentication`|Determine who the user is|
|`Authorization`|Determine whether the user has the necessary permissions|
|`Validation`|Determine whether the given input data meets all the requirements|
|`Execution`|Perform the action|
|`Log Response`|Log the details of the HTTP response|

## HTTP Response Status Codes

The API will only return the following HTTP status codes:

|Status|Description|
|---|---|
|`200`|The action was successful|
|`400`|The request is invalid|
|`404`|The requested endpoint does not exist|
|`500`|An unexpected error occurred|

## API Endpoints

Each entity has the following actions available:

|Action|Method|Endpoint|Description|
|---|---|---|---|
|**Create**|POST|`/:entity`|Creates a new entity and returns the created entity|
|**Search**|GET|`/:entity`|Returns an array of entities matching the specified search criteria|
|**View**|GET|`/:entity/:id`|Returns the entity with the specified `id`|
|**Update**|PUT|`/:entity/:id`|Updates the entity with the specified `id` and returns the updated entity|
|**Remove**|DELETE|`/:entity/:id`|Deletes the entity with the specified `id` and returns an empty response|

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
- `npm run local` to run the app in watch mode
- `http://localhost:8080`

---

[Return to Top](#ts-api)
