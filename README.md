![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

# Project Overview

This application was made to support the frontend of an online retail store. The goal of this project is to replace the existing API with a backend system that can support the full data set for the project and can scale to meet the demands of production traffic.

Each member of the team was responsible for implementing different services of the application for a faster turnaround following the microservices architecture pipeline.

- Sabrina Gortz: Customer Q&A API
- Trevor Edwards: Customer Review API
- Will Atwood: Products Catalog and Storage API

## Questions and Answers API

This RESTful API handles questions and answers submitted by the customers about a specific product being displayed on the page. It also handles uploads of photos by users when answering questions, as well as keeping track of helpfulness votes and being able to report a question or an answer, which in this case deletes the entry from the database. 

The database schema are contained in `/database`

The node server is contained entirely in `/server`

It enters on `index.js` and follows the MVC pattern until interaction with the database.
<!-- 
`npm test` runs the tests inside of the `/test` folder with jest -->

<!-- ## Install

Ensure the database is prepared - [ETL](https://github.com/yoshi-sdc/atelier-products/blob/f11541e809aee0693ea8338361b2b97e467098d0/etl/README.md)

```
npm install
```

copy `example.env` to `.env` and configure the variables within. -->

## Run the App

```
npm start
```

<!-- ## Run the Tests

```
npm test
``` -->

# API Endpoints

<!-- All Queries take parameters as Query strings unless it is in the endpoint\
All responses should return status code `200 OK` -->

### `GET /questions`
Returns a list questions available for a specific product

#### Parameters
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| page      | Integer | Selects the page of results to return. Default 1.         |
| page_size | Integer | Specifies how many results per page to return. Default 5. |

<!-- #### Response
```json
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": 40
    }
]
``` -->

### `GET /questions/:question_id/answers`
Returns all answers written by users to a specific question relating to the current product displayed.

#### Parameters
| Parameter   | Type    | Description                                       |
|-------------|---------|---------------------------------------------------|
| question_id | Integer | Required ID of current product's question for which data should be returned. |

<!-- #### Response
```json
{
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": 140,
    "features": [
        {
            "feature": "Buttons",
            "value": "Brass"
        },
        {
            "feature": "Fabric",
            "value": "Canvas"
        }
    ]
}
``` -->

### `POST /questions`
Inserts a new question to the database for the given product.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for the question to be submitted |

#### Response
```json 
201 Created
```

### `POST /answers/:question_id/answers`
Inserts a new answer to the database for the given question of the display product.

#### Parameters
| Parameter   | Type    | Description                                       |
|-------------|---------|---------------------------------------------------|
| question_id | Integer | Required ID of the product's question for the answer to be submitted |

#### Response
```json 
201 Created
```
