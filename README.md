# AUTH SERVICE API CONTRACT (Frontend → Backend)

**Base URL:**   `http://localhost:8082/formflow/auth`


## Endpoints

### 1. SIGNUP (to be implemented)
**Endpoint:** `POST /signup`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Expected Response:** ( Currently user has to login again after registration)

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

**Notes:**

- Create user in DB
- Generate tokens after signup


### 2. LOGIN

**Endpoint:** `POST /login`

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

**Notes:**

- Validate credentials
- Return both tokens


### 3. REFRESH TOKEN

**Endpoint:** `POST /refresh`

**Request Body:**

```json
{
  "refreshToken": "string"
}
```

**Response:**

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

**Notes:**

- Validate refresh token
- Issue new access token
- Refresh token rotation recommended


### 4. LOGOUT

**Endpoint:** `POST /logout`

**Request Body:**

```json
{
  "refreshToken": "string"
}
```

**Notes:**

- Invalidate refresh token in DB
- Access token remains stateless


---

# Form Service API Contract (Frontend to Backend)

## Base URL

`http://localhost:8082/formflow/`

## Endpoints

### 1. Create Form

**Method:** `POST`  
**Path:** `/user/createForm`

#### Request Body

```json
{
  "id": 0,
  "theme": "string",
  "title": "string",
  "description": "string",
  "published": true,
  "sections": [
    {
      "id": 0,
      "sectionTitle": "string",
      "sectionOrder": 0,
      "fields": [
        {
          "id": 0,
          "fieldType": "string",
          "fieldOrder": 0,
          "fieldConfig": {
            "label": "string",
            "validations": {},
            "options": [],
            "placeholder": "string",
            "color": "string",
            "fontSize": "string",
            "bold": true,
            "italic": true,
            "underline": true
          }
        }
      ]
    }
  ]
}
```

#### Response

- Plain text response.

#### Notes

- Save the complete form structure in the database.
- Maintain section ordering and field ordering.

### 2. Update Form (Yet to be implemented at the backend side)

**Method:** `PUT`  
**Path:** `/user/updateForm`

**Request Body**: Same schema as ***Create Form***.

```json
{
  "id": 0,
  "theme": "string",
  "title": "string",
  "description": "string",
  "published": true,
  "sections": [
    {
      "id": 0,
      "sectionTitle": "string",
      "sectionOrder": 0,
      "fields": [
        {
          "id": 0,
          "fieldType": "string",
          "fieldOrder": 0,
          "fieldConfig": {
            "label": "string",
            "validations": {},
            "options": [],
            "placeholder": "string",
            "color": "string",
            "fontSize": "string",
            "bold": true,
            "italic": true,
            "underline": true
          }
        }
      ]
    }
  ]
}
```


#### Response

- Plain text response.

#### Notes

- Update an existing form using its ID.
- Preserve new structures across updates.

### 3. Get Form by ID

**Method:** `GET`  
**Path:** `/user/form/{id}`

#### Response Body

```json
{
    "id": 0,
    "title": "string",
    "description": "string",
    "published": true,
    "createdBy": "string",
    "createdAt": "ISO DateTime",
    "sections": [
      {
        "sectionTitle": "string",
        "sectionOrder": 0,
        "fields": [
          {
            "fieldType": "string",
            "fieldOrder": 0,
            "fieldConfig": {}
          }
        ]
      }
    ]
  }
```

#### Notes

- Backend returns the raw structure.
- Frontend maps the response into its Form schema.

### 4. Get All Forms (Admin)

**Method:** `GET`  
**Path:** `/admin/getAllForms`

#### Response Body

```json
[
  {
    "id": 0,
    "title": "string",
    "description": "string",
    "published": true,
    "createdBy": "string",
    "createdAt": "ISO DateTime",
    "sections": [
      {
        "sectionTitle": "string",
        "sectionOrder": 0,
        "fields": [
          {
            "fieldType": "string",
            "fieldOrder": 0,
            "fieldConfig": {}
          }
        ]
      }
    ]
  }
]
```

#### Notes

- Intended for the admin dashboard.

### 5. Submit Form Response

**Method:** `POST`  
**Path:** `/api/responses`

#### Request Body

```json
{
  
}
```

#### Response Body

```json
{
  
}
```

#### Notes

- Store user responses mapped to `formId`.


### 6. Get Form Responses by Form ID

**Method:** `GET`  
**Path:** `/api/responses/{formId}`

#### Response Body

```json
[
  {
    
  }
]
```

#### Notes

- Get user responses mapped to `formId`.