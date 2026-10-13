# SecureAPI - Books (ICE Task 2)

A structured Express backend API with routes, controllers, middleware, input validation, controlled CORS, and a central error handler.

## Setup

```
npm install
cp .env.example .env
npm start
```

Server runs on `http://localhost:4000`

## Routes tested in Postman

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `http://localhost:4000/` | Root route - confirms API is running |
| GET | `http://localhost:4000/health` | Health check |
| GET | `http://localhost:4000/api/books` | Get all books |
| GET | `http://localhost:4000/api/books/b1` | Get a single book by id |
| POST | `http://localhost:4000/api/books` | Create a new book |

## Sample request bodies used to add new books (POST /api/books)

**1.**
```json
{
  "title": "Sapiens",
  "author": "Yuval Noah Harari",
  "genre": "Non-Fiction",
  "year": 2011,
  "description": "A brief history of humankind from the Stone Age to the modern era."
}
```

**2.**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "year": 1937,
  "description": "Bilbo Baggins is swept into an unexpected adventure with dwarves and a dragon."
}
```

**3.**
```json
{
  "title": "Educated",
  "author": "Tara Westover",
  "genre": "Biography",
  "year": 2018,
  "description": "A memoir about growing up in a survivalist family and pursuing education."
}
```

**4.**
```json
{
  "title": "Gone Girl",
  "author": "Gillian Flynn",
  "genre": "Thriller",
  "year": 2012,
  "description": "A woman disappears on her wedding anniversary, and her husband becomes the prime suspect."
}
```

**5.**
```json
{
  "title": "Deep Work",
  "author": "Cal Newport",
  "genre": "Self-Help",
  "year": 2016,
  "description": "Rules for focused success in a distracted world of constant notifications."
}
```

## Invalid input checks tested

- Missing required field -> `400 Bad Request`, `{ "error": "All fields are required" }`
- Invalid data type (e.g. year as a string) -> `400 Bad Request`
- Genre outside the allowed list -> `400 Bad Request`
- Non-existent book id -> `404 Not Found`
- Invalid id format -> `400 Bad Request`
- Unknown route -> `404 Not Found`, `{ "error": "Route not found" }`
