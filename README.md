# Movies Management System
# Final
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
