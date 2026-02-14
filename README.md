# Movies Management System
# Final
### Step 1 — Clone the repository
```
git clone <https://github.com/komiiiiii/final>
cd <ass1>
```
## 2. Project Overview
The system demonstrates secure backend architecture, authentication using JWT, role-based access control (RBAC), and ownership-based authorization for user-generated content.
The application allows:
* Public users to view movies and reviews
* Authenticated users to create reviews
* Review owners to update or delete their own reviews
* Administrators to manage the movie catalog and all reviews

## 3. Technologies Used
* Node.js
* Express.js
* Mongoose
* JWT (jsonwebtoken)
* HTML, CSS, JavaScript
* Render (Deployment)
## 4. Architecture
The project follows the **Model–View–Controller (MVC)** pattern.
### Structure
```
controllers/
models/
routes/
middleware/
public/
server.js
package.json
README.md
```
### Responsibilities
* **Models**: Define MongoDB schemas
* **Controllers**: Implement business logic
* **Routes**: Define API endpoints
* **Middleware**: Handle authentication, role validation, and ownership checks
* **Public**: Frontend interface
* **Server.js**: Application entry point
---
### Step 1 — Clone the repository
```
git clone <repository_url>
cd <project_folder>
```
### Step 2 — Install dependencies
You must install all required Node modules before running the project:
```
npm install
```
This installs all dependencies listed in `package.json`.
---

## 5. Authorization Strategy

The system implements a combination of:

* Role-Based Access Control (RBAC)
* Ownership-Based Authorization

### 5.1 Movies Access Control

| Method | Access Level |
| ------ | ------------ |
| GET    | Public       |
| POST   | Admin Only   |
| PUT    | Admin Only   |
| DELETE | Admin Only   |

Movie catalog modifications are restricted to administrators.

Role validation is handled by `roleMiddleware.js`.

### 5.2 Reviews Access Control

| Method | Access Level        |
| ------ | ------------------- |
| GET    | Public              |
| POST   | Authenticated Users |
| PUT    | Owner or Admin      |
| DELETE | Owner or Admin      |

Ownership validation is performed in `adminReviewMiddleware.js` by comparing:

```
review.userId === req.user.id
```

Administrators have override privileges.

---

