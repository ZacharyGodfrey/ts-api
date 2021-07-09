# ts-api

**A NodeJS API written in TypeScript**

The problem domain for this project is an online store because that's more interesting than a to-do list application.

## Domain Entities

The API is divided into the following entities that make up the domain model:

- `User`: A user on the website
- `Store`: A company offering products for sale
- `Category`: A collection of products
- `Product`: An item for sale in the store
- `Feature`: A customizable detail about a product (size, color, etc.)
- `Option`: A value for a feature (small, medium, large, etc.)
- `Order`: A purchase of a product

## Entity Properties

Each entity has _at least_ the following properties:

- `id`: The unique identifier of the entity, a UUIDv4 string
- `created`: A UTC timestamp of when the entity was created
- `updated`: A UTC timestamp of when the entity was last updated

## HTTP Request Processing

Each request is broken down into the following processing steps:

- `Log Request`: Log the details of the HTTP request
- `Authentication`: Determine who the user is
- `Authorization`: Determine whether the user has the necessary permissions
- `Validation`: Determine whether the given input data meets all the requirements
- `Execution`: Perform the action
- `Log Response`: Log the details of the HTTP response

## HTTP Response Status Codes

The API will only return the following HTTP status codes:

- `200`: The action was successful
- `400`: The user provided invalid input data
- `401`: The user does not have an authenticated session
- `403`: The authenticated user has insufficient permissions
- `404`: The endpoint does not exist
- `500`: An unexpected error occurred

## HTTP Requests

Each entity has the following actions available:

### Create

`POST /:entity`

Creates a new entity and returns the created entity

### Search

`GET /:entity`

Returns an array of entities matching the specified search criteria

### View

`GET /:entity/:id`

Returns the entity with the specified `id`

### Update

`PUT /:entity/:id`

Updates the entity with the specified `id` and returns the updated entity

### Remove

`DELETE /:entity/:id`

Deletes the entity with the specified `id` and returns an empty response

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
